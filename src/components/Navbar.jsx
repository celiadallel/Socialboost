import { useState } from 'react';

const Navbar = ({ isMobile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="font-bold text-2xl text-blue-600">
            SocialBoost
          </a>
        </div>

        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col gap-4">
                <a href="#features" className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  For influencers
                </a>
                <a href="#team-features" className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  For teams
                </a>
                <a href="#pricing" className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  Pricing
                </a>
                <a href="#faq" className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  FAQ
                </a>
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <a href="/login" className="py-2 px-4 text-center rounded hover:bg-gray-100">
                    Login
                  </a>
                  <a href="/signup" className="py-2 px-4 text-center rounded bg-blue-600 text-white hover:bg-blue-700">
                    Start for free
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600">For influencers</a>
              <a href="#team-features" className="text-gray-700 hover:text-blue-600">For teams</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600">FAQ</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </a>
              <a href="/signup" className="py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Start for free
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;