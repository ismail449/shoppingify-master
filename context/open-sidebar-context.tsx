"use client";

import { useContext, createContext, FC, ReactNode, useState } from "react";

type OpenSidebarType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const OpenSidebarContext = createContext<OpenSidebarType>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const OpenSidebarProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.screen.width > 992) {
      return;
    }
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  return (
    <OpenSidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </OpenSidebarContext.Provider>
  );
};

export const useOpenSidebarContext = () => {
  return useContext(OpenSidebarContext);
};
