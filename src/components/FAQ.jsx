import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-5 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-left">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: 'What is SocialBoost all about?',
      answer: 'SocialBoost is a platform that helps professionals and businesses increase their LinkedIn presence through engagement automation. We provide tools to boost the reach and visibility of your LinkedIn posts by facilitating engagement such as likes, comments, and connections.'
    },
    {
      id: 2,
      question: 'Can I use SocialBoost for free?',
      answer: 'Yes! We offer a free starter plan that allows you to experience the basic features of our platform. You can engage with up to 5 posts per month and join 1 engagement pod. For more advanced features and higher engagement limits, you can upgrade to our paid plans.'
    },
    {
      id: 3,
      question: 'What do I get on the free trial?',
      answer: 'Our free trial gives you full access to all premium features for 7 days, including unlimited engagement pods, AI-generated comments, analytics dashboard, and priority customer support. No credit card is required to start your free trial.'
    },
    {
      id: 4,
      question: 'What is an engagement pod?',
      answer: 'An engagement pod is a group of LinkedIn users who agree to engage with each other\'s content. When a member posts on LinkedIn, they share it with the pod, and other members provide likes, comments, and shares to boost the post\'s visibility in the LinkedIn algorithm.'
    },
    {
      id: 5,
      question: 'Is there a risk for my LinkedIn account?',
      answer: 'SocialBoost is designed to mimic natural engagement patterns and operates within LinkedIn\'s terms of service. We use gradual, organic engagement to avoid triggering LinkedIn\'s spam detection algorithms. However, as with any automation tool, we recommend using it responsibly and maintaining a balance between automated and manual activity on your account.'
    },
    {
      id: 6,
      question: 'Why is the reach of my LinkedIn posts important?',
      answer: 'The reach of your LinkedIn posts directly impacts your personal brand visibility, networking opportunities, and potential business connections. Greater reach means more people see your content, which can lead to more profile views, connection requests, job opportunities, partnerships, and sales leads.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Frequently asked questions</h2>
          <p className="text-gray-600">
            More questions? <a href="#contact" className="text-blue-600 hover:underline">We're here to help.</a>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;