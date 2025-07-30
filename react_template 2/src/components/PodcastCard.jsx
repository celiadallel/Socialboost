function PodcastCard({ podcast }) {
  const { title, author, cover, category, duration, episodeCount } = podcast;
  
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative pb-[75%]">
        <img 
          src={cover} 
          alt={title} 
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="inline-block bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">By {author}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {episodeCount} Episodes
          </div>
        </div>
        <button className="w-full mt-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Play
        </button>
      </div>
    </div>
  );
}

export default PodcastCard;