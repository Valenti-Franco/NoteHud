import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Chip,
  User,
} from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import UserComponent from "./UserComponent";

const Header = () => {
  return (
    <Navbar
      isBordered
      className="light light:bg-gray-200 light:text-black bg-black text-white dark dark:bg-gray-900 dark:text-white bg-white text-black"
    >
      <NavbarBrand>
        <Link href="/">
          <Chip className=" cursor-pointer" color="secondary" variant="shadow">
            NoteHud
          </Chip>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        <UserComponent />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
