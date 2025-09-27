import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  label: string;
  href: string;
  icon?: string;
}

interface MobileDropdownMenuProps {
  menuItems: MenuItem[];
  triggerIcon?: string;
  triggerAlt?: string;
}

export const MobileDropdownMenu = ({
  menuItems,
  triggerIcon = "/hamburger.svg",
  triggerAlt = "Menu",
}: MobileDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="blandLine" size="icon" className="p-0">
          <Image
            src={triggerIcon}
            alt={triggerAlt}
            width={24}
            height={24}
            className="w-6 h-6"
            priority
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32 bg-black border-gray-700"
      >
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="text-bland hover:bg-dark-hover focus:bg-dark-hover focus:text-bland"
          >
            <Link href={item.href} className="w-full">
              <div className="flex items-center space-x-2">
                <span>{item.label}</span>
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileDropdownMenu;
