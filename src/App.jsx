import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import Highlights from './components/Highlights.jsx'
import Testimonials from './components/Testimonials.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
      <Highlights />
      <Testimonials />
      <About />
      <Footer />
    </>
  )
}

export default App
