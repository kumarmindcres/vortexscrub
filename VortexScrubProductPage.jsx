import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Info, ChevronRight, ShoppingCart } from 'lucide-react';

const VortexScrubProMax = () => {
  const features = [
    { title: "8-in-1 Versatility", desc: "Specialized heads for every surface.", icon: <Zap className="w-5 h-5" /> },
    { title: "LED Digital Display", desc: "Real-time battery & speed monitoring.", icon: <Info className="w-5 h-5" /> },
    { title: "Extendable Reach", desc: "Clean floor to ceiling without effort.", icon: <ChevronRight className="w-5 h-5" /> },
    { title: "Fast Charging", desc: "90 minutes of cordless cleaning power.", icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white text-[#1d1d1f] font-sans antialiased selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">VortexScrub™</span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">Design</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Specs</a>
            <a href="#" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-all">
            Buy Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Clean, Redefined.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12"
          >
            The ultimate 8-in-1 power cleaning system. No bending. No effort. Just pure performance.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative"
          >
            <img 
              src="https://sc02.alicdn.com/kf/A223b11eca04245d6a818c942b944151dw.png" 
              alt="VortexScrub Pro Max" 
              className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Product Reveal */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Engineered Excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Power that lasts. Speed that matters.</h2>
            <div className="space-y-6">
              {[
                "High-Torque 300 RPM Motor",
                "Sub-90 Minute Rapid Charging",
                "IPX7 Fully Waterproof Construction",
                "Intelligent LED Status Interface"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-lg">
                  <div className="bg-black rounded-full p-1"><Check className="text-white w-4 h-4" /></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-12 group flex items-center space-x-2 text-blue-600 font-semibold text-lg hover:translate-x-1 transition-transform">
              <span>View full technical specifications</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
             <img 
              src="https://sc02.alicdn.com/kf/A82706b3532084f74bd8bf9c481cb2c4bb.png" 
              alt="Close up detail" 
              className="w-full transform hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-black text-white py-24 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your home?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-200 transition-all flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <span>Order VortexScrub Pro Max</span>
          </button>
          <p className="text-gray-400 text-lg">From $89.99 USD. Free Global Shipping.</p>
        </div>
        <div className="mt-16 text-gray-600 text-sm">
          © 2026 VortexScrub™ Official. All rights reserved. Built with Shopify Hydrogen.
        </div>
      </footer>
    </div>
  );
};

export default VortexScrubProductPage;
