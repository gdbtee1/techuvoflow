import {
useEffect,
useState
} from "react";


import {
getTasks,
createTask,
updateTask,
deleteTask
} from "../services/taskService";



export default function TaskPanel({

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
priority,
setPriority
]=useState("medium");


const [
dueDate,
setDueDate
]=useState("");


const [
filter,
setFilter
]=useState("all");


const [
loading,
setLoading
]=useState(false);


const [
error,
setError
]=useState("");







async function loadTasks(){


if(!organizationId){

return;

}



try{


const data =
await getTasks(
organizationId
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


},[organizationId]);








async function addTask(){


if(!title.trim()){

return;

}



try{


setLoading(true);



const task =
await createTask({

organization_id:organizationId,

title,

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

setDueDate("");



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}



}








async function toggleTask(task){


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



}








async function removeTask(id){


await deleteTask(id);



setTasks(prev=>

prev.filter(

task=>task.id!==id

)

);



}








const filteredTasks =

tasks.filter(task=>{


if(filter==="all"){

return true;

}


return task.status===filter;


});







return (

<section className="
bg-white
rounded-2xl
p-5
shadow
space-y-5
">





<div className="
flex
justify-between
items-center
">

<h2 className="
text-xl
font-bold
">

Tasks

</h2>



<select

value={filter}

onChange={
e=>setFilter(e.target.value)
}

className="
border
rounded-xl
p-2
"

>

<option value="all">
All
</option>

<option value="pending">
Pending
</option>

<option value="completed">
Completed
</option>


</select>


</div>







{

error && (

<div className="
bg-red-50
text-red-600
p-3
rounded-xl
">

{error}

</div>

)

}







<div className="
grid
grid-cols-1
md:grid-cols-3
gap-3
">


<input

placeholder="Task name"

value={title}

onChange={
e=>setTitle(e.target.value)
}

className="
border
rounded-xl
p-3
"

/>





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

"Adding..."

:

"Add Task"

}


</button>









<div className="
space-y-3
">


{

filteredTasks.length===0

?

<p className="
text-slate-500
">

No tasks

</p>


:


filteredTasks.map(task=>(


<div

key={task.id}

className="
border
rounded-xl
p-4
flex
justify-between
gap-3
"

>



<div>


<h3 className={

task.status==="completed"

?

"line-through text-slate-400"

:

"font-semibold"

}

>

{task.title}

</h3>



<p className="
text-sm
text-slate-500
">

Due:

{

task.due_date

?

new Date(
task.due_date
)
.toLocaleDateString()

:

"No date"

}

</p>



<span className="
text-xs
bg-slate-100
rounded-full
px-3
py-1
inline-block
mt-2
">

{task.priority || "medium"}

</span>



</div>







<div className="
flex
flex-col
gap-2
text-sm
">


<button

onClick={()=>toggleTask(task)}

className="
text-blue-600
"

>

{

task.status==="completed"

?

"Undo"

:

"Done"

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





</section>

)

}