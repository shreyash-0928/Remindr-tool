import { useEffect } from "react";

function DeleteRemindrPopup({setToggleDeletePopup, deleteId, remindrs, setRemindrs}) {

  //removes overflow when shown
   useEffect(()=>{
    document.body.style.overflow = "hidden"

    return ()=>{
      document.body.style.overflow = "auto"
    }

  })

  //function to delete the selected remindr
  function deleteRemindr(id){
        const newRemindrs = remindrs.filter((remindr) => remindr.id !== id)
        const currentRemindr = remindrs.filter((remindr) => remindr.id == id)
        currentRemindr[0].stopSendingNotifications()

        setRemindrs(newRemindrs)
    }


  return (
    <div 
    onClick={()=>setToggleDeletePopup(false)}
    className="overlay">
       <div 
       onClick={(e)=> e.stopPropagation()}
       className="delete-remindr-popup">
      <h2>Delete Remindr</h2>

      <p>Are you sure you want to delete this remindr?</p>

      <div className="buttons">
        <button
        onClick={()=> {
          deleteRemindr(deleteId)
          setToggleDeletePopup(false)
        }
        }
        className="delete">
          Yes, Delete
          </button>


        <button 
        onClick={()=>setToggleDeletePopup(false)}
        className="leave">No, Leave it</button>
      </div>
     </div>
    </div>
   
  )
}

export default DeleteRemindrPopup