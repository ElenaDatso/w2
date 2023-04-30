/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express, { Express } from 'express';
import vite from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Component from './src/component';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort: number | undefined = undefined
) {
  const resolve = (p: string) => path.resolve(__dirname, p);
  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';
  const app: Express = express();
  let vite: vite.ViteDevServer | undefined = undefined;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort as number,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  // const vite = await createViteServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom',
  // });

  // app.use(vite.middlewares);

  // app.get('/', function (request, response) {
  //   const html = ReactDOMServer.renderToString(React.createElement(Component));
  //   response.send(html);
  // });

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      console.log(url);
      let template;
      // always read fresh template in dev
      template = fs.readFileSync(resolve('index.html'), 'utf-8');
      if (vite) template = await vite.transformIndexHtml(url, template);
      const module = vite && (await vite.ssrLoadModule('/src/component.tsx'));
      const render = module && (module.render as (url: string, context?: unknown) => string);
      console.log(render);

      const context: { url?: string } = {};
      const appHtml = render && render(url, context);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      const html = template.replace(`<!--app-html-->`, appHtml as string);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      !isProd && vite && vite.ssrFixStacktrace(e as Error);
      console.log((e as Error).stack);
      res.status(500).end((e as Error).stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173');
    })
  );
}
// const PORT = 3000;
// app.listen(PORT, function () {
//   console.log('http://localhost:' + PORT);
// });

createServer();
