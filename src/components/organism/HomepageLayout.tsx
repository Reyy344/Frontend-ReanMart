import React from "react";

interface HomepageLayoutProps {
  children: React.ReactNode;
}

export const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
