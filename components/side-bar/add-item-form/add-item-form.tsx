import React from "react";
import SideBar from "../side-bar";
import Input from "@/components/input/input";
import styles from "./add-item-form.module.css";

const AddItemForm = () => {
  return (
    <SideBar>
      <div className={styles.addItemFormContainer}>
        <h2 className={styles.formTitle}>Add a new item</h2>
        <form className={styles.addItemForm}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="item-name">
              Name
            </label>
            <Input required placeholder="Enter a name" name="item-name" />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="item-description">
              Note (optional)
            </label>
            <Input
              placeholder="Enter a name"
              name="item-description"
              textarea
            />
          </div>
        </form>
      </div>
    </SideBar>
  );
};

export default AddItemForm;
