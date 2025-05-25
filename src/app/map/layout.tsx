import SidebarMap from "@/components/partials/SidebarMap"; //js dan css arcgis
import "../globals.css";

export const metadata = {
  title: "App",
  description: "App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarMap>{children}</SidebarMap>
      </body>
    </html>
  );
}
