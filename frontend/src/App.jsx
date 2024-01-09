import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from 'react';
import Home from './components/HomePage';
import  NavBar from './components/navbar/navbar';
import SideBar from './components/sidebar/SideBar';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { DNA } from 'react-loader-spinner'

const client = axios.create({ baseURL: "https://amwordlebackend.onrender.com", headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    }
});

export const rcContext = createContext();

function App() {
  const [isOpen, setOpen] = useState(false);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [word, setWord] = useState("");
  let [hohe, setHohe] = useState();
  const [evk, setEvk]= useState([]);
  const [choice, setChoice]= useState([]);
  const [already, setAlready] = useState({});
  const [modal, setModal] = useState(false);
  const [help, setHelp] = useState(false);
  const [settings, setSettings] = useState(false);
  const [win, setWin] = useState(0);
  const [top, setTop] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['rows'], ['columns'], ['mode']);

  let columns = (cookies.columns ? cookies.columns : 5);
  let rows = (cookies.rows ? cookies.rows : 10);

  const [wordState, setWordState] = useState(Array.from( {length: rows}, ()=> Array.from ( {length: columns}, () => "")));
  const [dcolor, setDcolor] = useState(Array.from( {length: rows}, ()=> Array.from ( {length: columns}, () => "transparent")));
  
  useEffect(() => {
      client
        .get(`/randomword/${columns}`)
        .then((response) => {
          if (response.data.st == 1)
          {
            setWord(response.data.message);
            setLoading(false);
          }
          else {

          }
        })
        .catch((error) => {
            console.log(error);
        });
  }, []);
  return (
    <>
      <Router>
      <rcContext.Provider value={{row, setRow, column, setColumn, columns, rows, wordState, setWordState, setOpen, isOpen, word, dcolor, setDcolor, evk, choice, hohe, setHohe, setEvk, setChoice, already, setAlready, modal, setModal, win, setWin, top, setTop, help, setHelp, cookies, setCookie, settings, setSettings, setWord}}>
          <NavBar/>  
          <div className="loading" style={{display : (Loading ? "flex" : "none")}}>
`          <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />`
          </div>
          <div style={{display: "flex"}}>
            <SideBar/>
            <Routes>
              <Route path="/" Component={() => <Home/>}/>
              <Route path="/:givenword" Component={() => <Home/>}/>
            </Routes>
          </div>
        </rcContext.Provider>
      </Router>
    </>
  )
}

export default App
