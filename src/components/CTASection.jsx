const CTASection = () => {
  return (
    <section id="pricing" className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-blue-600 font-bold text-4xl mb-2">$0</div>
              <p className="text-gray-500 mb-6">Perfect for trying out SocialBoost</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Up to 5 posts per month</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Join 1 engagement pod</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-2">✗</span>
                  <span>AI-generated comments</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-2">✗</span>
                  <span>Create your own pods</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                Start for free
              </button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 relative z-10 -my-4">
            <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-blue-600 font-bold text-4xl mb-2">$19.99</div>
              <p className="text-gray-500 mb-6">Per month, billed monthly</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Unlimited posts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Join up to 5 pods</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Create 1 custom pod</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>AI-generated comments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                Start 7-day free trial
              </button>
            </div>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-blue-600 font-bold text-4xl mb-2">
                <span className="line-through text-gray-400 text-2xl">$99.99</span> $24.99
              </div>
              <p className="text-gray-500 mb-6">Per month, with promo code</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Everything in Pro plan</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Create unlimited pods</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Post scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              
              <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors">
                Save 75% Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;