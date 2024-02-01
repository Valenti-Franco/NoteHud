"use client";
import { Button, NavbarItem, User } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const UserComponent = () => {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <>
        <User
          className="hidden sm:flex"
          name={session.user.nombre}
          description={session.user.email}
          avatarProps={{
            src: "",
          }}
        />
        <Button
          color="danger"
          isBlock
          underline="hover"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }

  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Link isBlock underline="hover" href="/Signin">
          Login
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/Signin">
          <Button color="primary" variant="shadow">
            Sign Up
          </Button>
        </Link>
      </NavbarItem>
    </>
  );
};

export default UserComponent;
