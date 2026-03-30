import type React from "react";
import { useMatches } from "react-router-dom";

type BreadcrumbHandle = {
  breadcrumb?: () => React.ReactNode;
};

export const Breadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches.filter(
    (match) => (match.handle as BreadcrumbHandle | undefined)?.breadcrumb,
  );

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500">
      {crumbs.map((match, index) => {
        const breadcrumb = (match.handle as BreadcrumbHandle).breadcrumb?.();

        return (
          <span key={match.id} className="flex items-center gap-2">
            {breadcrumb}
            {index < crumbs.length - 1 && <span>&gt;</span>}
          </span>
        );
      })}
    </nav>
  );
};
