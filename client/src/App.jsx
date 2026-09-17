import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/Howitworks";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Ctasection from "./components/Ctasection";
import Footer from "./components/Footer";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Ctasection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
