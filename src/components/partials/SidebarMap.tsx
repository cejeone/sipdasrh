"use client";

import { ThemeProvider } from "next-themes";
import Link from "next/link";
import MapLoader from "../MapLoader";

export default function SidebarMap({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapLoader />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div className="flex min-h-screen bg-gray-100 text-gray-900">
          {/* Sidebar */}
          <aside className="w-64 bg-base-green p-4 hidden md:block">
            <h2 className="font-bold text-lg mb-4">Menu</h2>
            <nav className="flex flex-col gap-2 px-2 pb-5 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <Link href="/map" className="text-white">
                    Layer
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-white">
                    Basemap
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-white">
                    Legend
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-white">
                    Bookmarks
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1">{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
}
