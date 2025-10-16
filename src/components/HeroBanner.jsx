import React from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = ({ title, description, ctaText = "Shop Now", ctaLink = "/products", background }) => {
  const navigate = useNavigate();

  return (
    <section
      className="container mx-auto relative flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center mb-8"
      style={{
        backgroundImage: background
          ? `url(${background})`
          : "linear-gradient(135deg, #0f172a, #1e293b)"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">{title}</h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">{description}</p>
        <button
          onClick={() => navigate(ctaLink)}
          className="bg-blue-500 hover:bg-blue-600 transition-all px-6 py-3 rounded-full text-white text-lg font-semibold shadow-md hover:scale-105"
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;