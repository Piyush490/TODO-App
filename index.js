const express=require("express")
const cors=require('cors')
const pool=require('./db')
const app=express();

app.use(cors());
app.use(express.json())

//create todo
app.post("/todo",async(req,res)=>{
    try{
        const {description,priority}=req.body;
        const newTodo=await pool.query(
            "INSERT INTO todo (description,priority) VALUES($1,$2) RETURNING *",
        [description,priority]
        );
        res.json(newTodo.rows)
    } catch(err){
        console.error(err);
    }
})

//Search a todo
app.get("/todos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const todo =await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1",
            [id])
        res.json(todo.rows[0])
    } catch(err){
        console.error(err);
    }
})

//get all todos
app.get("/todos",async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT* FROM todo");
        res.json(allTodos.rows)
    } catch(err){
        console.error(err.message)
    }
})

//update a todo
app.put("/todos/:id", async(req,res)=>{
    try{
        const {id}=req.params;
        const {description,priority} =req.body;
        const updateTodo =await pool.query(
            "UPDATE todo SET description=$1, priority=$2 WHERE todo_id=$3",
        [description,priority,id])
        res.json("todo was updated")
    } catch(err){
        console.error(err.message);
    }
})

//delete a todo
app.delete("/todos/:id", async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteTodo =await pool.query(
            "DELETE FROM todo WHERE todo_id=$1",
        [id])
        res.json("todo was deleted");
    } catch(err){
        console.error(err.message);
    }
})

app.listen(5000,()=>{
    console.log("server started at port 5000")
})