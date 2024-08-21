import { useState,useEffect } from "react"

function EditRemindrPopup({setToggleEditPopup, oneToEdit, remindrs, setRemindrs}) {

  const [newInput, setNewInput] = useState(oneToEdit[0].title)
  const [newVibrate, setNewVibrate] = useState(oneToEdit[0].vibrate)
  const [newHours, setNewHours] = useState(oneToEdit[0].hours)
  const [newMinutes, setNewMinutes] = useState(oneToEdit[0].minutes)
  const [newSeconds, setNewSeconds] = useState(oneToEdit[0].seconds)

  useEffect(()=>{
    document.body.style.overflow = "hidden"

    return ()=>{
      document.body.style.overflow = "auto"
    }

  })

  const numsHours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

  const optsHours = numsHours.map((num)=>{
    return  <option key={num} value={num}>{num}</option>
  })

  const otherNums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,45, 46, 47, 48, 49,50, 51, 52, 53, 54,55, 56, 57, 58, 59,60]

  const optsOthers = otherNums.map((num)=>{
    return  <option key={num} value={num}>{num}</option>
  })

  //function to update the current remindr
  function updateRemindrs(){
    if (newHours == 0 && newMinutes == 0 && newSeconds == 0) {
      return alert("please enter a valid number")
    }
    const updatedRemindrs= remindrs.filter((remindr)=> remindr.id != oneToEdit[0].id)

  
    let timerId
    function createNotification(title, vibrate, hours, minutes, seconds){
      const s = seconds>1? "s" : ""
      const h = hours>1? "s" : ""
      const m = minutes>1? "s" : ""
      const notificationPromise = Notification.requestPermission()
  
      const hoursInMil = hours * 3600000
        const minsInMil = minutes * 60000
        const secsInMil = seconds * 1000
        const timeToRun = hoursInMil + minsInMil + secsInMil
        timerId = setInterval(() => {
          notificationPromise.then((p)=>{
            new Notification(title, {
              body:`Time to ${title}, it's been ${hours > 0? hours + " hour"+h : ""}${minutes > 0? minutes + " minute"+m : ""}${seconds > 0?seconds + " second"+s : ""} already:)`,
              vibrate: vibrate,
              silent:false,
              icon: "./src/assets/Remindr.png"
            })
          })
      },timeToRun);
     
    }  
    
    const updatedOne = {
      title : newInput.length <= 0? oneToEdit[0].title : newInput,
      id : oneToEdit[0].id,      
      vibrate : newVibrate,
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds,
      startSendingNotifications: setTimeout(function timer(){
        createNotification(newInput, newVibrate, newHours, newMinutes, newSeconds) 
      }, 0),
      stopSendingNotifications: function t() {
        clearInterval(timerId)
      }
    }

    oneToEdit[0].stopSendingNotifications()
    updatedOne.startSendingNotifications
    updatedRemindrs.unshift(updatedOne)
    setRemindrs(updatedRemindrs)
    setToggleEditPopup(false)
  }


  return (
    <div 
    onClick={(e)=>{
      setToggleEditPopup(false)
    } }
    className="overlay">
      <div 
      onClick={(e)=> e.stopPropagation()}
      className="add-remindr-popup">
    <h2>Edit remindr</h2>

    <div className="title">
      <label htmlFor="title">Remindr title</label>
      <input 
      value={newInput}
      onChange={(e)=> setNewInput((prev)=>e.target.value)}
      placeholder="Drink Water" 
      type="text" 
      id="title"/>
    </div>

    <div className="interval">
      <div className="time-selection">

      
     <div className="hours-container">
     <p>Hours</p>
       <select
       value={newHours}
       onChange={(e)=> setNewHours(e.target.value)}
       className="hours">
        <option default disabled>Hours</option>
        {optsHours}
       </select>
     </div>

     <div className="minutes-container">
     <p>Minutes</p>
       <select
       value={newMinutes}
       onChange={(e)=> setNewMinutes(e.target.value)}
       className="minutes">
        <option default disabled>Minutes</option>
       {optsOthers}
       </select>
     </div>

     <div className="seconds-container">
     <p>Seconds</p>
       <select
       value={newSeconds}
       onChange={(e)=> setNewSeconds(e.target.value)}
       className="seconds">
        <option default disabled>Seconds</option>
        {optsOthers}
       </select>
     </div>
    </div>

    </div>


    <div className="vibrate">
      <label htmlFor="vibrate">Vibrate</label> 
      <input 
      checked={newVibrate}
      onChange={()=> setNewVibrate((prev)=> !prev)}
      type="checkbox" 
      id="vibrate" />
    </div>

    <div className="overview">
      <p>Overview</p>
      {newInput && 
      <p className="output">
        Remind me to {newInput} every {newHours > 0 && `${newHours} hour${newHours > 1? "s" : ""}`} {newMinutes > 0 && `${newMinutes} minute${newMinutes > 1? "s" : ""}`} {newSeconds > 0 && `${newSeconds} second${newSeconds > 1? "s" : ""}`} </p>}
    </div>

    <div className="bottom-buttons">
      <button 
      onClick={updateRemindrs}
      className="create">
        Edit Remindr
        </button>
      
      <button 
      onClick={()=> setToggleEditPopup(false)}
      className="cancel">Cancel</button>
    </div>

   </div>
    </div>
  )
}

export default EditRemindrPopup