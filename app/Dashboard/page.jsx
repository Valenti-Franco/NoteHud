import React from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent";

const page = () => {
  return (
    <div className="w-full h-dvh light light:bg-gray-100 light:text-black bg-black text-white dark dark:bg-gray-900 dark:text-white bg-white text-black">
      <DashboardComponent />
    </div>
  );
};

export default page;
