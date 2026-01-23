import React from "react";
import { Link } from "react-router-dom";
import HeroLanding from "../components/landing/HeroLanding";
import Footer from "../components/landing/Footer";
// testing comment
import Intro from "../components/landing/landingTest/intro.jsx"; 
export default function LandingPage() {
  return (
    <>
      {/* <HeroLanding /> */}
      <Intro />
      <Footer />
    </>
  );
}
