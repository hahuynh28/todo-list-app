import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* background layer */}
      <div className="absolute inset-0 bg-gradient-background pointer-events-none" />

      <div className="relative z-10">
        <Header />
        <main className="relative z-10 min-h-screen">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
