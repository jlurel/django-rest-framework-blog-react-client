import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="relative min-h-screen">
      <header>
        <Header />
      </header>
      <main className="pb-48">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
