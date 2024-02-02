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
  DropdownItem,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MdDeleteSweep } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const ModalEditArchive = ({
  theme,
  getNotes,
  archiveNote,
  setarchiveNote,
  idNote,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session, status } = useSession();

  const EditArchiveNote = async () => {
    try {
      const { data } = await axios.put(
        `https://notehud.somee.com/api/Notes/${idNote}/Archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      getNotes();
      toast.success("Note cahnge state to archive");
    } catch (error) {
      console.log(error);
      toast.error("Error to change state to archive");
    }
  };

  return (
    <>
      <Button
        key="new"
        onPress={onOpen}
        color="secondary"
        description="Create a new file"
        startContent={<MdDeleteSweep />}
      >
        Change state to archive
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
                Note {archiveNote?.title}
              </ModalHeader>
              <ModalBody>
                Do you want to change the status of the current note?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => EditArchiveNote()}
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

export default ModalEditArchive;
