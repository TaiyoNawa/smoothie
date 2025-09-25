import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { MobileDropdownMenu } from "./DropdownMenu";

const menuItemsList = [
  { label: "Menu", href: "#menu", icon: "/menu.svg" },
  { label: "About", href: "#about", icon: "/about.svg" },
  { label: "Contact", href: "#contact", icon: "/contact.svg" },
];

export const Header = () => {
  return (
    <header className="w-full h-[60px] bg-black px-4 md:px-8 flex items-center justify-between">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
          priority
        />

        <span className="text-bland text-lg font-medium hidden md:block">
          Bland Name
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-4">
        {menuItemsList.map((item) => (
          <Link href={item.href} key={item.label}>
            <Button variant="blandLine">{item.label}</Button>
          </Link>
        ))}

        {/* Desktop Icons */}
        <div className="flex items-center space-x-4 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="p-0 hover:bg-dark-hover"
          >
            <Image
              src="/shopping_cart.svg"
              alt="Shopping Cart"
              width={24}
              height={24}
              className="w-6 h-6"
              priority
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 hover:bg-dark-hover"
          >
            <Image
              src="/account.svg"
              alt="Account"
              width={24}
              height={24}
              className="w-6 h-6"
              priority
            />
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center space-x-4">
        <Button variant="ghost" size="icon" className="p-0 hover:bg-dark-hover">
          <Image
            src="/shopping_cart.svg"
            alt="Shopping Cart"
            width={24}
            height={24}
            className="w-6 h-6"
            priority
          />
        </Button>
        <Button variant="ghost" size="icon" className="p-0 hover:bg-dark-hover">
          <Image
            src="/Account.svg"
            alt="Login"
            width={24}
            height={24}
            className="w-6 h-6"
            priority
          />
        </Button>

        {/* Hamburger Menu */}
        <MobileDropdownMenu menuItems={menuItemsList} />
      </div>
    </header>
  );
};

export default Header;
