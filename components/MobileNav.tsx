"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="sm:hidden"
          src="/icons/hamburger.svg"
          alt="mobile nav toggle"
          width={32}
          height={32}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-none bg-dark-1 w-3/4 max-w-72 text-white"
      >
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex gap-1 items-center">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="max-sm:size-10"
              />

              <p className="text-[26px] font-extrabold ">Meeto</p>
            </Link>
          </SheetTitle>
          <SheetDescription>
            <SheetClose asChild>
              <section className="flex flex-1 mt-5 flex-col gap-4">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);

                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg text-white",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />

                        <p className="text-md font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
