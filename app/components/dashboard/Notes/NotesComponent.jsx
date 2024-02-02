"use client";
import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdDeleteForever, MdDeleteSweep, MdEdit } from "react-icons/md";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import ModalCreate from "./ModalCreateNote";
import ModalEditArchive from "./ModalEditArchive";
import { GlobalStateContext } from "@/app/SessionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesComponent = () => {
  const [selected, setSelected] = useState("NoArchive");

  const {
    selectedCategories,
    setSelectedCategories,
    categories,
    setCategories,
  } = useContext(GlobalStateContext);
  const { data: session, status } = useSession();
  const [notes, setnotes] = useState([]);
  const [notesArchive, setnotesArchive] = useState([]);

  const [editNote, seteditNote] = useState("");
  const [createNote, setCreateNote] = useState({
    title: "",
    message: "",
    category: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [archiveNote, setarchiveNote] = useState({
    id: "",
    title: "",
    message: "",
    category: "",
  });
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://notehud.somee.com/api/Category",
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  const editNotePut = async () => {
    console.log(editNote);
    try {
      const { data } = await axios.put(
        `https://notehud.somee.com/api/Notes/${editNote.id}`,
        {
          title: editNote.title,
          message: editNote.message,
          categoryId: editNote.categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const { data } = await axios.get(
        "https://notehud.somee.com/api/Notes/NoArchived",
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      const dataArchive = await axios.get(
        "https://notehud.somee.com/api/Notes/Archived",
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      setnotes(data);
      //   console.log(dataArchive.data);
      setnotesArchive(dataArchive.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setMounted(true);

    if (status === "authenticated") {
      getNotes();
      getCategories();
    }
  }, [status]);

  if (!mounted) return null;

  return (
    <>
      <div className="flex w-full gap-2 flex-col">
        <ModalCreate
          getNotes={getNotes}
          theme={theme}
          createNote={createNote}
          setCreateNote={setCreateNote}
          getCategories={getCategories}
          categories={categories}
          setcategories={setCategories}
        />
        <Tabs
          className="w-full justify-center"
          aria-label="Options"
          color="secondary"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab className="w-full" key="NoArchive" title="Active">
            <Accordion>
              {notes.map((note) =>
                Number(note.categoryId) === Number(selectedCategories) ||
                selectedCategories === "" ? (
                  <AccordionItem
                    key={note.id}
                    title={`Title:  ${note.title}`}
                    className={
                      theme !== "light"
                        ? "dark dark:bg-gray-700 dark:text-white bg-white text-black p-4 rounded-xl m-2  "
                        : "light light:bg-gray-200 light:text-black bg-black text-white  p-4 rounded-xl m-2  "
                    }
                  >
                    <div className="flex flex-col w-full">
                      <p>Mesagge:</p>
                      <p className="text-xl p-4">{note.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        key="new"
                        onPress={onOpen}
                        color="primary"
                        description="Create a new file"
                        startContent={<MdEdit />}
                        onClick={() => seteditNote(note)}
                      >
                        Edit Note
                      </Button>
                      <ModalEditArchive
                        theme={theme}
                        getNotes={getNotes}
                        archiveNote={archiveNote}
                        setarchiveNote={setarchiveNote}
                        idNote={note.id}
                      />
                    </div>
                  </AccordionItem>
                ) : null
              )}
            </Accordion>
          </Tab>
          <Tab key="archive" title="Archive">
            <Accordion>
              {notesArchive.map((note) =>
                Number(note.categoryId) === Number(selectedCategories) ||
                selectedCategories === "" ? (
                  <AccordionItem
                    key={note.id}
                    title={`Title:  ${note.title}`}
                    className={
                      theme !== "light"
                        ? "dark dark:bg-gray-700 dark:text-white bg-white text-black p-4 rounded-xl m-2  "
                        : "light light:bg-gray-200 light:text-black bg-black text-white  p-4 rounded-xl m-2  "
                    }
                  >
                    <div className="flex flex-col w-full">
                      <p>Mesagge:</p>
                      <p className="text-xl p-4">{note.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        key="new"
                        onPress={onOpen}
                        color="primary"
                        description="Create a new file"
                        startContent={<MdEdit />}
                        onClick={() => seteditNote(note)}
                      >
                        Edit Note
                      </Button>
                      <ModalEditArchive
                        theme={theme}
                        getNotes={getNotes}
                        archiveNote={archiveNote}
                        setarchiveNote={setarchiveNote}
                        idNote={note.id}
                      />
                    </div>
                  </AccordionItem>
                ) : null
              )}
            </Accordion>
          </Tab>
        </Tabs>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={"center"}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent
          className={
            theme !== "light"
              ? "dark dark:bg-gray-700 dark:text-white bg-white text-black p-4 rounded-xl    "
              : "light light:bg-gray-200 light:text-black bg-black text-white  p-4 rounded-xl   "
          }
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Note
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={editNote?.title}
                  onChange={(e) =>
                    seteditNote({ ...editNote, title: e.target.value })
                  }
                  //   variant={"bordered"}
                  label="Title"
                  placeholder="Enter your Title"
                />

                <Textarea
                  label="Message"
                  value={editNote?.message}
                  onChange={(e) =>
                    seteditNote({ ...editNote, message: e.target.value })
                  }
                  placeholder="Enter your Message"
                  //   className="max-w-xs"
                />
                <Select
                  items={categories}
                  label="Categories"
                  placeholder="Select Category"
                  value={editNote?.category}
                  onChange={(e) =>
                    seteditNote({ ...editNote, category: e.target.value })
                  }
                >
                  {(categories) => (
                    <SelectItem
                      className={
                        theme !== "light"
                          ? "dark dark:bg-gray-700 dark:text-white bg-white text-black p-4 rounded-xl    "
                          : "light light:bg-gray-200 light:text-black bg-black text-white  p-4 rounded-xl   "
                      }
                      key={categories.id}
                      value={categories.id}
                    >
                      {categories.name}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => editNotePut()}
                  color="primary"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default NotesComponent;
