
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Is QTify free to use?",
    answer: "Yes! QTify offers 100 Thousand Songs, ad-free. Our songs are sourced from various artists around the world."
  },
  {
    id: "2", 
    question: "Can I download and listen to songs offline?",
    answer: "Sorry, unfortunately we don't provide the service to download any songs."
  },
  {
    id: "3",
    question: "Where can I find podcasts?",
    answer: "You can find podcasts in the Podcasts section. We have over thousands of podcast episodes available."
  },
  {
    id: "4",
    question: "How do I create playlists?",
    answer: "You can create custom playlists by clicking on any album and selecting 'Add to Playlist' option."
  }
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 px-6 bg-qtify-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-qtify-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border border-qtify-gray rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left bg-qtify-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-qtify-dark font-medium text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-qtify-dark transition-transform duration-200 ${
                    openItems.includes(item.id) ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {openItems.includes(item.id) && (
                <div className="p-6 bg-qtify-white border-t border-qtify-gray">
                  <p className="text-qtify-dark leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
