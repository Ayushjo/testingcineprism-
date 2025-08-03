import { motion } from "framer-motion";

export default function ThemedLoader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-16 h-16"
      >
        {/* The main prism shape */}
        <div className="w-full h-full border-2 border-emerald-400 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-emerald-400/50 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-400/50 rounded-full" />

        {/* The background glow */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl -z-10" />
      </motion.div>
    </div>
  );
}
