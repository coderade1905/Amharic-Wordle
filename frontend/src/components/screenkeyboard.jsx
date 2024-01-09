import { IoReturnDownBack, IoBackspace } from "react-icons/io5";
import { useState,  useContext } from "react";
import { rcContext } from "../App";
import { BackSpace, CheckAndEnter } from "./keybord";

function ScreenKeyboard() {
    const {row, column, setRow, setColumn, columns, rows, wordState, setWordState, word, dcolor, setDcolor, evk, choice, hohe, setHohe, setEvk, setChoice, already, setAlready, win, setWin, setModal, top, setTop, cookies} = useContext(rcContext);
    let keybord = [];
    let newArr = [];
    let [selected, setSelected] = useState([]);
    let abugida = {'ሀ': ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ'], 'ለ': ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ'], 'ሐ': ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ'], 'መ': ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ'], 'ሠ': ['ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ'], 'ረ': ['ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ'], 'ሰ': ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ'], 'ሸ': ['ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ'], 'ቀ': ['ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ'], 'በ': ['በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ'], 'ተ': ['ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ'], 'ቸ': ['ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ'], 'ኅ': ['ኅ', 'ኁ', 'ኂ', 'ኃ', 'ኄ', 'ኅ', 'ኆ'], 'ነ': ['ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ'], 'ኘ': ['ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ'], 'አ': ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ'], 'ከ': ['ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ'], 'ኸ': ['ኸ', 'ኹ', 'ኺ', 'ኻ', 'ኼ', 'ኽ', 'ኾ'], 'ወ': ['ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ'], 'ዐ': ['ዐ', 'ዑ', 'ዒ', 'ዓ', 'ዔ', 'ዕ', 'ዖ'], 'ዘ': ['ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ'], 'ዠ': ['ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ'], 'የ': ['የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ'], 'ደ': ['ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ'], 'ጀ': ['ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ'], 'ገ': ['ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጐ'], 'ጠ': ['ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ'], 'ጨ': ['ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ'], 'ጰ': ['ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ'], 'ጸ': ['ጸ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ'], 'ፀ': ['ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ'], 'ፈ': ['ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ'], 'ፐ': ['ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ'], 'ቨ': ['ቨ', 'ቩ', 'ቪ', 'ቫ', 'ቬ', 'ቭ', 'ቮ']};
    let chars = {"b" : ["በ"], "c" : ["ሰ", "ጨ", "ቸ", "ከ"], "d" : ["ደ"], "f" : ["ፈ"], "g" : ["ገ", "ጀ"], "h" : ["ሀ", "ሐ", "ኅ", "ኸ"], "j" : ["ጀ"] ,"k" : ["ከ", "ቀ"], "l" : ["ለ"], "m" : ["መ"], "n" : ["ነ", "ኘ"], "p" : ["ፐ", "ጰ"], "q" : ["ቀ"], "r" : ["ረ"], "s" : ["ሸ", "ሰ" ,"ሠ"], "t" : ["ተ", "ጠ", "ፀ", "ጸ"], "v" : ["ቨ"], "w" : ["ወ"], "x" : ["አ", "ዐ", "ዠ"], "y" : ["የ"], "z" : ["ዘ", "ዠ"]};
    let seen = [];
    let dbcolor;
    let [mkey, setMkey] = useState();
    let [mchoice, setMchoice] = useState();
    for (let key in chars)
    {
        chars[key].forEach((element, i) => {
            dbcolor = "rgb(99, 99, 99)";
            if (!seen.includes(element))
            {
                if (element in already)
                {
                    dbcolor = already[element];
                }
                seen.push(element);
                keybord.push(<button style={{background: dbcolor}} onClick={() => {window.scrollTo(0, top); setSelected(abugida[element]); setMkey(key.toLowerCase()); setMchoice(i)}} className="key" key={element}>{element}</button>)
            }
        });
    }
    return (<>
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
    <div className="selected">{selected.map((element, i) => <button  className="key1"  key={i} onClick={() => {
        if (win == 0)
        {
            setHohe(i);
            setEvk(oldArray => [...oldArray, [mkey, i]]);
            setChoice(oldArray => [...oldArray, mchoice]);
            setWordState(prevArr => {
                newArr = [...prevArr];
                newArr[row][column] = element;
                if ((column != columns))
                {
                    setColumn(column => column + 1);
                }
                return newArr;
            });
        }
    }}>{element}</button>)}</div></div>
    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div className="keyboard">{keybord} <button className="key" key="back" onClick={() => BackSpace(setWordState, row, column, setColumn, evk, choice, setEvk, setChoice)}><IoBackspace/></button> <button className="key" key="enter" onClick={() => CheckAndEnter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop, cookies)}><IoReturnDownBack/></button></div>
        </div> </>)
}

export default ScreenKeyboard