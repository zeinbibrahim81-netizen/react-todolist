// import logo from './logo.svg';
import './App.css';
import Todolist from './Todolist.js'
import Todo from './Todo.js';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { Onecontext } from './context/Todocintext.js';
import { Toastprovider } from './context/Toastcontext.js';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {deepPurple} from '@mui/material/colors';

import Container from '@mui/material/Container';




 
const theme = createTheme({
  typography:{ 
fontFamily:["sans"]},
palette:{
    primary:{

  main:'#8b4184ff'
}},


});
function App() {

  const alltodo=[{
  
  id:uuidv4(),
  title:"rtt"
  ,details:"jghjb0"
  ,iscompleted:"false",},{
  
  id:uuidv4(),
  title:"rtt"
  ,details:"jghjb0"
  ,iscompleted:"false"
  },{
  
  id:uuidv4(),
  title:"rtt"
  ,details:"jghjb0"
  ,iscompleted:"false"
  }]
  const [addtodo,setaddtodo]=useState(alltodo);




 



  return(
    <ThemeProvider theme={theme}>
      <Toastprovider >
    <div  style={{ display:"flex", alignItems:"center" ,textAlign:'center',background:'rgba(0, 0, 0, 0.86)',

      height:"100vh",
      direction:"rtl",
    }}  >  

    <Onecontext.Provider value={{addtodo,setaddtodo}}>
<Todolist/>

</Onecontext.Provider>
</div>
</Toastprovider>
</ThemeProvider>)
}

export default App;
