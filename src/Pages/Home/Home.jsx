import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// Sections
import HeroSection from "../HeroSection/HeroSection";
import ModernEducation from "../ModernEducation/ModernEducation";
import LatestTuitions from "../LatestTuitions/LatestTuitions";
import LatestTutors from "../Tutors/LatestTutors/LatestTutors";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import FAQ from "../ExtraSections/FAQ";
import Testimonials from "../ExtraSections/Testimonial";
import Blog from "../ExtraSections/Blog";
import Newsletter from "../ExtraSections/Newsletter";
import Contact from "../Contact/Contact";
import Categories from "../ExtraSections/Categories";
import Highlights from "../ExtraSections/Highlights";
import CTA from "../ExtraSections/CTA";
import ScrollToTopButton from "../ScrollToTopButton";
import AIChatModal from "../../Shared/AiChat";

const Home = () => {
  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div>
      <title>eTuitionBd-Home</title>
<AIChatModal></AIChatModal>
      {/* 1. Hero */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <HeroSection />
      </motion.div>

      {/* 2. CTA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <CTA />
      </motion.div>

      {/* 3. Modern Education */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ModernEducation />
      </motion.div>

      {/* 4. Highlights */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Highlights />
      </motion.div>

      {/* 5. Latest Tuitions */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LatestTuitions />
      </motion.div>

      {/* 6. Latest Tutors */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LatestTutors />
      </motion.div>

      {/* 7. Why Choose Us */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <WhyChooseUs />
      </motion.div>

      {/* 8. Categories */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Categories />
      </motion.div>

      {/* 9. FAQ */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <FAQ />
      </motion.div>

      {/* 10. Testimonials */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Testimonials />
      </motion.div>

      {/* 11. Blog */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Blog />
      </motion.div>

      {/* 12. Newsletter */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Newsletter />
      </motion.div>

      {/* 13. Contact */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <Contact />
      </motion.div>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
