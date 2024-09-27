import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';



function App() {
  return (
    <Router>
      <Menu></Menu>
      <Hero></Hero>
      <div className="mainContainer">
        <Routes>

          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>

        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
