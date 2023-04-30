import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { createServer as createViteServer } from 'vite';
import { Writable } from 'stream';

const PORT = 8000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const buffer: string[] = [];
      const writableStream = new Writable({
        write(chunk: string, encoding, callback) {
          buffer.push(chunk);
          callback();
        },
      });
      let template = fs.readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf-8');
      if (vite) template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const { stream, injectPreload } = (await render({ path: url })) as {
        stream: ReactDOMServer.PipeableStream;
        injectPreload: () => string;
      };
      stream.pipe(writableStream);
      // const context: { url?: string } = {};
      writableStream.on('finish', () => {
        const textContent = buffer.join('').toString();
        const temp = template.replace(`<!--ssr-outlet-->`, textContent);
        console.log(temp);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(temp);
      });
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      console.log(e);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

createServer();
