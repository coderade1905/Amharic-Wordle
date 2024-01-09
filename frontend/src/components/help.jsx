import { MdClose } from "react-icons/md";
import "../styles/modal.css";
import { useContext } from "react";
import { rcContext } from "../App";
import image from '../images/example1.png';
import image1 from '../images/example2.png';
import image2 from '../images/example3.png';

function Help()
{
    const {help, setHelp} = useContext(rcContext);
    const toggle = () => setHelp(!help);
    return(
        <div className="modalparent" style={{display : (help ? "flex" : "none")}}>
            <div className="modal">
                <div className="modalheader">
                    <MdClose className="closeicon" onClick={toggle} />
                </div>
                <div className="modalbody">
                    <h2 className="modaltext">አጻጻፍ</h2>
                    <p className="helpword">
                        የሚጫወቱት በስልክ ከሆነ የሚመጣሎትን ኪቦርድ ይጠቀሙ
                    </p>
                    <p className="helpword">
                        የሚጫወቱት በኮምፒውተር ከሆነ:
                    </p>
                    <p className="helpword">
                        የኪቦርዱን የኢንግሊዘኛ ቃላት በመጠቀም እና 'Arrows Keys' ን ለመምረጫነት በመጠቀም መጻፍ ይችላሉ።
                    </p>
                    <h2 className="modaltext">አጨዋወት</h2>
                    <p className="helpword">
                        ጨዋታዉ ያልታወቀውን ቃል መገመት ነው፤ በያንዳንዱ ሙከራ ቀለሞች ፍንጭ ይሠጥዎታል ለምሳሌ ፦
                    </p>
                    <div className="flexcenter">
                        <img src={image} style={{maxWidth: "300px", width: "calc(100% - 20px)", height: "60px", padding: "10px"}}/>
                    </div>
                    <p className="helpword">
                        የ መ ቤት ቃል ውስጥ አለ ግን በትክክለኛው ቦታ ላይ አይደለም ፤ ለ ቃሉ ውስጥ አለ እና በትክክለኛው ቦታ ነዉ
                    </p>
                    <div className="flexcenter">
                        <img src={image1} style={{maxWidth: "300px", width: "calc(100% - 20px)", height: "60px", padding: "10px"}}/>
                    </div>
                    <p className="helpword">
                        የ አ ቤት በቦታው ላይ አለ ግን አ አይደለም
                    </p>
                    <div className="flexcenter">
                        <img src={image2} style={{maxWidth: "300px", width: "calc(100% - 20px)", height: "60px", padding: "10px"}}/>
                    </div>
                    <p className="helpword">
                        ድብቁ ቃል አለመለመ ነው።
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Help;