import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
};

export default App;
