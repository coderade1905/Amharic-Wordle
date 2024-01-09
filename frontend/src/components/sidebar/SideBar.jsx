import React, { useState, useContext } from "react";
import classNames from "classnames";
import ScreenKeyboard from "../screenkeyboard";
import { rcContext } from "../../App";
import "../../styles/navbar/sidebar.css";

function SideBar() {
  const {isOpen} = useContext(rcContext);
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <ScreenKeyboard />
    </div>
  );
}
export default SideBar;
