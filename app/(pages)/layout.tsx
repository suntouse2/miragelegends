import { PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="relative pt-20 tablet:pt-30 !mb-20">{children}</main>
      <Footer />
    </>
  );
}
