import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { useSession } from "next-auth/react";
import axios from "axios";
const ModalCreate = ({
  theme,
  createNote,
  setCreateNote,
  getNotes,
  categories,
  setcategories,
  getCategories,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getCategories();
    }
  }, [status]);

  const postNewNote = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:7014/api/Notes",
        {
          title: createNote.title,
          message: createNote.message,
          categoryId: createNote.category,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setCreateNote({
        title: "",
        message: "",
        category: "",
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="mt-2"
        color="primary"
        endContent={<IoAdd />}
      >
        Create Note
      </Button>
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
                Create Note
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={createNote?.title}
                  onChange={(e) =>
                    setCreateNote({ ...createNote, title: e.target.value })
                  }
                  //   variant={"bordered"}
                  label="Title"
                  placeholder="Enter your Title"
                />

                <Textarea
                  label="Message"
                  value={createNote?.message}
                  onChange={(e) =>
                    setCreateNote({ ...createNote, message: e.target.value })
                  }
                  placeholder="Enter your Message"
                  //   className="max-w-xs"
                />
                <Select
                  items={categories}
                  label="Categories"
                  placeholder="Select Category"
                  value={createNote?.category}
                  onChange={(e) =>
                    setCreateNote({ ...createNote, category: e.target.value })
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
                  color="primary"
                  onClick={() => postNewNote()}
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreate;
