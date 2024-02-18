import React from "react";
import SideBar from "../side-bar";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Link from "next/link";
import styles from "./add-item-form.module.css";

const AddItemForm = () => {
  return (
    <SideBar>
      <div className={styles.addItemFormContainer}>
        <h2 className={styles.formTitle}>Add a new item</h2>
        <form className={styles.addItemForm}>
          <div className={styles.inputContainer}>
            <Input
              required
              placeholder="Enter a name"
              labelProps={{ id: "item-name", label: "Name" }}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              textarea
              placeholder="Enter a note"
              labelProps={{ id: "item-description", label: "Note" }}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              placeholder="Enter a url"
              labelProps={{ id: "item-image-url", label: "Image" }}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              required
              placeholder="Enter a category"
              labelProps={{ id: "item-category", label: "Category" }}
              categoryList={[
                "Fruit and vegetables",
                "Meat and Fish",
                "Beverages",
              ]}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button buttonType="cancel">
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              buttonType="primary"
              onButtonClick={async () => {
                "use server";
                console.log("Hello");
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </SideBar>
  );
};

export default AddItemForm;
