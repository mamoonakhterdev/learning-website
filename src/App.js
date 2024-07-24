import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import ScienceKindergarten from './Components/Science/Kindergarten/Kindergarten';
import MathKindergarten from './Components/Math/Kindergarten/Kindergarten';
import SGrade1 from './Components/Science/Grade-1/Grade1';
import MGrade1 from './Components/Math/Grade-1/Grade1';
// Import other grade components similarly

const App = () => {
  return (
    <Router>
      <Layout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/science/kindergarten" element={<ScienceKindergarten />} />
        <Route path="/science/grade-1" element={<SGrade1 />} />
        {/* Add routes for other grades and subjects similarly */}
        <Route path="/math/kindergarten" element={<MathKindergarten />} />
        <Route path="/math/grade-1" element={<MGrade1 />} />
        {/* Add routes for other grades and subjects similarly */}
      </Routes>
      </Layout>
    </Router>
  );
};

export default App;
