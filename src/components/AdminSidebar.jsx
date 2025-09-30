"use client";

import { FilePlus2, ImageUp, Images, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Edit } from "lucide-react";

const navigationItems = [
  {
    icon: FilePlus2,
    label: "Create Post",
    id: "create-post",
  },
  {
    icon: ImageUp,
    label: "Upload Poster",
    id: "upload-poster",
  },
  {
    icon: Images,
    label: "Upload Gallery",
    id: "upload-gallery",
  },
  {
    icon: LogOut,
    label: "Logout",
    id: "logout",
  },
  {
    icon: FilePlus2,
    label: "Create Quote",
    id: "create-quote",
  },
  { icon: Edit, label: "Edit Quote", id: "edit-quote" },
];

export default function AdminSidebar({ onNavigate, activeView }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleNavigation = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-700">
      <div className="flex h-full w-full flex-col bg-slate-900/80 backdrop-blur-xl">
        <SidebarHeader className="p-4">
          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              scale: isCollapsed ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            {!isCollapsed && (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CP</span>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-sm">
                    Cinéprism
                  </h2>
                  <p className="text-slate-400 text-xs">Admin Dashboard</p>
                </div>
              </>
            )}
          </motion.div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(item.id)}
                  isActive={activeView === item.id}
                  tooltip={isCollapsed ? item.label : undefined}
                  className="group relative overflow-hidden transition-all duration-200 hover:bg-slate-800/60"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 w-full"
                  >
                    <item.icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors duration-200" />
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: isCollapsed ? 0 : 1,
                        x: isCollapsed ? -10 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-300 group-hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </motion.span>
                  </motion.div>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={false}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
