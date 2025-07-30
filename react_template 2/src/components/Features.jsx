const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-blue-600 mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "📈",
      title: "Increase Post Engagement",
      description: "Specify the exact number of likes and reactions you want for your LinkedIn posts to boost visibility."
    },
    {
      id: 2,
      icon: "💬",
      title: "AI-Generated Comments",
      description: "Generate personalized, relevant comments using our advanced AI to increase post engagement naturally."
    },
    {
      id: 3,
      icon: "🔄",
      title: "Engagement Pods",
      description: "Join or create engagement pods with like-minded professionals to support each other's content."
    },
    {
      id: 4,
      icon: "📊",
      title: "Performance Analytics",
      description: "Track your post performance with detailed analytics to optimize your LinkedIn strategy."
    },
    {
      id: 5,
      icon: "👥",
      title: "Team Collaboration",
      description: "Collaborate with your team members to boost each other's content and amplify reach."
    },
    {
      id: 6,
      icon: "⏱️",
      title: "Post Scheduling",
      description: "Schedule your engagement activities to ensure timely interaction with targeted content."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Grow on <span className="text-blue-600">LinkedIn</span> like never before</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to amplify your professional presence and maximize your content's reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden" id="team-features">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">Create engagement directly to your LinkedIn posts</h3>
              <p className="text-gray-600 mb-6">
                Specify the exact number of likes and the type of reactions you want for your post. Additionally, generate personalized comments using AI to make your engagement appear more natural and authentic.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Target specific engagement metrics</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>AI-powered comment generation</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Schedule engagement activities</span>
                </li>
              </ul>
              <a href="#pricing" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get started
              </a>
            </div>
            <div className="md:w-1/2 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlua2VkaW4lMjBwb3N0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                alt="LinkedIn Engagement" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;