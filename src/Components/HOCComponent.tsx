import { createContext } from "react"
import { LoginComponent } from "./LoginComponent"

 const HocComponent =({Component}: any)=>{
      if(localStorage.getItem('isLoggedIn') === 'true')
      { 
          return Component
      }
      return(
          <LoginComponent/>
      )  
}

export default HocComponent

export const MyContext = createContext<any>(undefined);