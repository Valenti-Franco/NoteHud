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
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const ModalDeleteCategory = ({
  theme,
  //   createNote,
  //   setCreateNote,
  //   getNotes,
  getCategories,
  idCategory,
  categoryDelete,
  setcategoryDelete,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  const DeleteCategory = async () => {
    try {
      const { data } = await axios.delete(
        `https://notehud.somee.com/api/Category/${idCategory}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setcategoryDelete("");
      toast.success("Category deleted");
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error("Error to delete category");
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="w-full"
        color="danger"
        endContent={<MdDelete />}
      >
        Delete Category
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
                Delete Category
              </ModalHeader>
              <ModalBody>
                You want to delete the category {categoryDelete?.name}?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onClick={() => DeleteCategory()}
                  onPress={onClose}
                >
                  yes, DELETE
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteCategory;
