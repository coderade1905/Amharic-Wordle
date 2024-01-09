import { MdClose } from "react-icons/md";
import "../styles/modal.css";
import { useContext, useState } from "react";
import { rcContext } from "../App";
import Select from 'react-select';
import { useNavigate } from "react-router";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const options = [
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' }
]
const options1 = [
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ]
function Settings()
{
    const {settings, setSettings, cookies, setCookie} = useContext(rcContext);
    const toggle = () => setSettings(!settings);
    const navigate = useNavigate();

    let columns = (cookies.columns ? cookies.columns : 5);
    let rows = (cookies.rows ? cookies.rows : 10);
    let [mode, setMode] = useState(cookies.mode ? cookies.mode : false);

    return(
        <div className="modalparent" style={{display : (settings ? "flex" : "none")}}>
            <div className="modal">
                <div className="modalheader">
                    <MdClose className="closeicon" onClick={toggle} />
                </div>
                <div className="modalbody">
                    <h2 className="modaltext">ማስተካከያ</h2>
                    <div className="flexcenter ncr" style={{marginBottom: "10px"}}>
                        <label htmlFor="">የቃላት ብዛት : </label>
                        <Select onChange={(event) => {columns = event.value}} defaultValue={options[columns - 3]} options={options} />
                    </div>
                    <div className="flexcenter ncr">
                        <label htmlFor="">የሙከራዋች ብዛት : </label>
                        <Select onChange={(event) => {rows = event.value}}  defaultValue={options1[rows - 5]} options={options1} />
                    </div>
                    <div style={{display: "grid", placeItems: "center", marginTop: "15px"}} className="ncr">
                        <label htmlFor="">ከባድ ሞድ (እያንዳንዱ ግምት መዝገበ ቃላት ውስጥ መኖር አለበት) : </label>
                        {mode == true ? <FaToggleOn onClick={() => {setMode(false)}} className="toogleicon" />  : <FaToggleOff onClick={() => {setMode(true)}} className="toogleicon" /> }
                    </div>
                    <div className="flexcenter ncr">
                        <button className="save" onClick={() => {
                            setCookie("columns", columns);
                            setCookie("rows", rows);
                            setCookie("mode", mode);
                            navigate(0);
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;