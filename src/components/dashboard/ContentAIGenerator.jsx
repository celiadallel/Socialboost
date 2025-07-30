import { useState } from "react";

export default function ContentAIGenerator() {
  const [generationParams, setGenerationParams] = useState({
    contentType: "post",
    tone: "professional",
    topic: "",
    includeHashtags: true,
    length: "medium",
    includeEmoji: false
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContents, setGeneratedContents] = useState([]);
  const [savedDrafts, setSavedDrafts] = useState([
    {
      id: 1,
      content: "Excited to share that our team has completed the rollout of our new cloud infrastructure, resulting in a 40% improvement in application performance and a 25% reduction in operational costs. #CloudComputing #TechInnovation #DigitalTransformation",
      type: "post",
      createdAt: "2025-07-15T10:30:00",
      saved: true
    },
    {
      id: 2,
      content: "Looking for recommendations on the best project management tools for remote engineering teams. We currently use a combination of Jira and Notion, but I'm curious what others in the industry have found effective for maintaining visibility and coordination across time zones.",
      type: "post",
      createdAt: "2025-07-14T14:20:00",
      saved: true
    }
  ]);

  const handleParamChange = (param, value) => {
    setGenerationParams({
      ...generationParams,
      [param]: value
    });
  };

  const handleGenerate = () => {
    if (!generationParams.topic) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with different variations
    setTimeout(() => {
      const newContents = [];
      
      // Generate variations based on the topic and parameters
      const templates = getContentTemplates(
        generationParams.contentType, 
        generationParams.tone, 
        generationParams.topic,
        generationParams.length
      );
      
      // Process templates based on parameters
      for (let template of templates) {
        if (generationParams.includeHashtags) {
          template += getHashtags(generationParams.topic, generationParams.tone);
        }
        
        if (generationParams.includeEmoji) {
          template = addEmojis(template, generationParams.tone);
        }
        
        newContents.push({
          id: Date.now() + Math.random(),
          content: template,
          type: generationParams.contentType,
          createdAt: new Date().toISOString()
        });
      }
      
      setGeneratedContents(newContents);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSaveDraft = (content) => {
    const newDraft = {
      ...content,
      saved: true,
      id: Date.now()
    };
    
    setSavedDrafts([newDraft, ...savedDrafts]);
  };

  const handleDeleteDraft = (draftId) => {
    setSavedDrafts(savedDrafts.filter(draft => draft.id !== draftId));
  };

  const handleCopyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">AI Content Generator</h2>
      
      {/* Generator Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Generate LinkedIn Content</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                value={generationParams.contentType}
                onChange={(e) => handleParamChange("contentType", e.target.value)}
              >
                <option value="post">Regular Post</option>
                <option value="article">Article/Newsletter</option>
                <option value="comment">Comment/Reply</option>
                <option value="poll">Poll Question</option>
                <option value="announcement">Company Announcement</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tone
              </label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                value={generationParams.tone}
                onChange={(e) => handleParamChange("tone", e.target.value)}
              >
                <option value="professional">Professional</option>
                <option value="conversational">Conversational</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="thoughtful">Thoughtful & Insightful</option>
                <option value="authoritative">Authoritative</option>
                <option value="humble">Humble</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic or Main Idea
            </label>
            <input
              type="text"
              placeholder="E.g., Latest AI trends in healthcare, Our new product launch, etc."
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              value={generationParams.topic}
              onChange={(e) => handleParamChange("topic", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length
              </label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                value={generationParams.length}
                onChange={(e) => handleParamChange("length", e.target.value)}
              >
                <option value="short">Short (1-2 paragraphs)</option>
                <option value="medium">Medium (2-3 paragraphs)</option>
                <option value="long">Long (3+ paragraphs)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="includeHashtags"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={generationParams.includeHashtags}
                onChange={(e) => handleParamChange("includeHashtags", e.target.checked)}
              />
              <label htmlFor="includeHashtags" className="ml-2 block text-sm text-gray-700">
                Include hashtags
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="includeEmoji"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={generationParams.includeEmoji}
                onChange={(e) => handleParamChange("includeEmoji", e.target.checked)}
              />
              <label htmlFor="includeEmoji" className="ml-2 block text-sm text-gray-700">
                Include emojis
              </label>
            </div>
          </div>
          
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              disabled={!generationParams.topic || isGenerating}
              className={`px-4 py-2 rounded-md text-white ${
                !generationParams.topic || isGenerating ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : "Generate Content"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Generated Content */}
      {generatedContents.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Generated Content</h3>
          <div className="space-y-5">
            {generatedContents.map((content) => (
              <div key={content.id} className="border rounded-lg p-4 bg-blue-50">
                <p className="text-gray-800 mb-4 whitespace-pre-line">{content.content}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleCopyToClipboard(content.content)}
                    className="px-3 py-1 text-sm text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleSaveDraft(content)}
                    className="px-3 py-1 text-sm text-green-700 bg-green-100 hover:bg-green-200 rounded-md"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Saved Drafts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Saved Drafts</h3>
        {savedDrafts.length === 0 ? (
          <p className="text-gray-500">No saved drafts yet</p>
        ) : (
          <div className="space-y-5">
            {savedDrafts.map((draft) => (
              <div key={draft.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(draft.createdAt).toLocaleDateString()} • {draft.type}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleCopyToClipboard(draft.content)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete draft"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 mb-2 whitespace-pre-line">{draft.content}</p>
                <div className="flex justify-end">
                  <button className="px-3 py-1 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md">
                    Schedule Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* AI Content Tips */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Content Creation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">LinkedIn Engagement Patterns</h4>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• Posts with 5-8 lines receive the highest engagement</li>
              <li>• Questions generate 2x more comments than statements</li>
              <li>• Content posted Tuesday - Thursday performs 25% better</li>
              <li>• First-person stories receive 3x more engagement than third-person</li>
              <li>• Posts with 3-5 relevant hashtags perform best</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">Your Content Performance</h4>
            <ul className="space-y-2 text-green-700 text-sm">
              <li>• Your posts about industry trends average 40% higher engagement</li>
              <li>• Personal achievement posts get 65% more reactions</li>
              <li>• Posts with images get 2.3x more views</li>
              <li>• Your optimal posting time: 9-11 AM on Tuesdays</li>
              <li>• Questions about industry challenges get the most comments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for content generation
function getContentTemplates(contentType, tone, topic, length) {
  // This would be handled by a real AI in production
  // Here we're using templates based on the parameters
  
  const templates = [];
  const shortLength = length === "short";
  const longLength = length === "long";
  
  if (contentType === "post") {
    if (tone === "professional") {
      templates.push(
        `I've been researching ${topic} extensively, and wanted to share some key insights with my network.\n\n${
          shortLength ? '' : `The data suggests that ${topic} is transforming how we approach business challenges in several ways. First, it's creating new opportunities for innovation across sectors. ${
            longLength ? `Second, it's reshaping customer expectations around service delivery and product features. Finally, it's driving a need for new skills and capabilities across organizations.` : ''
          }`
        }\n\nWhat trends in ${topic} are you most excited about in the coming year?`
      );
      
      templates.push(
        `New research on ${topic} reveals interesting patterns that could impact our industry moving forward.\n\n${
          shortLength ? '' : `The findings suggest that organizations embracing ${topic} are seeing measurable improvements in efficiency and market response. ${
            longLength ? `The data points to three critical success factors: strategic alignment, appropriate technology infrastructure, and skills development.` : ''
          }`
        }\n\nHave you implemented any ${topic} initiatives in your organization? I'd be interested in hearing about your experience.`
      );
    } else if (tone === "conversational") {
      templates.push(
        `I've been thinking a lot about ${topic} lately and honestly, it's fascinating how much it's changing things!\n\n${
          shortLength ? '' : `Every time I read about new developments in ${topic}, I can't help but wonder how we did things before. ${
            longLength ? `It's like we're in this constant state of evolution, and the possibilities seem endless. The challenges are real too, but the opportunities are even more exciting.` : ''
          }`
        }\n\nWhat's your take on ${topic}? Has it impacted your work or life in any way?`
      );
      
      templates.push(
        `Quick question for my network: How has ${topic} changed the way you approach your work?\n\n${
          shortLength ? '' : `I've noticed more conversations happening around ${topic} in my circles lately, and it's got me curious about different perspectives. ${
            longLength ? `Some colleagues are all-in, others are skeptical, and many are somewhere in the middle trying to figure out what it means for their careers and businesses.` : ''
          }`
        }\n\nWould love to hear your thoughts and experiences!`
      );
    } else if (tone === "enthusiastic") {
      templates.push(
        `I'm incredibly excited about the potential of ${topic} to transform how we work! 🚀\n\n${
          shortLength ? '' : `The possibilities are truly game-changing, and I believe we're just scratching the surface of what's possible. ${
            longLength ? `Every new development I see in this space reinforces my belief that we're witnessing a fundamental shift that will create tremendous value and opportunity for those who embrace it.` : ''
          }`
        }\n\nWho else is as excited about ${topic} as I am? Let's connect and share ideas!`
      );
      
      templates.push(
        `Just finished an amazing session on ${topic} and I'm buzzing with new ideas!\n\n${
          shortLength ? '' : `The insights shared were truly eye-opening and have completely shifted my thinking on several key aspects. ${
            longLength ? `I can already see multiple ways to apply these concepts to drive better outcomes and create more value. The energy and enthusiasm around this topic is absolutely contagious!` : ''
          }`
        }\n\nHas anyone else been exploring ${topic} recently? What exciting discoveries have you made?`
      );
    }
  } else if (contentType === "article") {
    if (tone === "professional") {
      templates.push(
        `# ${capitalizeFirstLetter(topic)}: A Strategic Perspective\n\nRecent developments in ${topic} warrant attention from business leaders across industries.\n\n${
          shortLength ? '' : `## Key Implications\n\n1. Market dynamics are shifting as ${topic} enables new business models and disrupts traditional value chains.\n\n${
            longLength ? `2. Competitive advantage increasingly depends on how effectively organizations leverage ${topic} in their operations and customer relationships.\n\n3. Workforce implications are significant, with new skills becoming essential and some roles being redefined or transformed.` : ''
          }`
        }\n\n## Moving Forward\n\nOrganizations that develop a clear strategy around ${topic} will be better positioned to thrive in an increasingly dynamic business environment. The time to act is now.`
      );
    } else if (tone === "thoughtful") {
      templates.push(
        `# Reconsidering ${capitalizeFirstLetter(topic)}: Beyond the Hype\n\nIn our rush to embrace new technologies and approaches, we often miss the nuanced implications of ${topic}.\n\n${
          shortLength ? '' : `## A Balanced Perspective\n\nWhile ${topic} offers remarkable opportunities, we must also consider the challenges it presents. The most successful implementations acknowledge both the potential and the limitations.\n\n${
            longLength ? `## Ethical Considerations\n\nAs we advance in ${topic}, questions of equity, access, and unintended consequences become increasingly important. A thoughtful approach requires us to address these concerns proactively rather than as afterthoughts.` : ''
          }`
        }\n\n## The Path Forward\n\nBy approaching ${topic} with both enthusiasm and critical thinking, we can harness its benefits while mitigating risks. This balanced approach will ultimately yield more sustainable and meaningful progress.`
      );
    }
  }
  
  return templates.length ? templates : [`Here are my thoughts on ${topic}...`];
}

function getHashtags(topic, tone) {
  // Generate relevant hashtags based on the topic and tone
  const topicWords = topic.toLowerCase().split(' ');
  const hashtagBase = topicWords.map(word => word.replace(/[^\w]/g, '')).filter(word => word.length > 3);
  
  // Industry-specific hashtags
  const industryHashtags = {
    ai: ["#ArtificialIntelligence", "#MachineLearning", "#AIInnovation"],
    technology: ["#TechTrends", "#Innovation", "#DigitalTransformation"],
    leadership: ["#LeadershipDevelopment", "#ExecutiveLeadership", "#TeamManagement"],
    marketing: ["#DigitalMarketing", "#MarketingStrategy", "#BrandBuilding"],
    career: ["#CareerDevelopment", "#ProfessionalGrowth", "#CareerAdvice"],
    business: ["#BusinessStrategy", "#Entrepreneurship", "#BusinessGrowth"]
  };
  
  // Find relevant industry hashtags
  let relevantHashtags = [];
  for (const [industry, tags] of Object.entries(industryHashtags)) {
    if (topic.toLowerCase().includes(industry)) {
      relevantHashtags = relevantHashtags.concat(tags.slice(0, 2));
    }
  }
  
  // Add tone-specific hashtags
  const toneHashtags = {
    professional: ["#ProfessionalDevelopment", "#BusinessInsights"],
    conversational: ["#ThoughtOfTheDay", "#LetsTalk"],
    enthusiastic: ["#GameChanger", "#ExcitingTimes"],
    thoughtful: ["#FoodForThought", "#DeepDive"],
    authoritative: ["#ExpertInsight", "#ThoughtLeadership"],
    humble: ["#LessonsLearned", "#AlwaysLearning"]
  };
  
  // Combine hashtags
  let finalHashtags = [];
  
  // Add 1-2 topic-specific hashtags
  if (hashtagBase.length > 0) {
    finalHashtags.push(`#${capitalizeFirstLetter(hashtagBase[0])}`);
    if (hashtagBase.length > 1) {
      finalHashtags.push(`#${capitalizeFirstLetter(hashtagBase[1])}`);
    }
  }
  
  // Add 1-2 industry hashtags
  if (relevantHashtags.length > 0) {
    finalHashtags.push(relevantHashtags[0]);
    if (relevantHashtags.length > 1) {
      finalHashtags.push(relevantHashtags[1]);
    }
  }
  
  // Add 1 tone hashtag
  if (toneHashtags[tone]) {
    finalHashtags.push(toneHashtags[tone][0]);
  }
  
  return finalHashtags.length > 0 ? `\n\n${finalHashtags.join(" ")}` : "";
}

function addEmojis(text, tone) {
  // Add appropriate emojis based on the content tone
  const toneEmojis = {
    professional: ["📊", "📈", "🔍", "💼", "🤝"],
    conversational: ["💭", "🤔", "👋", "💬", "☕"],
    enthusiastic: ["🚀", "✨", "💡", "🔥", "⚡"],
    thoughtful: ["🧠", "📝", "🤔", "📚", "💭"],
    authoritative: ["📊", "📑", "🏆", "💯", "📈"],
    humble: ["🙏", "📚", "🌱", "💫", "🧐"]
  };
  
  const emojis = toneEmojis[tone] || toneEmojis.professional;
  
  // Add emoji at the beginning of paragraphs
  const paragraphs = text.split("\n\n");
  
  // Add title emoji
  if (paragraphs[0].startsWith('#')) {
    paragraphs[0] = paragraphs[0] + ` ${randomItem(emojis)}`;
  } else {
    paragraphs[0] = `${randomItem(emojis)} ${paragraphs[0]}`;
  }
  
  // Add emoji to one more paragraph if text is long enough
  if (paragraphs.length > 1 && !paragraphs[1].startsWith('#') && Math.random() > 0.5) {
    paragraphs[1] = `${randomItem(emojis)} ${paragraphs[1]}`;
  }
  
  // Add emoji to ending question or statement
  if (paragraphs.length > 1) {
    const lastPara = paragraphs[paragraphs.length - 1];
    if (lastPara.includes('?')) {
      paragraphs[paragraphs.length - 1] = `${lastPara} ${randomItem(emojis)}`;
    }
  }
  
  return paragraphs.join("\n\n");
}

// Helper utilities
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}