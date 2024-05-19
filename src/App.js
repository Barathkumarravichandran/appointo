import React from 'react';
import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="appointo">
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
