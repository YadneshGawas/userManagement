// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function EnterAnimation({ children, duration = 1, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
