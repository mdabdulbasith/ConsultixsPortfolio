import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import ProjectLinks from './components/Project.jsx'
import PdfSection from './components/PdfSection.jsx'
import Chatbot from './components/Chatbot';


function App() {


  return (
    <>
      <Navbar />
      <div className="text-center px-4 py-8 text-white">
        <h2 className="text-[30px] sm:text-[60px] font-semibold font-poppins bg-gradient-to-b from-[#0BC0FD] to-[#055EF2] text-transparent bg-clip-text">
          Our Work
        </h2>
        <h2 className="text-[30px] sm:text-[60px] font-semibold font-poppins leading-none">
          Speaks for Itself
        </h2>
        <p className="text-[12px] sm:text-[16px] font-normal font-poppins mt-2 sm:mt-4">
          Take the first step towards your success with us.
        </p>
      </div>
      <ProjectLinks />
      <PdfSection />
      <Chatbot />
    </>
  )
}

export default App
