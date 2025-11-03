import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Methodology from "../components/landing/Methodology";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Methodology />
      <Testimonials />
      <Footer />
    </>
  );
}
