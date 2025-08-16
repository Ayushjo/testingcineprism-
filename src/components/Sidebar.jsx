"use client";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FilePlus2,
  ImageUp,
  Images,
  LogOut,
  FileText,
  Star,
  Menu,
  X,
} from "lucide-react";

const navigationItems = [
  { icon: FileText, label: "All Posts", id: "all-posts" },
  { icon: FilePlus2, label: "Create Post", id: "create-post" },
  { icon: Star, label: "Add Top Picks", id: "add-top-picks" },
  { icon: ImageUp, label: "Upload Poster", id: "upload-poster" },
  { icon: ImageUp, label: "Upload Reviews Poster", id: "upload-review-poster" },
  { icon: Images, label: "Upload Gallery", id: "upload-gallery" },
];

function Sidebar({
  activeView,
  onViewChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = (itemId) => {
    if (itemId === "logout") {
      console.log("Logout clicked");
      return;
    }
    onViewChange(itemId);
    // Close mobile menu when item is selected
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={`h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-700 flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-60" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span
            className={`text-white font-semibold text-lg whitespace-nowrap transition-all duration-200 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            Cinéprism
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95
                  ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`whitespace-nowrap font-medium transition-all duration-200 ${
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-slate-300 font-medium text-sm">A</span>
          </div>
          <div
            className={`whitespace-nowrap transition-all duration-200 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          >
            <div className="text-white font-medium text-sm">Admin</div>
            <div className="text-slate-400 text-xs">Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar overlay
  const MobileSidebar = () => (
    <>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700 flex flex-col z-50 lg:hidden transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-white font-semibold text-lg">
                    Cinéprism
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
                        ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 font-medium text-sm">A</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Admin</div>
                  <div className="text-slate-400 text-xs">Dashboard</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block h-full">
        <DesktopSidebar />
      </div>

      {/* Mobile Sidebar - only shown on mobile */}
      <MobileSidebar />
    </>
  );
}
