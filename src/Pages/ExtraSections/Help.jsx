import React, { useState } from 'react';
import { 
  HelpCircle, BookOpen, MessageCircle, Mail, ShieldCheck, 
  CreditCard, Phone, Clock, UserCheck, Search, 
  Video, Calendar, TrendingUp, AlertCircle, 
  ChevronDown, ChevronUp, Send, X
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const HelpComponent = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqCategories = [
    {
      name: "For Students",
      icon: <BookOpen className="text-blue-500" size={20} />,
      faqs: [
        {
          question: "How do I post a tuition requirement?",
          answer: "As a student, navigate to your dashboard and click 'Post New Tuition'. Fill in the subject, budget, location, and preferred schedule. Your post will be visible to tutors once our Admin team approves it (usually within 2-4 hours).",
          tags: ["posting", "tuition"]
        },
        {
          question: "How do I select a tutor?",
          answer: "After posting your requirement, interested tutors will apply. You can review their profiles, ratings, and qualifications. Once you select a tutor, you'll need to approve them in your dashboard to start the tuition.",
          tags: ["selection", "tutor"]
        },
        {
          question: "What if I'm not satisfied with my tutor?",
          answer: "You can request a tutor change within the first 3 sessions. Go to your dashboard, select the tuition session, and click 'Request Change'. Our support team will help you find a suitable replacement.",
          tags: ["satisfaction", "replacement"]
        }
      ]
    },
    {
      name: "For Tutors",
      icon: <UserCheck className="text-green-500" size={20} />,
      faqs: [
        {
          question: "How do I apply for tuition posts?",
          answer: "Browse available tuition posts in your dashboard's 'Find Tuitions' section. Click 'Apply' on posts matching your expertise. Include a personalized message and your expected salary range.",
          tags: ["application", "jobs"]
        },
        {
          question: "When do I get paid?",
          answer: "Payments are processed weekly. After completing a session, mark it as completed in your dashboard. Payments are released every Monday for sessions completed the previous week.",
          tags: ["payment", "earnings"]
        },
        {
          question: "How do I update my profile?",
          answer: "Go to your profile settings to update qualifications, experience, subjects, and hourly rates. A complete profile increases your chances of selection by 40%.",
          tags: ["profile", "update"]
        }
      ]
    },
    {
      name: "Payment & Security",
      icon: <ShieldCheck className="text-purple-500" size={20} />,
      faqs: [
        {
          question: "How does the payment system work?",
          answer: "We use Stripe for secure transactions. Students pay the tuition fee upfront to approve a tutor. The payment is held securely until the tuition session is completed and confirmed by both parties.",
          tags: ["payment", "security"]
        },
        {
          question: "Is my personal data safe?",
          answer: "Yes! We use JWT for authentication, Firebase for secure logins, and encrypt all sensitive data. Your contact information is only shared after mutual agreement between student and tutor.",
          tags: ["privacy", "security"]
        },
        {
          question: "What are the platform fees?",
          answer: "We charge a 10% service fee from tutors for successful matches. This covers platform maintenance, secure payments, and customer support. No hidden charges for students.",
          tags: ["fees", "charges"]
        }
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Video Tutorials",
      description: "Step-by-step guides on using eTuitionBD",
      icon: <Video className="text-blue-600" size={24} />,
      link: "#",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: <MessageCircle className="text-green-600" size={24} />,
      link: "#",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Blog & Tips",
      description: "Educational resources and tips",
      icon: <TrendingUp className="text-purple-600" size={24} />,
      link: "#",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Report Issue",
      description: "Report bugs or problems",
      icon: <AlertCircle className="text-red-600" size={24} />,
      link: "#",
      color: "bg-red-50 border-red-200"
    }
  ];

  const supportOptions = [
    {
      type: "Live Chat",
      icon: <MessageCircle size={32} />,
      description: "Instant help from our support team",
      availability: "24/7",
      responseTime: "2-5 minutes",
      action: "Start Chat",
      color: "bg-primary-200",
      buttonColor: "bg-white text-primary-600 hover:bg-secondary-50"
    },
    {
      type: "Email Support",
      icon: <Mail size={32} />,
      description: "Detailed queries and documentation",
      availability: "24/7",
      responseTime: "2-4 hours",
      action: "Email Us",
      color: "bg-primary-300",
      buttonColor: "bg-white text-primary-600 hover:bg-secondary-50"
    },
    {
      type: "Phone Support",
      icon: <Phone size={32} />,
      description: "Direct conversation with our team",
      availability: "10 AM - 6 PM",
      responseTime: "Immediate",
      action: "Call Now",
      color: "bg-primary-400",
      buttonColor: "bg-white text-primary-600 hover:bg-secondary-50"
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();

    setShowContactForm(false);
    setContactData({ name: '', email: '', subject: '', message: '' });
    toast('Thank you for your message! We will respond within 24 hours.');
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filteredFaqs = faqCategories.flatMap(category => 
    category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
        <ToastContainer></ToastContainer>
      {/* Header Section */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-2">
          <HelpCircle className="text-blue-600" size={48} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold ">
          How can we help you?
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Get instant answers to your questions about eTuitionBD
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className={`p-4 rounded-xl border ${link.color} hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 rounded-lg bg-white">
                {link.icon}
              </div>
              <h3 className="font-semibold ">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </a>
        ))}
      </section>

      {/* FAQ Categories */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold ">Frequently Asked Questions</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredFaqs.length} questions found
          </span>
        </div>

        {searchQuery ? (
          // Search Results
          <div className="space-y-4">
            <p className="text-gray-600">Search results for: <span className="font-semibold">"{searchQuery}"</span></p>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle size={20} className="text-gray-400" />
                      <span className="font-medium ">{faq.question}</span>
                    </div>
                    {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {activeFaq === index && (
                    <div className="mt-4 pl-9">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found. Try different keywords.</p>
              </div>
            )}
          </div>
        ) : (
          // Categorized FAQs
          <div className="space-y-6">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h3 className="text-xl font-semibold ">{category.name}</h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex} className="p-4 hover:bg-gray-50 transition-colors">
                      <button
                        onClick={() => toggleFaq(`${catIndex}-${faqIndex}`)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="font-medium ">{faq.question}</span>
                        {activeFaq === `${catIndex}-${faqIndex}` ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {activeFaq === `${catIndex}-${faqIndex}` && (
                        <div className="mt-3 pl-4">
                          <p className="text-gray-600">{faq.answer}</p>
                          <div className="flex gap-2 mt-3">
                            {faq.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Support */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold  text-center">Contact Our Support Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <div key={index} className={`rounded-xl overflow-hidden shadow-lg ${option.color} text-white`}>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {option.icon}
                  <h3 className="text-xl font-bold">{option.type}</h3>
                </div>
                <p className="text-white/90">{option.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>Available: {option.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>Response: {option.responseTime}</span>
                  </div>
                </div>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${option.buttonColor}`}
                  onClick={() => {
                    if (option.type === "Email Support") {
                      setShowContactForm(true);
                    } else {
                      // Handle other actions
                      toast(`Initiating ${option.type}...`);
                    }
                  }}
                >
                  {option.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold ">Contact Support</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={contactData.name}
                  onChange={(e) => setContactData({...contactData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={contactData.subject}
                  onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={contactData.message}
                  onChange={(e) => setContactData({...contactData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 rounded-xl p-6 md:p-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h4 className="font-bold  text-lg">eTuitionBD Support Center</h4>
            <p className="text-gray-600">We're here to help you 24/7</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-semibold ">Support Hours</p>
              <p className="text-gray-600 text-sm">24/7 via Chat & Email</p>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <p className="font-semibold ">Phone Support</p>
              <p className="text-gray-600 text-sm">10 AM - 6 PM</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 eTuitionBD. All rights reserved. | Reliable Tuition Matching Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelpComponent;