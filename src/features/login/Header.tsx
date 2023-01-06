import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectProfile } from "./loginSlice";
import styled from "./Header.module.css";

const Header = () => {
  const profile = useAppSelector(selectProfile);
  return (
    <div className={styled.header}>
      <h3>{profile.email}</h3>
      <h1>Today's task</h1>
    </div>
  );
};

export default Header;
