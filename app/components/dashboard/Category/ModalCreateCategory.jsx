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
const ModalCreateCategory = ({
  theme,
  //   createNote,
  //   setCreateNote,
  //   getNotes,
  getCategories,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session, status } = useSession();
  const [createCategory, setCreateCategory] = useState({
    name: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      getCategories();
    }
  }, [status]);

  const postNewCategory = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:7014/api/Category",
        {
          name: createCategory.name,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setCreateCategory({
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
        className="w-full"
        color="primary"
        endContent={<IoAdd />}
      >
        Create Category
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
                Create Category
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={createCategory?.title}
                  onChange={(e) => setCreateCategory({ name: e.target.value })}
                  //   variant={"bordered"}
                  label="Title"
                  placeholder="Enter your Title"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => postNewCategory()}
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
