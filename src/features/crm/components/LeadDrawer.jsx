import {
useEffect,
useState
} from "react";


import {
getLeadActivities
} from "../../activity/services/activityService";


import {
updateLead,
deleteLead
} from "../services/leadService";


import LeadTasks
from "../../tasks/components/LeadTasks";



export default function LeadDrawer({

lead,

onClose,

onUpdated,

onDeleted

}){


const [
tab,
setTab
]=useState("overview");


const [
editing,
setEditing
]=useState(false);


const [
activities,
setActivities
]=useState([]);


const [
saving,
setSaving
]=useState(false);


const [
error,
setError
]=useState("");



const [
form,
setForm
]=useState({});





useEffect(()=>{


if(!lead){

return;

}



setForm({

name:lead.name || "",

email:lead.email || "",

phone:lead.phone || "",

company:lead.company || "",

notes:lead.notes || "",

value:lead.value || 0,

stage:lead.stage || "new",

status:lead.status || "new"

});



loadActivities();



},[lead]);







async function loadActivities(){


if(!lead?.id){

return;

}



try{


const data =
await getLeadActivities(
lead.id
);


setActivities(
data || []
);


}catch(err){


console.error(err);


}



}








function changeField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}








async function saveLead(){


try{


setSaving(true);

setError("");



await updateLead(

lead.id,

form

);



setEditing(false);



if(onUpdated){

onUpdated();

}



}catch(err){


setError(
err.message
);


}finally{


setSaving(false);


}



}








async function removeLead(){


const confirmed =
window.confirm(
"Delete this lead?"
);



if(!confirmed){

return;

}



try{


await deleteLead(
lead.id
);



if(onDeleted){

onDeleted();

}



}catch(err){


setError(
err.message
);


}



}








if(!lead){

return null;

}






return (

<div

className="
fixed
inset-0
bg-black/40
z-50
flex
justify-end
"

onClick={onClose}

>



<div

onClick={
e=>e.stopPropagation()
}

className="
bg-white
w-full
sm:max-w-xl
h-full
overflow-y-auto
p-5
sm:p-6
shadow-xl
"

>








<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-2xl
font-bold
">

{lead.name}

</h2>



<button

onClick={onClose}

className="
text-xl
"

>

×

</button>


</div>








<div className="
flex
gap-2
mb-6
border-b
pb-3
">


{

["overview","tasks","activity"]

.map(item=>(


<button

key={item}

onClick={()=>setTab(item)}

className={`

px-4

py-2

rounded-xl

text-sm

${

tab===item

?

"bg-black text-white"

:

"bg-slate-100"

}

`}

>

{
item
}

</button>


))


}


</div>









{

error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-3
mb-4
">

{error}

</div>

)

}









{

tab==="overview" && (

<div>





{

[

["name","Name"],

["email","Email"],

["phone","Phone"],

["company","Company"],

["value","Deal Value"]

]

.map(([key,label])=>(


<div

key={key}

className="
mb-4
">


<label className="
text-sm
text-slate-500
">

{label}

</label>



<input

disabled={!editing}

name={key}

value={form[key] || ""}

onChange={changeField}

className="
border
rounded-xl
p-3
w-full
mt-1
disabled:bg-slate-100
"

/>


</div>


))

}







<div className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
">


<div>


<label>
Stage
</label>


<select

disabled={!editing}

name="stage"

value={form.stage}

onChange={changeField}

className="
border
rounded-xl
p-3
w-full
"

>

<option value="new">
New
</option>

<option value="contacted">
Contacted
</option>

<option value="qualified">
Qualified
</option>

<option value="proposal">
Proposal
</option>

<option value="won">
Won
</option>

<option value="lost">
Lost
</option>


</select>


</div>







<div>


<label>
Status
</label>


<select

disabled={!editing}

name="status"

value={form.status}

onChange={changeField}

className="
border
rounded-xl
p-3
w-full
"

>

<option value="new">
New
</option>

<option value="active">
Active
</option>

<option value="customer">
Customer
</option>

<option value="lost">
Lost
</option>


</select>


</div>


</div>







<label className="
block
mt-5
">

Notes

</label>


<textarea

disabled={!editing}

name="notes"

value={form.notes}

onChange={changeField}

className="
border
rounded-xl
p-3
w-full
h-32
"

/>







<div className="
mt-6
">


{

editing

?

<button

onClick={saveLead}

disabled={saving}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

{

saving

?

"Saving..."

:

"Save"

}

</button>


:

<button

onClick={()=>setEditing(true)}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

Edit Lead

</button>


}


</div>





</div>

)

}









{

tab==="tasks" && (

<LeadTasks

leadId={lead.id}

organizationId={lead.organization_id}

/>

)

}








{

tab==="activity" && (

<div>

<h3 className="
font-bold
text-lg
mb-4
">

Activity

</h3>



{

activities.length===0

?

<p className="
text-slate-500
">

No activity yet

</p>


:


activities.map(activity=>(


<div

key={activity.id}

className="
border-l-2
pl-4
mb-5
"

>

<p className="
font-medium
">

{activity.type}

</p>


<p className="
text-sm
text-slate-600
">

{activity.description}

</p>


</div>


))


}


</div>

)

}








<button

onClick={removeLead}

className="
mt-10
w-full
bg-red-600
text-white
rounded-xl
py-3
"

>

Delete Lead

</button>







</div>

</div>

)

}