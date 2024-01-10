import { useState, useEffect, useContext, useRef } from "react";
import "../styles/home.css"
import {keyboard} from "./keybord";
import { rcContext } from "../App";
import Win from "./win";
import Help from "./help";
import Settings from "./settings";
import { useSearchParams } from "react-router-dom";
import { decrypt } from "./encryption";

function Box() {
    let r = [];
    let c = [];
    const {columns, rows, wordState, dcolor} = useContext(rcContext);
    for (let i = 0; i < rows; i++)
    {
        c = [];
        for (let j = 0; j < columns; j++)
        {
            c.push(<input type="text" disabled className="column" style={{backgroundColor : dcolor[i][j]}} key={j} value={wordState[i][j]}></input>)
        }
        r.push(<div className="row" key={i}>{c}</div>)
    }
    return (
        <>{r}</>
    )
}

function Home() {
    const {row, column, setRow, setColumn, columns, rows, wordState, setWordState, word, setDcolor, evk, choice, hohe, setHohe, setEvk, setChoice, already, setAlready, setModal, win, setWin, top, setTop, cookies, setWord} = useContext(rcContext);
    const imgRef = useRef(null);
    const [givenword, setGivenWord] = useSearchParams();
    useEffect(() => {
        if (givenword.get('givenword'))
        {
            setWord(decrypt(givenword.get('givenword')));
        }
    }, [])
    const handleKeyDown = (event) => {
        event.preventDefault();
        if (win == 0)
        {
            keyboard(event.key, setWordState, wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, hohe, setHohe, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop, cookies);
        }
    }
    useEffect (() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener ('keydown', handleKeyDown);
        };
    }, []);
    return (
        <>
            <Win imgRef={imgRef} handleKeyDown={handleKeyDown}/>
            <Help/>
            <Settings />
            <div ref={imgRef} className="boxparent">
                <div className="box" id="box">
                    <Box/>
                </div>
            </div>
        </>
    )
}


export default Home;
