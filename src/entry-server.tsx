import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import App from './App';

interface IRenderProps {
  path: string;
}

export const render = async ({ path }: IRenderProps) => {
  const stream = ReactDOMServer.renderToPipeableStream(
    <React.StrictMode>
      <Provider store={setupStore()}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  return { stream };
};
