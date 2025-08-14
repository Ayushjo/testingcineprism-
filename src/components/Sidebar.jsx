"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FilePlus2, ImageUp, Images, LogOut, FileText } from "lucide-react";

const navigationItems = [
  { icon: FileText, label: "All Posts", id: "all-posts" },
  { icon: FilePlus2, label: "Create Post", id: "create-post" },
  { icon: ImageUp, label: "Upload Poster", id: "upload-poster" },
  { icon: Images, label: "Upload Gallery", id: "upload-gallery" },
];

export default function Sidebar({ activeView, onViewChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = (itemId) => {
    if (itemId === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
      return;
    }
    onViewChange(itemId);
  };

  return (
    <motion.div
      className="h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-700 flex flex-col"
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: isExpanded ? "flex-start" : "center" }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <motion.span
            className="text-white font-semibold text-lg whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : -10,
            }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
          >
            Cinéprism
          </motion.span>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  className="whitespace-nowrap font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -10,
                  }}
                  transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: isExpanded ? "flex-start" : "center" }}
        >
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-slate-300 font-medium text-sm">A</span>
          </div>
          <motion.div
            className="whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : -10,
            }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
          >
            <div className="text-white font-medium text-sm">Admin</div>
            <div className="text-slate-400 text-xs">Dashboard</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
