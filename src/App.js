import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/shop/store';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
    
  );
}

export default App;
