import {chars, abugida, same} from "./amharic";
import verify from './verify';
import axios from "axios";

const client = axios.create({ baseURL: "https://amwordlebackend.onrender.com", headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    }
});


let vowel = ["a", "e", "i", "o", "u"];
let winn;
function Enter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop)
{
    
    winn = 0;
    if (!(row == rows))
    {
        if (column !== columns)
        {
            alert("Not enough words");
        }
        else{
            if (wordState[row].length > rows - 1){
                wordState[row].pop();
            }
            let wordarr = word.split("");
            let color;
            let root;
            evk.forEach((element, i) => {
                color = "#222";
                root = abugida[chars[element[0]][choice[i]]];
                if (root[0] in same)
                {
                    let concatd = [];
                    abugida[root[0]].forEach((element) => {
                        concatd.push(element);
                    })
                    same[root[0]].forEach(sameelement => {
                        abugida[sameelement].forEach(sameelement1 => {
                            concatd.push(sameelement1);
                        });
                    });
                    if (concatd.some((element1) => wordarr.includes(element1)))
                    {
                        color = '#772';
                        if (concatd.includes(wordarr[i])){
                            color = '#22a';
                            if (wordarr[i] == abugida[root[0]][element[1]]) {
                                color = '#2a2';
                                winn += 1;
                            }
                            same[root[0]].forEach(sameelement => {
                                if (wordarr[i] == abugida[sameelement][element[1]]) {
                                    color = '#2a2';
                                    winn += 1;
                                }
                            });
                        }
                    }
                    same[abugida[root[0]][0]].forEach((element) => {
                        already[element] = color;
                    })
                }
                else{
                    root = abugida[chars[element[0]][choice[i]]];
                    if (root.some((element1) => wordarr.includes(element1)))
                    {
                        color = '#772';
                        if (root.includes(wordarr[i])){
                            color = '#22a';
                            if (wordarr[i] == root[element[1]])
                            {
                                color = '#2a2';
                                winn += 1;
                            }
                        }
                    }
                }
                already[abugida[root[0]][0]] = color;
                verify(row, rows, i, color, setDcolor, winn, columns, setModal, setWin);
            });
            setRow(row => row + 1);
            setColumn(0);
            setEvk([]);
            setChoice([]);
            if (row > 2)
            {
                setTop(top + 80);
                window.scrollTo(0, top);
            }
        }
    }
}
function CheckAndEnter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop, cookies)
{
    if (cookies.mode)
    {
        let words = [];
        let root;
        let wordrow = wordState[row];
        words.push(wordrow.join(""));
        evk.forEach((element, i) => {
            root = abugida[chars[element[0]][choice[i]]];
            if (root[0] in same)
            {
                same[root[0]].forEach(element1 => {
                    words.forEach(element2 => {
                        let possibleword = element2.replace(wordState[row][i], abugida[element1][element[1]]);
                        if (!(words.includes(possibleword)))
                        {
                            words.push(possibleword);
                        }
                    }
                    )
                });
            }
        })
        client
        .get(`/check/${words.join(",")}`)
        .then((response) => {
        if (response.data.message)
        {
            Enter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop);
        }
        else {
            alert("Word is not in dictionary");
        }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    else{
        Enter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop);
    }
}

function BackSpace(setWordState, row, column, setColumn, evk, choice, setEvk, setChoice)
{
    let newArr = [];
    setWordState(prevArr => {
        newArr = [...prevArr];
        if (column != 0)
        {
            newArr[row][column-1] = "";
            setColumn(column - 1);
        }
        return newArr;
    });
    setEvk(evk.slice(0, -1));
    setChoice(choice.slice(0, -1))
}

function keyboard(key, setWordState, wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, hohe, setHohe, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop, cookies)
{
    window.scrollTo(0, top);
    if (!(row >= rows))
    {
        let newArr = [];
        if ((vowel.includes(key.toLowerCase())) && column !== 0)
        {
            let vowelmap = {a : 3, e : 5, i : 2, o : 6, u : 1}
            setWordState(prevArr => {
                newArr = [...prevArr];
                newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][vowelmap[key.toLowerCase()]]
                return newArr;
            }); 
            setHohe(vowelmap[key.toLowerCase()]);
            let newEvk = [...evk];
            newEvk[column-1][1] = vowelmap[key.toLowerCase()];
            setEvk(newEvk);
        }
        if (/^([1-7])$/.test(key))
        {
            if (column !== 0)
            {
                setWordState(prevArr => {
                    newArr = [...prevArr];
                    newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][key-1]
                    return newArr;
                }); 
                setHohe(key-1);
                let newEvk = [...evk];
                newEvk[column-1][1] = key-1;
                setEvk(newEvk);
            }
        }
        if (key == "ArrowRight")
        {
            if (column !== 0)
            {
                if (chars[evk[column-1][0]].length !== choice[column-1] + 1)
                {
                    choice[column-1] = choice[column-1] + 1;
                }
                setWordState(prevArr => {
                    newArr = [...prevArr];
                    if (!(vowel.includes(evk[column-1]))) {  newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][hohe] }
                    return newArr;
                });
            }
        }
        if (key == "ArrowLeft")
        {
            if (column !== 0)
            {
                if (choice[column-1] !== 0)
                {
                    choice[column-1] = choice[column-1] - 1;
                }
                setWordState(prevArr => {
                    newArr = [...prevArr];
                    if (!(vowel.includes(evk[column-1]))) {  newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][hohe] }
                    return newArr;
                });
            }
        }
        if (key == "ArrowUp")
        {
            if (column !== 0)
            {
                if (hohe !== 6)
                {
                    setWordState(prevArr => {
                        newArr = [...prevArr];
                        if (!(vowel.includes(evk[column-1]))) {  newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][hohe+1] }
                        return newArr;
                    });
                    setHohe(hohe + 1);
                    let newEvk = [...evk];
                    newEvk[column-1][1] = hohe+1;
                    setEvk(newEvk);
                }
            }
        }
        if (key == "ArrowDown")
        {
            if (column !== 0)
            {
                if (hohe !== 0)
                {
                    setWordState(prevArr => {
                        newArr = [...prevArr];
                        if (!(vowel.includes(evk[column-1]))) {  newArr[row][column-1] = abugida[chars[evk[column-1][0]][choice[column-1]]][hohe-1] }
                        return newArr;
                    });
                    setHohe(hohe - 1);
                    let newEvk = [...evk];
                    newEvk[column-1][1] = hohe-1;
                    setEvk(newEvk);
                }
            }
        }
        if (key == "Enter")
        {
            CheckAndEnter(wordState, rows, columns, row, column, setColumn, setRow, word, setDcolor, evk, choice, setEvk, setChoice, already, setAlready, setModal, setWin, top, setTop, cookies);

        }
        if (key == "Backspace")
        {
            BackSpace(setWordState, row, column, setColumn, evk, choice, setEvk, setChoice);
        }
        else{
            if ((/^([a-zA-Z])$/.test(key) && (!(vowel.includes(key.toLowerCase())))) && (column != columns))
            {
                setEvk(oldArray => [...oldArray, [key.toLowerCase(), 0]]);
                setChoice(oldArray => [...oldArray, 0]);
                setHohe(0);
                setWordState(prevArr => {
                    newArr = [...prevArr];
                    newArr[row][column] = abugida[chars[key.toLowerCase()][0]][0]
                    if ((column != columns))
                    {
                        setColumn(column => column + 1);
                    }
                    return newArr;
                });
            }
        }
    }
}

export {keyboard, CheckAndEnter, BackSpace};