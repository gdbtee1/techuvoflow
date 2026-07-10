import {
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";


import {
createAutomation
} from "../services/automationService";



const triggers=[

{
value:"lead_created",
label:"New Lead Created"
},

{
value:"lead_stage_changed",
label:"Lead Stage Changed"
},

{
value:"task_completed",
label:"Task Completed"
},

{
value:"appointment_booked",
label:"Appointment Booked"
}

];





const actions=[

{
value:"create_task",
label:"Create Task"
},

{
value:"update_lead",
label:"Update Lead"
},

{
value:"add_note",
label:"Add Note"
},

{
value:"send_email",
label:"Send Email (Coming Soon)"
},

{
value:"send_sms",
label:"Send SMS (Coming Soon)"
},

{
value:"ai_response",
label:"AI Response (Coming Soon)"
}

];






export default function AutomationBuilder(){



const {
workspace
}=useWorkspace();





const [
name,
setName
]=useState("");



const [
trigger,
setTrigger
]=useState("");



const [
steps,
setSteps
]=useState([]);



const [
enabled,
setEnabled
]=useState(true);



const [
loading,
setLoading
]=useState(false);



const [
error,
setError
]=useState("");







function addAction(action){


setSteps(prev=>[

...prev,

action

]);


}








function removeStep(index){


setSteps(prev=>

prev.filter(

(_,i)=>i!==index

)

);


}








function moveStep(index,direction){


const newSteps=[...steps];


const target=index+direction;



if(
target<0 ||
target>=newSteps.length
){

return;

}



[
newSteps[index],
newSteps[target]

]=

[
newSteps[target],
newSteps[index]

];


setSteps(newSteps);


}









async function saveAutomation(){



if(!workspace){

setError(
"No workspace found"
);

return;

}




if(!name || !trigger){

setError(
"Automation name and trigger required"
);

return;

}




try{


setLoading(true);

setError("");





await createAutomation({

organization_id:workspace.id,

name,

trigger,

steps

});





alert(
"Automation created"
);





setName("");

setTrigger("");

setSteps([]);




}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}



}








return (

<section className="
space-y-8
max-w-6xl
">







<div>


<h1 className="
text-3xl
font-bold
">

Automation Builder

</h1>


<p className="
text-slate-500
mt-2
">

Build workflows that automate your business.

</p>


</div>








{
error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-4
">

{error}

</div>

)

}








<div className="
bg-white
rounded-2xl
shadow
p-6
space-y-5
">





<div className="
flex
justify-between
items-center
">


<h2 className="
font-bold
text-xl
">

Settings

</h2>




<label className="
flex
items-center
gap-2
text-sm
">


<input

type="checkbox"

checked={enabled}

onChange={
e=>setEnabled(e.target.checked)
}

/>


Enabled


</label>


</div>








<input

placeholder="Automation name"

value={name}

onChange={
e=>setName(e.target.value)
}

className="
border
rounded-xl
p-3
w-full
"

/>








<select

value={trigger}

onChange={
e=>setTrigger(e.target.value)
}

className="
border
rounded-xl
p-3
w-full
"

>


<option value="">

Select Trigger

</option>



{

triggers.map(item=>(


<option

key={item.value}

value={item.value}

>

{item.label}

</option>


))


}



</select>




</div>









<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
">









<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
font-bold
mb-5
">

Actions

</h2>




<div className="
space-y-3
">


{

actions.map(action=>(


<button

key={action.value}

onClick={()=>addAction(action.value)}

className="
w-full
border
rounded-xl
p-3
text-left
hover:bg-slate-50
"

>

+

{action.label}


</button>


))


}



</div>


</div>









<div className="
bg-slate-100
rounded-2xl
p-6
">


<h2 className="
font-bold
mb-5
">

Workflow

</h2>






<div className="
space-y-4
">



<div className="
bg-white
rounded-xl
p-4
border
">

Trigger

<br/>

<strong>

{

trigger

?

triggers.find(
t=>t.value===trigger
)?.label

:

"Choose trigger"

}


</strong>


</div>








{

steps.length===0

?

<div className="
text-center
text-slate-500
py-10
">

Add actions

</div>


:


steps.map((step,index)=>(


<div

key={index}

>


<div className="
text-center
">

↓

</div>



<div className="
bg-white
rounded-xl
p-4
border
flex
justify-between
items-center
">


<div>


<p className="
text-sm
text-slate-500
">

Action {index+1}

</p>


<strong>

{

actions.find(
a=>a.value===step
)?.label || step

}

</strong>


</div>







<div className="
flex
gap-2
">


<button

onClick={()=>moveStep(index,-1)}

className="
text-sm
"

>

↑

</button>


<button

onClick={()=>moveStep(index,1)}

className="
text-sm
"

>

↓

</button>



<button

onClick={()=>removeStep(index)}

className="
text-red-600
text-sm
"

>

Delete

</button>


</div>


</div>


</div>


))


}



</div>


</div>








</div>









<button

onClick={saveAutomation}

disabled={loading}

className="
bg-black
text-white
rounded-xl
px-6
py-3
disabled:opacity-50
"

>


{

loading

?

"Saving..."

:

"Save Automation"

}


</button>






</section>

)

}