import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

import CategorySelect from "./Category/CategorySelect";
import Notes from "./Notes/Notes";
import ResponsiveNotes from "./ResponsiveNotes";

const DashboardComponent = () => {
  return (
    <div className="m-auto container ">
      <div class="bg-blue w-full h-screen font-sans">
        <div class="hidden xl:flex gap-2 justify-center px-4 pb-8 items-start ">
          <CategorySelect />
          <Notes />
        </div>
        <div class="flex xl:hidden ">
          <ResponsiveNotes />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
