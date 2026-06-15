
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/GridLegacy';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useContext, useState } from 'react';
import { ThemeContext } from '@emotion/react';
import { Onecontext } from './context/Todocintext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useToast } from './context/Toastcontext';

export default function Todo({Todo,opendeletedialog,openupdatedialog}){


const [ updatetodo,setupdatetodo ]=useState({title:Todo.title,details:Todo.details})

const {showHideToast}=useToast();
//handler opendialog function 

function clickdelete(){
      opendeletedialog(Todo)
}




function clickupdate(){

openupdatedialog(Todo)

}


// end handler opendialog function 



//function confirm

    // end function confirm



//end handler
      const {addtodo,setaddtodo}=useContext(Onecontext);
function handleclickch(){


const updatetodos=addtodo.map((e)=>{

// eslint-disable-next-line eqeqeq
if( e.id == Todo.id  ){e.iscompleted =! e.iscompleted}




return e;
})
setaddtodo(updatetodos)
localStorage.setItem("todos",JSON.stringify(updatetodos))
showHideToast("تم التعديل بنجاح")
}
	return(<>
{/* 
delete dialog */}








{/* end delete dialog */}

    
{/* update dialog */}






{/* end update dialog */}
  <Card className='cardclass' sx={{ minWidth: 275,backgroundColor:"#4b1542f5",marginTop:"20px" }}>
  <CardContent  style={{padding:"30px"}}>

   <Grid container spacing={2} >
        <Grid xs={8} >
              <Typography  variant="h5"  sx={{textAlign:'right',color:'rgba(234, 247, 249, 1)',fontFamily:"sans" ,fontWeight:"500",textDecoration :Todo.iscompleted ?"line-through" :"none"}}>
         
{Todo.title}
      </Typography>
                 <Typography  variant="h6"  sx={{textAlign:'right',color:'rgba(234, 247, 249, 1) ',fontWeight:"300"}}>
{Todo.details}
      </Typography>
        </Grid>
		  <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center" >
 
      <IconButton  onClick={handleclickch} className='iconedite' aria-label="delete" style={{color:Todo.iscompleted ? "white"  : "#8bc34a" ,background: Todo.iscompleted ?" #8bc34a ": "white" ,border:"solid #8bc34a 3px"}}>
   <CheckIcon/>
      </IconButton>
      <IconButton  className='iconedite' aria-label="delete" style={{color:"#8b4183ff" ,background:"white",border:"solid #8b4184ff 3px"}}>
<BorderColorOutlinedIcon onClick={clickupdate}/>
      </IconButton >
      <IconButton  className='iconedite'style={{color:"#cf0707ff" ,background:"white",border:"solid #b00909e0 3px"}}>
      
      <DeleteOutlinedIcon onClick={clickdelete}/>

      </IconButton> 

        </Grid>
        
		</Grid>
   





  


	</CardContent>
	
</Card>
</>)
}
