import { Search, Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full">
      <nav className="nav">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" width={45} height={45} alt="logo" className="sm:w-full sm:h-full w-8 h-8" />
          <p className="nav-logo sm:pl-2 pl-1">
            Price<span className="text-primary">Smart</span>
          </p>
        </Link>

        {/* Nav Links */}
        {/* <div className="flex items-center gap-10">
            <Search className="icon"/>
            <Heart className="icon"/>
            <User className="icon"/>
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
