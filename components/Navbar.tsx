import Image from "next/image";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed px-6 py-4 w-full text-white z-50 bg-dark-1">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />

        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Meeto
        </p>
      </Link>

      <section className="flex gap-2">
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* <ModeToggle /> */}

        <MobileNav />
      </section>
    </nav>
  );
};

export default Navbar;
