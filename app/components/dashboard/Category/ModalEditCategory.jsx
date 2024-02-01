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

import { useSession } from "next-auth/react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
const ModalCreateCategory = ({
  theme,
  //   createNote,
  //   setCreateNote,
  //   getNotes,
  getCategories,
  idCategory,
  categoryEdit,
  setcategoryEdit,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  const EditCategory = async () => {
    try {
      const { data } = await axios.put(
        `https://notehud.somee.com/api/Category/${idCategory}`,
        {
          name: categoryEdit.name,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setcategoryEdit({
        name: "",
      });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="w-ful"
        color="primary"
        endContent={<MdEdit />}
      >
        Edit Category
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
                Edit Category
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={categoryEdit?.name}
                  onChange={(e) =>
                    setcategoryEdit((prevCategoryEdit) => ({
                      ...prevCategoryEdit,
                      name: e.target.value,
                    }))
                  }
                  label="Title"
                  placeholder="Enter your Name Category"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => EditCategory()}
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

export default ModalCreateCategory;
