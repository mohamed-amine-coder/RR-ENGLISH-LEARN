import React from "react";
import { Link } from "react-router-dom";
import HeroLanding from "../components/landing/HeroLanding";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <HeroLanding />
      <Footer />
    </>
  );
}
