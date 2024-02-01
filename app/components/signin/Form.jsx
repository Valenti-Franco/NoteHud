"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
// import styles from "./signin.module.scss";
import LoginInput from "./loginInput";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Router, { useRouter } from "next/navigation";
import axios from "axios";

const FormSingIn = ({ theme }) => {
  const [mail, setMail] = useState("");
  // const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [isInvalidMail, setIsInvalidMail] = useState("");
  const router = useRouter();
  const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
  };
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_user,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_user: Yup.string().required("User name is required."),

    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const signUpHandler = async (e) => {
    console.log(name, email, password);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://notehud.somee.com/api/Usuarios/Register",
        {
          nombre: name,
          email: email,
          password: password,
        }
      );
      // setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setRegister(true);
    } catch (error) {
      setLoading(false);
      setUser({
        ...user,
        success: "Verification token sent!",
        error: error.response.data.message,
      });
      console.log(error);
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_user,
      password: login_password,
    };

    // const res = await axios.post(
    //   "https://fvecommerce.somee.com/api/Usuarios/authenticate",
    //   {
    //     nombre: login_email,
    //     password: login_password,
    //   }
    // );
    // console.log(res);
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return router.push("/");
    }
  };

  return (
    <div
      className={
        theme !== "light"
          ? "dark dark:bg-gray-900 dark:text-white bg-white text-black container h-full   flex flex-col xl:flex-row m-auto"
          : "light light:bg-gray-100 light:text-black bg-black text-white container h-full  flex m-auto"
      }
    >
      <div className=" flex justify-center items-center flex-col w-full xl:w-1/2">
        <Card className=" w-full h-full xl:h-4/6  p-6 py-4">
          <div class="w-full xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-2 xl:px-16 py-8 rounded-lg">
            <h2 class="text-center text-2xl font-bold tracking-wide ">LogIn</h2>
            <p class="text-center text-sm  mt-2">
              Already have an account?{" "}
              <a
                href="#"
                class="text-blue-600 hover:text-blue-700 hover:underline"
                title="Sign In"
              >
                LogIn here
              </a>
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                login_user,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form
                  method="post"
                  action="https://notehud.somee.com/api/Usuarios/authenticate"
                >
                  <input
                    type="hidden"
                    name="csrfToken"
                    // defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_user"
                    icon="email"
                    placeholder="User name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <div className="text-blue-300">
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>

                  {login_error && (
                    <span className="text-red-500 w-full">{login_error} </span>
                  )}
                  <div className="flex justify-end">
                    <Button className=" " type="submit" color="primary">
                      Sign in
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </div>
      <div className="   flex justify-center items-center flex-col w-full xl:w-1/2">
        <Card className=" w-full h-full xl:h-5/6  p-6 py-4">
          <div class="w-full xl:w-[500px] 2xl:w-[550px] overflow-y-auto mt-8 mx-auto px-2 xl:px-16 py-8 rounded-lg">
            <h2 class="text-center text-2xl font-bold tracking-wide ">
              Sing Up
            </h2>
            <p class="text-center text-sm  mt-2">
              Get access to one of the best services in the World.{" "}
              <a
                href="#"
                class="text-blue-600 hover:text-blue-700 hover:underline"
                title="Sign In"
              >
                Sing Up
              </a>
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={(e) => {
                signUpHandler(e);
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />

                  <div className="flex justify-end">
                    <Button className=" " type="submit" color="primary">
                      Sign up
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className="text-green-500">{success}</span>}
            </div>
            {/* <div>{error && <span className="text-red-500">{error}</span>}</div> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormSingIn;
