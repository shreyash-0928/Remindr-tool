import moon from "../src/assets/moon.svg"
import sun from "../src/assets/sun.svg"
import { useEffect,useLayoutEffect, useState } from "react"

function Header({setToggleAddPopup}) {
  const [theme, setTheme] = useState("light")

  //checks if there is a theme stored in local storage
  useLayoutEffect(()=>{
    if (localStorage.getItem("remindr-theme") == null) {
      localStorage.setItem("remindr-theme", theme)
    }else{
      setTheme(localStorage.getItem("remindr-theme"))
    }
  }, [])

  //checks the current theme
  useEffect(()=>{
    if (theme == "dark") {
      
    document.documentElement.style.setProperty('--normalBlue', 'var(--lightBlue)') 

    document.documentElement.style.setProperty('--white', 'var(--darkBlue)') 

    document.documentElement.style.setProperty('--black', 'var(--lightBlue)') 

    document.documentElement.style.setProperty('--lineDark', 'var(--lineLight)') 

    document.documentElement.style.setProperty('--whiteInput', 'var(--transparentInput)') 

    document.documentElement.style.setProperty('--blackDelete', 'var(--whiteDelete)') 

    document.documentElement.style.setProperty('--lightGradient', 'var(--darkGradient)') 

    document.documentElement.style.setProperty('--lightShadow', 'var(--darkShadow)') 

    document.documentElement.style.setProperty('--lightBorderBottom', 'var(--darkBorderBottom)') 

    document.documentElement.style.setProperty('--lightBorderShadow', 'var(--darkBorderShadow)') 
    }

    else{
      document.documentElement.style.setProperty('--normalBlue', 'hsl(210, 77%, 39%)') 

    document.documentElement.style.setProperty('--white', '#fff') 

    document.documentElement.style.setProperty('--black', '#000') 

    document.documentElement.style.setProperty('--lineDark', 'hsla(0, 0%, 40%, 0.479)') 

    document.documentElement.style.setProperty('--whiteInput', '#fff') 

    document.documentElement.style.setProperty('--blackDelete', '#000') 

    document.documentElement.style.setProperty('--lightGradient', 'var(--lightBlue) ,var(--normalBlue)') 

    document.documentElement.style.setProperty('--lightShadow', 'hsla(210, 77%, 69%, 0.632)') 

    document.documentElement.style.setProperty('--lightBorderBottom', 'hsla(0, 0%, 10%, 0.26)') 

    document.documentElement.style.setProperty('--lightBorderShadow', 'rgba(128, 128, 128, 0.144)') 
    }
  })

  function themeSwitcher(){
    setTheme((prev) => prev == "light"? "dark" : "light") 
    localStorage.setItem("remindr-theme", theme == "light"? "dark" : "light")
  }

  return (
    <header>
      <div className="header-inner">
          <a href="#">Remindr</a>

<div className="options">
  <img 
  src={theme == "dark" ? sun : moon} 
  alt="switch between light and dark mode"
  onClick={themeSwitcher}
  />
      
<svg 
onClick={()=>setToggleAddPopup(prev=>!prev)}
xmlns="http://www.w3.org/2000/svg" 
width="24" 
height="24" 
viewBox="0 0 24 24"
fill="none" 
stroke={theme == "dark" ? "hsl(210, 77%, 69%)" : "hsl(210, 77%, 39%)"} 
strokeWidth="2" 
strokeLinecap="round" 
strokeLinejoin="round" >
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
</svg>

</div>
      
      </div>
    
     </header>
  )
}

export default Header