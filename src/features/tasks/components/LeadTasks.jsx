import {
useEffect,
useState
} from "react";


import {
getLeadTasks,
createTask,
updateTask,
deleteTask
} from "../services/taskService";



export default function LeadTasks({

leadId,

organizationId

}){


const [
tasks,
setTasks
]=useState([]);


const [
title,
setTitle
]=useState("");


const [
description,
setDescription
]=useState("");


const [
dueDate,
setDueDate
]=useState("");


const [
priority,
setPriority
]=useState("medium");


const [
loading,
setLoading
]=useState(false);


const [
error,
setError
]=useState("");






async function loadTasks(){


if(!leadId){

return;

}



try{


const data =
await getLeadTasks(
leadId
);


setTasks(data);


}catch(err){


setError(
err.message
);


}



}







useEffect(()=>{


loadTasks();


},[leadId]);









async function addTask(){


if(!title.trim()){

setError(
"Task title required"
);

return;

}



try{


setLoading(true);

setError("");



const task =
await createTask({

organization_id:organizationId,

lead_id:leadId,

title:title.trim(),

description,

priority,

status:"pending",

due_date:
dueDate || null

});




setTasks(prev=>[

task,

...prev

]);



setTitle("");

setDescription("");

setDueDate("");

setPriority("medium");



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}



}








async function toggleComplete(task){


try{


const updated =
await updateTask(

task.id,

{

status:

task.status==="completed"

?

"pending"

:

"completed"

}

);



setTasks(prev=>

prev.map(item=>

item.id===task.id

?

updated

:

item

)

);



}catch(err){


console.error(err);


}



}








async function removeTask(id){


const confirmed =
window.confirm(
"Delete this task?"
);



if(!confirmed){

return;

}



try{


await deleteTask(id);



setTasks(prev=>

prev.filter(

task=>task.id!==id

)

);



}catch(err){


setError(
err.message
);


}



}








return (

<div className="
space-y-5
">



<h3 className="
text-xl
font-bold
">

Tasks

</h3>







{

error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-3
">

{error}

</div>

)

}









<div className="
bg-slate-50
rounded-xl
p-4
space-y-3
">



<input

value={title}

onChange={
e=>setTitle(e.target.value)
}

placeholder="Task title"

className="
border
rounded-xl
p-3
w-full
"

/>






<textarea

value={description}

onChange={
e=>setDescription(e.target.value)
}

placeholder="Description"

className="
border
rounded-xl
p-3
w-full
h-24
"

/>







<div className="
grid
grid-cols-1
sm:grid-cols-2
gap-3
">



<input

type="date"

value={dueDate}

onChange={
e=>setDueDate(e.target.value)
}

className="
border
rounded-xl
p-3
"

/>






<select

value={priority}

onChange={
e=>setPriority(e.target.value)
}

className="
border
rounded-xl
p-3
"

>


<option value="low">
Low
</option>


<option value="medium">
Medium
</option>


<option value="high">
High
</option>


</select>


</div>








<button

onClick={addTask}

disabled={loading}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

{

loading

?

"Creating..."

:

"Create Task"

}


</button>





</div>









<div className="
space-y-3
">



{

tasks.length===0

?

<p className="
text-slate-500
">

No tasks yet.

</p>



:


tasks.map(task=>(


<div

key={task.id}

className="
border
rounded-xl
p-4
"

>



<div className="
flex
justify-between
gap-3
">


<div>


<h4 className={

task.status==="completed"

?

"line-through text-slate-400"

:

"font-semibold"

}

>

{task.title}

</h4>



<p className="
text-sm
text-slate-500
">

{task.description}

</p>


</div>



<span className="
text-xs
bg-slate-100
rounded-full
px-3
py-1
h-fit
">

{task.priority || "medium"}

</span>



</div>








<div className="
flex
gap-4
mt-4
text-sm
">


<button

onClick={()=>toggleComplete(task)}

className="
text-blue-600
"

>

{

task.status==="completed"

?

"Reopen"

:

"Complete"

}


</button>





<button

onClick={()=>removeTask(task.id)}

className="
text-red-600
"

>

Delete

</button>


</div>





</div>



))


}



</div>





</div>

)

}