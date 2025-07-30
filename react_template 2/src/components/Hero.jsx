import { useState } from 'react';

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here would be the logic to handle the sign-up process
    alert(`Thank you for your interest! We'll contact you at ${email}`);
    setEmail('');
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 pt-10 pb-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Skyrocket your Personal Brand on 
              <span className="text-blue-600"> LinkedIn</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Get more likes and comments on your LinkedIn posts with the help of your teams, friends, or expert groups. Amplify your professional presence today!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try now for free!
              </button>
            </form>
            <p className="text-sm text-gray-500">No credit card required</p>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpbmtlZGluJTIwcG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                    alt="LinkedIn Growth Dashboard" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg transform rotate-12">
                  <span className="font-bold">+300%</span>
                  <span className="block text-xs">Engagement</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-indigo-100 rounded-full p-8 z-[-1]"></div>
              <div className="absolute -bottom-8 -right-8 bg-blue-100 rounded-full p-10 z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;