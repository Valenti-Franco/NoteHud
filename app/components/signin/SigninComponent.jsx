"use client";
import { Card, CardBody, CardHeader, Input, Progress } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Form from "./Form";

const SigninComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const validateMail = (value) => {
    setMail(value);
    setIsInvalidMail(!validateEmail(value));
  };

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-full">
      {theme === undefined ? (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      ) : (
        <Form theme={theme} />
      )}
    </div>
  );
};

export default SigninComponent;
