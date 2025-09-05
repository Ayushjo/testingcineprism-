import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FilePlus2,
  ImageUp,
  Images,
  FileText,
  Star,
  Menu,
  X,
  TrendingUp
} from "lucide-react";

const navigationItems = [
  { icon: FileText, label: "All Posts", id: "all-posts" },
  { icon: FilePlus2, label: "Create Post", id: "create-post" },
  { icon: Star, label: "Add Top Picks", id: "add-top-picks" },
  { icon: ImageUp, label: "Upload Poster", id: "upload-poster" },
  { icon: ImageUp, label: "Upload Reviews Poster", id: "upload-review-poster" },
  { icon: Images, label: "Upload Gallery", id: "upload-gallery" },
  { icon: FilePlus2, label: "Edit Post", id: "edit-post" },
  { icon: TrendingUp, label: "Edit Trending Rank", id: "edit-rank" },
  { icon: File, label: "Create Article", id: "create-article" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine active view from current path
  const getActiveView = () => {
    const path = location.pathname;
    if (path === "/admin" || path === "/admin/") return "create-post";
    if (path.includes("/admin/")) {
      return path.split("/admin/")[1];
    }
    return "create-post";
  };

  const activeView = getActiveView();

  const handleNavigate = (viewId) => {
    if (viewId === "logout") {
      console.log("Logging out");
      navigate("/");
    } else {
      navigate(`/admin/${viewId}`);
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
    }
  };

  const handleItemClick = (itemId) => {
    handleNavigate(itemId);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Sidebar */}
          <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700 flex flex-col z-[110] md:hidden">
            {/* Mobile Header */}
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-white font-semibold text-lg">
                    Cinéprism Admin
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

            {/* Mobile Navigation */}
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

            {/* Mobile Footer */}
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

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div
          className={`hidden md:flex h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-700 flex-col transition-all duration-300 ease-in-out sticky top-0 ${
            isExpanded ? "w-60" : "w-16"
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Desktop Header */}
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

          {/* Desktop Navigation */}
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

          {/* Desktop Footer */}
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

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Floating Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto pt-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
