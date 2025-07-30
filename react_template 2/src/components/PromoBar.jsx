import { useState, useEffect } from 'react';

const PromoBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 22,
    seconds: 15
  });
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ 
          ...timeLeft, 
          minutes: timeLeft.minutes - 1, 
          seconds: 59 
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({ 
          ...timeLeft, 
          hours: timeLeft.hours - 1, 
          minutes: 59, 
          seconds: 59 
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({ 
          ...timeLeft, 
          days: timeLeft.days - 1, 
          hours: 23, 
          minutes: 59, 
          seconds: 59 
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const closePromo = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-2 px-4 text-center relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="font-bold">SPECIAL OFFER</span>
          <span>Get 12 Months for the price of 3! Premium Plan for </span>
          <span className="font-bold">$99.99</span>
          <span>$24.99/month</span>
          <span>Use code <span className="font-mono bg-white text-blue-800 px-2 py-1 rounded">PROMO2024</span></span>
          <div className="flex items-center space-x-1 ml-2">
            <span>Ends in:</span>
            <div className="flex space-x-1">
              <div className="flex flex-col items-center">
                <span className="bg-white text-blue-800 rounded px-1 text-xs font-bold">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-xs">Days</span>
              </div>
              <span>-</span>
              <div className="flex flex-col items-center">
                <span className="bg-white text-blue-800 rounded px-1 text-xs font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-xs">Hrs</span>
              </div>
              <span>-</span>
              <div className="flex flex-col items-center">
                <span className="bg-white text-blue-800 rounded px-1 text-xs font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs">Mins</span>
              </div>
              <span>-</span>
              <div className="flex flex-col items-center">
                <span className="bg-white text-blue-800 rounded px-1 text-xs font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs">Secs</span>
              </div>
            </div>
          </div>
          <a href="#pricing" className="bg-white text-blue-800 font-bold px-3 py-1 rounded-full hover:bg-gray-100 transition">
            Save 75% OFF
          </a>
        </div>
      </div>
      <button 
        onClick={closePromo} 
        className="absolute right-2 top-2 text-white"
        aria-label="Close promotion"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  );
};

export default PromoBar;