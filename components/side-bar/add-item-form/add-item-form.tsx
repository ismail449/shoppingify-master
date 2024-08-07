"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../side-bar";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Link from "next/link";
import { addItem, getUserCategories } from "@/server-actions/server-actions";
import { useFormState } from "react-dom";
import styles from "./add-item-form.module.css";
import InputWithList from "@/components/input-with-list/input-with-list";

const initialFormState = {
  message: "",
  isError: false,
};

const AddItemForm = () => {
  const [state, addItemFormAction] = useFormState(addItem, initialFormState);
  const [userCategories, setUserCategories] = useState<string[]>();

  useEffect(() => {
    fetchUserCategories();
  }, []);
  const fetchUserCategories = async () => {
    const userCategories = await getUserCategories();
    if (!userCategories) return;
    setUserCategories(userCategories);
  };
  const addItemWithCategoryUpdate = async (formData: FormData) => {
    addItemFormAction(formData);
    await fetchUserCategories();
  };
  return (
    <SideBar>
      <div className={styles.addItemFormContainer}>
        <h2 className={styles.formTitle}>Add a new item</h2>
        <form action={addItemWithCategoryUpdate} className={styles.addItemForm}>
          <div className={styles.inputContainer}>
            <Input
              required
              placeholder="Enter a name"
              label="Name"
              name="name"
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              textarea
              placeholder="Enter a note"
              label="Note"
              name="note"
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              placeholder="Enter a url"
              label="Image"
              type="url"
              name="image"
            />
          </div>

          <div className={styles.inputContainer}>
            <InputWithList
              required
              placeholder="Enter a category"
              label="Category"
              listItems={userCategories ?? [""]}
              name="category"
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Link href={{ search: "isSidebarOpen=true" }}>
              <Button buttonType="transparent">Cancel</Button>
            </Link>
            <Button type="submit" buttonType="primary">
              Save
            </Button>
          </div>
        </form>
        <p
          className={`${styles.formMessage} ${
            state.isError ? styles.error : styles.success
          }`}
        >
          {state.message}
        </p>
      </div>
    </SideBar>
  );
};

export default AddItemForm;
