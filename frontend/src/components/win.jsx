import { MdClose } from "react-icons/md";
import "../styles/modal.css";
import { useContext } from "react";
import { rcContext } from "../App";
import { useNavigate } from "react-router";
import { useScreenshot } from "use-screenshot-hook";
import { encrypt } from "./encryption";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function Win({imgRef})
{
    const {modal, setModal, word, win} = useContext(rcContext);
    const toggle = () => setModal(!modal);
    const { image, takeScreenshot } = useScreenshot({ref: imgRef});
    const navigate = useNavigate();
    const download = (image, { name = 'amwordlegame', extension = 'png' } = {}) => {
        const a = document.createElement('a');
        a.href = image;
        a.download = `${name}.${extension}`;
        a.click();
      };
    
    const downloadImage = () => {
        const div = imgRef.current;
        takeScreenshot(div).then((image) => {
            download(image);
        });
    };
    let meaning = "https://amharicteacher.com/dictionary/english/"+word;
    return(
        <div className="modalparent" style={{display : (modal ? "flex" : "none")}}>
            <div className="modal">
                <div className="modalheader">
                    <MdClose className="closeicon" onClick={toggle} />
                </div>
                <div className="modalbody">
                    <h2 className="modaltext">{win == 1 ? " አሸንፈዋል! 🎉" : "ተሸንፈዋል! 😭"}</h2>
                    <p className="modalword">ቃል : {word}</p>
                    <p className="modalword">ትርጉም : <a href={meaning} style={{textDecoration: "none", color: "#aaf"}}>Click to see meaning</a></p>
                    <div className="buttons">
                        <button onClick={() => {navigate(0)}}>አዲስ ጨዋታ</button>
                        <CopyToClipboard text={"http://amwordle.rf.gd?givenword="+encrypt(word)}
                        onCopy={() => alert("copied")}>
                            <button>የዚህን ጨዋታ ሊንክ ኮፒ ያድርጉ</button>
                        </CopyToClipboard>
                        <button onClick={() => {
                              downloadImage(); 
                             }}>የጨዋታውን ፎቶ ያውርዱ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Win;