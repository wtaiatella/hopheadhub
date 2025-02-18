import Footer from "@/components/footer";
import Header from "@/components/header";


export default function mainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
