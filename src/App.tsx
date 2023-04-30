import './theme/global.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routing/Router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
