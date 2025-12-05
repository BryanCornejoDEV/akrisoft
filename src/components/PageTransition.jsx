import { motion } from 'framer-motion'
import Footer from './Footer.jsx'

const variants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    scale: 0.98,
    filter: 'blur(8px)'
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    filter: 'blur(8px)'
  }
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 1
      }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
      <Footer />
    </motion.div>
  )
}
