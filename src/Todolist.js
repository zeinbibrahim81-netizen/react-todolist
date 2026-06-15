import './App.css'
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button'
// import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import {orange} from '@mui/material/colors'
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import {v4 as uuidv4} from 'uuid';


// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// icon import
import { useState ,useEffect} from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Todo from './Todo.js';
import { useContext,useMemo } from 'react';
import {Toastcontext,useToast } from './context/Toastcontext.js';
import { Onecontext } from './context/Todocintext.js';


export default function Todolist(){

const {addtodo,setaddtodo}= useContext(Onecontext)

const {showHideToast}=useToast();

const [displaytodostype, setdisplaytodostype]= useState("all");

function selecttodotype(e) {
setdisplaytodostype(e.target.value);
  
} 

const completedtodo=useMemo(()=>{
return addtodo.filter((e)=>{
  console.log("render")
return e.iscompleted })


},[addtodo]);




const noncompleted = useMemo(()=> {return addtodo.filter((e)=>{

  console.log("ren2")
return !e.iscompleted })},[addtodo])     



let todosToBeRender = addtodo;

if(displaytodostype == "completed")
{ todosToBeRender = completedtodo}

else if(displaytodostype == "non-completed"){
  todosToBeRender = noncompleted
}


const[inputm,setinputm]=useState("");



const finaltod=todosToBeRender.map((e) => { return <Todo key={e.id} Todo={e}  opendeletedialog={opendeletedialog}   openupdatedialog={openupdatedialog}   />})

useEffect(()=>{


const storageTodos=JSON.parse(localStorage.getItem("todos"))??[];

setaddtodo(storageTodos)
}, []);



function handleclick(){
const newarr=  {id:uuidv4(),title:inputm,details:"",iscompleted:false};
 const memorytodo=[...addtodo,newarr]


localStorage.setItem("todos",JSON.stringify(memorytodo))
setaddtodo(memorytodo)
setinputm("");
// }
showHideToast(" تمت الاضافة بنجاح")

}

// use state dialog delete
const [dialogtodo,setdialogtodo]=useState("")
const [showdeletedialodg , setshowdeletedialog]=useState(false)
// handeler dialog
function opendeletedialog(Todo){
// alert(Todo.id)

setdialogtodo(Todo)
setshowdeletedialog(true);


}
function confirmdelete(){
const updatetodos=addtodo.filter((e)=>{
return (e.id != dialogtodo.id)})


setaddtodo(updatetodos)
localStorage.setItem("todos",JSON.stringify(updatetodos))
setshowdeletedialog(false)
showHideToast(" تم الحذف بنجاح")
}




function handleClose(){
setshowdeletedialog(false)
      }

//end dialog handler delete




// update dialog state

const[showupdatedialog,setshowupdatedialog]=useState(false);



// end update dialog state

// update handler dialog

function handleupdateclose(){
setshowupdatedialog(false)
}


function openupdatedialog(Todo){
setdialogtodo(Todo)
setshowupdatedialog(true)

}
    function confirmupdate(){
      const updatetodos=addtodo.map((e)=> {
if(e.id == dialogtodo.id){return ({...e,title:dialogtodo.title,details:dialogtodo.details})
}else{return e;}


      })
 setaddtodo(updatetodos);
// handleupdateclose()
setshowupdatedialog(false)
localStorage.setItem("todos",JSON.stringify(updatetodos))
showHideToast("تم التحديث بنجاح")
    }

// end update handler dialog






	return( 
		  
		 <>
   <Dialog
   style={{direction:'rtl'}}
        open={showupdatedialog}
        onClose={handleupdateclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
                <DialogTitle id="alert-dialog-title">
تعديل المهمة 
        </DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="تعديل المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={dialogtodo.title}
              onChange={(e) =>setdialogtodo({...dialogtodo,title:e.target.value}) }
            />
                <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="تعديل التفاصيل"
              type="text"
              fullWidth
              variant="standard"
              value={dialogtodo.details}
              onChange={(e) => setdialogtodo({...dialogtodo, details:e.target.value})}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleupdateclose}>إغلاق</Button>
          <Button autoFocus onClick={confirmupdate} >
            تأكيد
        </Button>
        </DialogActions>
      </Dialog>



 <Dialog
   style={{direction:'rtl'}}
        open={showdeletedialodg}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
  هل انت متأكد من رغبتك في حذف هذه المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
لا يمكن التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button autoFocu  onClick={confirmdelete} >نعم,قم بالحذف
            
          </Button>
        </DialogActions>
      </Dialog>


		 <Container maxWidth="sm"  >
 
  <Card sx={{ minWidth: 275 }} style={{height:"80vh",overflow:"scroll" }}>
  <CardContent>
  <Typography  variant="h2" style={{fontWeight:"500"}} >
مهامي
  <Divider />
      </Typography>
 <ToggleButtonGroup style={{direction:"ltr", marginTop:"30px"} }
      value={displaytodostype}
      exclusive
     color="primary"
      aria-label="text alignment"

onChange={selecttodotype}
    >   
	  
	     <ToggleButton value="non-completed" style={{fontWeight:"200"}}>
غبر المنجز
      </ToggleButton>

	    <ToggleButton value="completed"  style={{fontWeight:"200"}}>
   المنجز
		     </ToggleButton>
	  
	

	  <ToggleButton value="all" style={{fontWeight:"200"}} >
  الكل 

      </ToggleButton>



	  </ToggleButtonGroup>



   {finaltod}


<Grid container  style={{marginTop:"20px"}} spacing={2}>


<Grid   size={8} display="flex" alignItems="center"><TextField  value={inputm} onChange={(e) => setinputm(e.target.value)} style={{width:"100%"}} id="outlined-basic" label="عنوان المهمة" variant="outlined" /></Grid>
<Grid  size ={4} display="flex" alignItems="center"><Button  onClick={handleclick} color='primary'  style={{width:"100%",height:"100%"}} variant="contained" disabled={inputm.length <=0}>اضافة</Button>
</Grid>

</Grid>

	</CardContent>

</Card>


		    </Container>
        </>
   )
}