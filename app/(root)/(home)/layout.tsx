import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <section>
      <Navbar />

      <section className="flex absolute w-full">
        <Sidebar />

        <main className="flex flex-col w-full min-h-screen px-6 pt-28 pb-6 max-md:pb-14 sm:px-14">
          {children}
        </main>
      </section>
    </section>
  );
};

export default HomeLayout;
