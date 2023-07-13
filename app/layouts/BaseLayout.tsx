import BottomNav from './Nav/BottomNav';
import Header from './Header';
import Footer from './Footer';
import Providers from './Providers';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps): React.ReactElement => {
  return (
    <Providers>
      <Header />
      <main className="mx-auto pb-28 px-2 relative max-w-2xl md:px-0 md:pb-16">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </Providers>
  );
};

export default BaseLayout;
