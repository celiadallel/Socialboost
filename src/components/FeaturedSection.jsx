import PodcastCard from './PodcastCard';

function FeaturedSection() {
  const featuredPodcasts = [
    {
      id: 1,
      title: "The Daily Innovation",
      author: "Alex Johnson",
      cover: "https://public-frontend-cos.metadl.com/mgx/img/podcast-cover-1.jpg",
      category: "Technology",
      duration: "45 min",
      episodeCount: 124
    },
    {
      id: 2,
      title: "Creative Mindfulness",
      author: "Sarah Williams",
      cover: "https://public-frontend-cos.metadl.com/mgx/img/podcast-cover-2.jpg",
      category: "Health",
      duration: "32 min",
      episodeCount: 58
    },
    {
      id: 3,
      title: "Business Unpacked",
      author: "Mark Anderson",
      cover: "https://public-frontend-cos.metadl.com/mgx/img/podcast-cover-3.jpg",
      category: "Business",
      duration: "55 min",
      episodeCount: 86
    },
    {
      id: 4,
      title: "Science Today",
      author: "Emma Roberts",
      cover: "https://public-frontend-cos.metadl.com/mgx/img/podcast-cover-4.jpg",
      category: "Science",
      duration: "28 min",
      episodeCount: 42
    }
  ];

  return (
    <section id="featured" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Podcasts</h2>
          <a href="#all-featured" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;