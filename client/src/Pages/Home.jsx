import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Home/Hero.jsx';
import About from '../components/Home/About.jsx';
import Upload from '../components/Home/Upload.jsx';
import Footer from '../components/Footer.jsx';


function Home() {
  return (
    <>
      <Navbar/>
      <Hero />
      <About />
      <Upload />
      <Footer />
    </>
  );
}

export default Home;
