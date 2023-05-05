import React from 'react';
import './App.css';
import BoarderPage from './containers/boarderPage/BoarderPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layouts/Layout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BoarderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
