import "../styles/globals.css";
import AppBar from "./appbar";
import BottomNav from "./bottom-nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <AppBar />
        <main className="pt-10 relative mx-auto container max-w-screen-md pb-28 md:pb-16 px-2 lg:px-0">
          <div className="px-4 md:px-8 mx-auto">{children}</div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
