// nav-links.tsx

"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

// Enhanced links array
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Mathematical Definitions",
    href: "/mathematical-definitions",
    icon: UserGroupIcon,
  },
  {
    name: "Search Algorithms",
    icon: UserGroupIcon,
    subLinks: [
      { name: "BFS", href: "/search-algorithms/bfs" },
      { name: "DFS", href: "/search-algorithms/dfs" },
      { name: "A*", href: "/search-algorithms/a-star" },
    ],
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {}
  );

  // Toggle accordion by link name
  const handleToggle = (linkName: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [linkName]: !prev[linkName],
    }));
  };

  return (
    <div className="flex flex-col space-y-1">
      {links.map((link) => {
        const LinkIcon = link.icon;

        // If the link has subLinks, we treat it as an accordion parent
        const hasSubLinks = link.subLinks && link.subLinks.length > 0;
        const isOpen = openAccordions[link.name] || false;

        // If there's no subLinks, we just render a direct <Link>
        if (!hasSubLinks) {
          return (
            <Link
              key={link.name}
              href={link.href || "/"} // fallback if needed
              className={clsx(
                "flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }

        // For parent links with subLinks
        return (
          <div key={link.name} className="flex flex-col">
            {/* Parent item that toggles the dropdown */}
            <button
              type="button"
              onClick={() => handleToggle(link.name)}
              className={clsx(
                "flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
              <svg
                className={clsx(
                  "ml-auto h-4 w-4 transition-transform md:mr-2",
                  { "rotate-180": isOpen }
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Render sublinks if open */}
            {isOpen && (
              <div className="ml-8 flex flex-col space-y-1 border-l border-gray-300 pl-3">
                {link.subLinks.map((subLink) => (
                  <Link
                    key={subLink.name}
                    href={subLink.href}
                    className={clsx(
                      "flex h-[40px] items-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
                      {
                        "bg-sky-100 text-blue-600": pathname === subLink.href,
                      }
                    )}
                  >
                    <p>{subLink.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
