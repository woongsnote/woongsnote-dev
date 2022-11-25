import "../styles/globals.css";
import BottomNav from "./BottomNav";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <NavBar />
        <main className="pt-10 relative mx-auto container max-w-screen-md pb-28 md:pb-16 px-2 lg:px-0">
          <div className="px-4 pt-2 mx-auto">{children}</div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
