import { useEffect } from "react"

function AddRemindrPopup({title, setTitle, vibrate, setVibrate, addRemindrFunction, setToggleAddPopup, minutes, seconds, hours, setMinutes, setSeconds, setHours}) {

  //removes overflow when shown
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


  return (
    <div 
    onClick={()=>{
      setToggleAddPopup(false)
      setTitle("")
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      setVibrate(false)
    }}
    className="overlay">

      <div 
      onClick={(e)=> e.stopPropagation()}
      className="add-remindr-popup">
    <h2>Add a new remindr</h2>

    <div className="title">
      <label htmlFor="title">Remindr title</label>
      <input 
      onChange={(e)=>setTitle(e.target.value)}
      value={title}
      placeholder="Drink Water" 
      type="text" 
      id="title"/>
    </div>

    <div className="interval">
      
      <div className="time-selection">

      <div className="hours-container">
        <p>Hours</p>
        <select 
     onChange={(e)=> setHours(e.target.value)}
     className="hours">
      <option default disabled>Hours</option>
      {optsHours}
     </select>
      </div>
     

    <div className="minutes-container">
      <p>Minutes</p>
       <select 
     onChange={(e)=> setMinutes(e.target.value)}
     className="minutes">
      <option default disabled>Minutes</option>
      {optsOthers}
     </select>
    </div>
    
    <div className="seconds-container">
      <p>Seconds</p>
       <select 
     onChange={(e)=> setSeconds(e.target.value)}
     className="seconds">
      <option default={true} disabled>Seconds</option>
      {optsOthers}
     </select>
    </div>
    
    </div>
    </div>


    <div className="vibrate">
      <label htmlFor="vibrate">Vibrate</label> 
      <input 
      checked={vibrate}
      onChange={(e)=> setVibrate(e.target.checked)}
      type="checkbox" 
      id="vibrate" />
    </div>

    <div className="overview">
      <p>Overview</p>
      {title && 
      <p className="output">
        Remind me to {title} every {hours > 0 && `${hours} hour${hours > 1? "s" : ""}`} {minutes > 0 && `${minutes} minute${minutes > 1? "s" : ""}`} {seconds > 0 && `${seconds} second${seconds > 1? "s" : ""}`} </p>}
    </div>

    <div className="bottom-buttons">
      <button 
      onClick={()=>{
        addRemindrFunction(title, vibrate, hours, minutes, seconds)
        }}
      className="create">Add new Remindr</button>

      <button 
      onClick={()=>{
      setToggleAddPopup(false)
      setTitle("")
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      setVibrate(false)
      }}
      className="cancel">Cancel</button>
    </div>

   </div>
    </div>
    
  )
}

export default AddRemindrPopup