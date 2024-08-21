import { useState } from "react"
import clock from "../src/assets/clock.svg"
import edit from "../src/assets/edit.svg"
import trash from "../src/assets/trash.svg"

function Remindr({title, vibrate, id, remindrs, setRemindrs, setToggleDeletePopup, setDeleteId, setToggleEditPopup, setOneToEdit, hours, minutes, seconds, date}) {

    const [dateT, setDate] = useState(new Date())

    function getEditId(id){
        const editMe = remindrs.filter((remindr)=> remindr.id == id)

        setOneToEdit(editMe)
    }
    return ( 
        <div className="single-remindr">
            <p className="remindr-title">{title}</p>
            <p className="time">
                Every  {hours > 0 && `${hours} hour${hours > 1? "s" : ""}`} {minutes > 0 && `${minutes} minute${minutes > 1? "s" : ""}`}  {seconds > 0 && `${seconds} second${seconds > 1? "s" : ""}`} </p>

            <div className="bottom">
                <div className="date-created">
                    <img src={clock} alt="a clock icon" />

                    <small>{dateT.toUTCString().replace("GMT", "")}</small>
                </div>

                <div className="edit-and-delete">

                <img 
                onClick={()=> {
                    setToggleEditPopup(true)
                    getEditId(id)
                }
                }
                src={edit} alt="edit your remindr" />

                <img 
                onClick={()=>{
                    setToggleDeletePopup(true)
                    setDeleteId(id)
                }
                }
                src={trash} alt="delete your remindr" />
                </div>
            </div>
        </div>
     );
}

export default Remindr;