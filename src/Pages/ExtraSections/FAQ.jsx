import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const faqs = [
    { q: "How do I become a verified tutor?", a: "Register as a tutor and upload your educational certificates and NID through your dashboard. Our admin team will verify your documents within 24-48 hours." },
    { q: "Is my payment secure?", a: "Yes, we use Stripe's world-class encrypted payment infrastructure. Your money is only released to the tutor after the student approves the application." },
    { q: "Can I post more than one tuition?", a: "Absolutely! Students can post multiple requirements for different subjects or classes simultaneously." }
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary-600 text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="collapse collapse-arrow bg-base-100 rounded-2xl border border-secondary-200">
              <input type="radio" name="my-accordion-2" defaultChecked={i === 0} /> 
              <div className="collapse-title text-xl font-bold text-primary-500 py-6">
                {faq.q}
              </div>
              <div className="collapse-content text-secondary-600 border-t border-base-200 pt-4"> 
                <p className="pb-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQ;