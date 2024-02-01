"use client";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
// import Notes from "./Notes/Notes";

import CategorySelect from "./Category/CategorySelect";
import NotesComponent from "./Notes/NotesComponent";

const ResponsiveNotes = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        className="w-full justify-center"
        aria-label="Options"
        color="secondary"
        variant="underlined"
        
      >
        <Tab key="Category" title="Category">
          <CategorySelect />
        </Tab>
        <Tab key="Notes" title="Notes">
          <NotesComponent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ResponsiveNotes;
