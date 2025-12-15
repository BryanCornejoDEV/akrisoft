import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      try {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (e) {
        // ignore
      }
    };

    // immediate scroll
    scrollToTop();
    // fallback in case render/layout finishes later
    const t = setTimeout(scrollToTop, 50);
    const raf = requestAnimationFrame(scrollToTop);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </motion.div>
  );
}
