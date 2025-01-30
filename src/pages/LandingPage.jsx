import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">
                <span className="text-green-500">Eco</span>
                <span className="text-blue-500">Collect</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <a
                href="login"
                className="text-gray-600 hover:text-green-600 transition"
              >
                Login
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-green-600 transition"
              >
                How It Works
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="login"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
            >
              How It Works
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 bg-gradient-to-r from-green-500 to-blue-600"
      >
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart E-Waste Recycling Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Join the movement for responsible electronic waste management
          </p>
          <button
            className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            onClick={() => navigate("/login")}
          >
            Register With Us Now!
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose EcoCollect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Sorting</h3>
              <p className="text-gray-600">
                Advanced machine learning ensures accurate waste classification
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-4">Eco-Friendly Process</h3>
              <p className="text-gray-600">
                100% sustainable recycling methods for minimal environmental
                impact
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-4">Global Impact</h3>
              <p className="text-gray-600">
                Contributing to worldwide sustainability goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Simple 3-Step Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Pickup</h3>
              <p className="text-gray-600">
                Use our app to request a collection
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">We Collect</h3>
              <p className="text-gray-600">Our team picks up your e-waste</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Recycle & Reward</h3>
              <p className="text-gray-600">Get rewards for your contribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Flex container for Quick Links and other sections */}
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            {/* Quick Links Section */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="Login"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Login
                </a>
                <a
                  href="#how-it-works"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  How It Works
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 EcoCollect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
