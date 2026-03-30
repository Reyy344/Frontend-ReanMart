import React from "react";

interface ProductDetailLayoutProps {
  children: React.ReactNode;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  children,
}) => {
  return <div className="flex flex-col">{children}</div>;
};
