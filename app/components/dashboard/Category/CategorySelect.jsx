"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import ModalCreateCategory from "./ModalCreateCategory";
import { GlobalStateContext } from "@/app/SessionContext";

import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import EditCategory from "./ModalEditCategory";
import ModalDeleteCategory from "./ModalDeleteCategory";

const CategorySelect = () => {
  const { data: session, status } = useSession();

  const [categoryEdit, setcategoryEdit] = useState("");
  const [categoryDelete, setcategoryDelete] = useState("");

  const { theme, setTheme } = useTheme();

  const {
    selectedCategories,
    setSelectedCategories,
    setCategories,
    categories,
  } = useContext(GlobalStateContext);

  // console.log(session);
  const [mounted, setMounted] = useState(false);

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
  useEffect(() => {
    setMounted(true);

    if (status === "authenticated") {
      getCategories();
    }
  }, [status]);

  if (!mounted) return null;

  return (
    <div class="rounded bg-grey-light  flex-no-shrink   mt-2">
      <ModalCreateCategory theme={theme} getCategories={getCategories} />
      <div class="flex justify-between py-1"></div>
      <div class="text-sm mt-2">
        <RadioGroup
          className="w-full "
          onChange={(e) => setSelectedCategories(e.target.value)}
          label="Select Category "
        >
          <Radio
            className={
              theme !== "light"
                ? "dark dark:bg-gray-900 dark:text-white bg-white text-black w-full "
                : "light light:bg-gray-100 light:text-black bg-black text-white w-full "
            }
            value={""}
          >
            All
          </Radio>
          {categories?.map((category) => (
            <Radio
              className={
                theme !== "light"
                  ? "dark dark:bg-gray-900 dark:text-white bg-white text-black w-full flex gap-2 justify-evenly "
                  : "light light:bg-gray-100 light:text-black bg-black text-white w-full  flex justify-evenly"
              }
              value={category.id}
              key={category.id}
            >
              <div className=" flex w-full items-center gap-2">
                {category.name.length > 10
                  ? `${category.name.substring(0, 10)}...`
                  : category.name.padEnd(20, " ")}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      color="primary"
                      variant="Light"
                      aria-label="Actions Category"
                    >
                      <SlOptionsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Action event example">
                    <DropdownItem
                      key={category}
                      onClick={() => setcategoryEdit(category)}
                      color="primary"
                      className="text-primary"
                    >
                      Edit file
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      onClick={() => setcategoryDelete(category)}
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Radio>
          ))}
          {categoryEdit !== "" && (
            <EditCategory
              theme={theme}
              idCategory={categoryEdit.id}
              getCategories={getCategories}
              categoryEdit={categoryEdit}
              setcategoryEdit={setcategoryEdit}
            />
          )}
          {categoryDelete !== "" && (
            <ModalDeleteCategory
              theme={theme}
              idCategory={categoryDelete.id}
              getCategories={getCategories}
              categoryDelete={categoryDelete}
              setcategoryDelete={setcategoryDelete}
            />
          )}
        </RadioGroup>
        {/* {categoiesArch.map((category) => (
          <div
            key={category.id}
            class="bg-gray-300 p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
          >
            {category.name}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CategorySelect;
