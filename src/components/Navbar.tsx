"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Perfis", href: "/profiles", icon: "👤" },
  { name: "Jogos", href: "/games", icon: "🎮" },
  { name: "Conquistas", href: "/achievements", icon: "🏆" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-dark border-b border-gray-700 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span className="text-xl font-bold text-primary">Xbox API</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-colors
                      flex items-center gap-2
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-colors
                  flex items-center gap-2
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
