import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore, RootState } from './store/store';
import App from './App';

type WindowInstanse = Window &
  typeof globalThis & {
    __PRELOADED_STATE__?: RootState;
  };

const store = setupStore((window as WindowInstanse).__PRELOADED_STATE__);

delete (window as WindowInstanse).__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
