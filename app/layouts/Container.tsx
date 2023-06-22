import BottomNav from "../components/BottomNav";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "./Providers";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Header />
      <main className="mx-auto pb-28 px-2 relative max-w-5xl md:px-0 md:pb-16">
        {children}
      </main>
      <Footer/>
      <BottomNav />
    </Providers>
  );
};

export default Container;
