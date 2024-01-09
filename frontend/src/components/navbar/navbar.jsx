import React, { Component, useEffect, useState, useContext } from "react";
import "../../styles/navbar/navbar.css";
import { MdSettings, MdHelp, MdKeyboard } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { rcContext } from "../../App";

function NavBar() {
  const {isOpen, setOpen, setModal, setWin, help, setHelp, setSettings} = useContext(rcContext);
  const currentRoute = useLocation();
  const navigate = useNavigate();
  const toggle = () => setOpen(!isOpen);
  return (
    <>
      <div className="nav">
        <MdKeyboard className="keyboardicon" style={{marginLeft: "25px", fontSize: "45px"}} onClick={toggle}/>
        <button className="giveupm" onClick={() => {setModal(true); setWin(2)}}>በቃኝ</button>
        <div style={{display: "flex", alignItems: "center"}}>
          <button className="giveup" onClick={() => {setModal(true); setWin(2)}}>በቃኝ</button>
          <MdSettings onClick={() => setSettings(true)} className="righticon"/>
          <MdHelp onClick={() => setHelp(true)} className="righticon"/>
        </div>
      </div>
    </>
  );
}
export default NavBar;
