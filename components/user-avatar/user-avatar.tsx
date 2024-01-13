"use client";

import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./user-avatar.module.css";

const UserAvatar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div onClick={() => signOut()} className={styles.avatarContainer}>
          <span className={styles.text}>logout</span>
          <Image
            className={styles.avatar}
            src={session.user?.image ?? "./avatar.jpg"}
            width={41}
            height={41}
            alt="user avatar"
            priority
          />
        </div>
      ) : null}
    </>
  );
};

export default UserAvatar;
