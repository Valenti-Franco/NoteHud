import React from "react";
import SigninComponent from "../components/signin/SigninComponent";

const page = async () => {
  return (
    <div className="w-full h-dvh light light:bg-gray-100 light:text-black bg-black text-white dark dark:bg-gray-900 dark:text-white bg-white text-black">
      <SigninComponent />
    </div>
  );
};

export default page;
