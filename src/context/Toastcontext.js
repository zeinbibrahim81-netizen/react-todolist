import { createContext,useContext,useState } from "react";
import Mysnackbar from "../Mysnackbar";

export const Toastcontext=createContext({});

 export const Toastprovider = ({children}) =>{

 const [open, setOpen] = useState(false);
	 const [message, setmessage] = useState("");

   function showHideToast(message){
   setOpen(true);
setTimeout(()=> {setOpen(false)},2000)
setmessage(message)

   }













return(<>


<Toastcontext.Provider value={{showHideToast}}>

	<Mysnackbar  open={open} message={message} />

{children}

</Toastcontext.Provider>






</>);

 }
  export const useToast = () => {  return useContext(Toastcontext)};
