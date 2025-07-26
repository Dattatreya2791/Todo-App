import { useEffect, useState } from "react";
import classes from './styles.module.css';
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [loading,setLoading] = useState(false);
  const [todoList,setTodoList] = useState([]);
  const [errorMsg,setErrorMsg] = useState(null);
  const [todoDetails,setTodoDetails] = useState(null);
  const [openDialog,setOpenDialog] = useState(false);

  async function fetchListOfTodos(){
    try{
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();

      //console.log(result);
      if(result.todos && result.todos.length > 0){
        setTodoList(result.todos);
        setLoading(false);
        setErrorMsg('') 
      }else{
        setTodoList([])
        setLoading(false);
        setErrorMsg('')  
      }

    }catch(e){
      console.log(e);
      setErrorMsg("Failed to fetch the list of todos");
    }
  }

  async function fetchDetailsOfCurrentTodo(todoId){
    console.log(todoId);
    
    try{
      const apiResponse = await fetch(`https://dummyjson.com/todos/${todoId}`);
      const details = await apiResponse.json();
      console.log(details);
      if(details){
        setTodoDetails(details);
        setOpenDialog(true);
        setErrorMsg('');
      }else{
        setTodoDetails(null);
        setOpenDialog(false);
        setErrorMsg('No details found for the selected todo');
      }
    }catch(e){
      console.log(e);
      setErrorMsg("Failed to fetch the details of todo");
    }
  }

  useEffect(()=>{
    fetchListOfTodos();
  },[]);

  if(loading) return <Skeleton variant="rectangular" width={650} height={650}/>

  return (
     <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple TODO APP Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length > 0 ?
          todoList.map((todoItem) => (
             <TodoItem fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
             todo={todoItem}/>
          )) : null
        }
      </div>
      {loading && <h2 className={classes.loadingText}>Loading...</h2>}
      {errorMsg && <h2 className={classes.errorText}>{errorMsg}</h2>}
      <TodoDetails
        openDialog={openDialog}
        todoDetails={todoDetails} 
        setOpenDialog={setOpenDialog}
        setTodoDetails={setTodoDetails}
        />

     </div>
  );
}

export default App
