import {
useEffect,
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";


import {
getLeads,
createLead,
deleteLeads
} from "../services/leadService";


import {
createActivity
} from "../../activity/services/activityService";


import {
runLeadCreatedAutomation
} from "../../automations/engine/automationRunner";


import Pipeline
from "../components/Pipeline";


import TaskPanel
from "../../tasks/components/TaskPanel";



const stageSummary=[

{
id:"new",
label:"New"
},

{
id:"contacted",
label:"Contacted"
},

{
id:"qualified",
label:"Qualified"
},

{
id:"proposal",
label:"Proposal"
},

{
id:"won",
label:"Won"
},

{
id:"lost",
label:"Lost"
}

];



export default function CRM(){


const {
workspace,
loading:workspaceLoading
}=useWorkspace();




const [
leads,
setLeads
]=useState([]);




const [
selectedLeads,
setSelectedLeads
]=useState([]);




const [
search,
setSearch
]=useState("");




const [
stageFilter,
setStageFilter
]=useState("all");




const [
sort,
setSort
]=useState("newest");





const [
form,
setForm
]=useState({

name:"",
email:"",
phone:"",
company:"",
notes:"",
value:""

});




const [
loading,
setLoading
]=useState(false);




const [
error,
setError
]=useState("");







async function loadLeads(){


if(!workspace?.id){

return;

}


try{


const data =
await getLeads(
workspace.id
);


setLeads(data);


}catch(err){


setError(
err.message
);


}


}






useEffect(()=>{


loadLeads();


},[workspace]);







function updateField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}







function toggleLeadSelection(id){


setSelectedLeads(prev=>


prev.includes(id)

?

prev.filter(
x=>x!==id
)

:

[
...prev,
id
]


);


}







async function handleDeleteSelected(){


if(!selectedLeads.length){

return;

}



if(
!window.confirm(
"Delete selected leads?"
)
){

return;

}



await deleteLeads(
selectedLeads
);



setSelectedLeads([]);



loadLeads();



}







async function addLead(){


if(!form.name){

setError(
"Lead name required"
);

return;

}




try{


setLoading(true);

setError("");



const newLead =
await createLead({

organization_id:workspace.id,

...form,

value:Number(form.value)||0,

status:"new",

stage:"new",

source:"manual"

});




await createActivity({

lead_id:newLead.id,

organization_id:workspace.id,

type:"lead_created",

description:
`${newLead.name} created`

});






await runLeadCreatedAutomation({

lead:newLead,

organizationId:workspace.id

});






setForm({

name:"",
email:"",
phone:"",
company:"",
notes:"",
value:""

});



loadLeads();



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}



}







const filteredLeads = leads

.filter(lead=>{


const text =

`

${lead.name}

${lead.email}

${lead.company}

${lead.phone}

`

.toLowerCase();



return text.includes(
search.toLowerCase()
);



})


.filter(lead=>{


if(stageFilter==="all"){

return true;

}


return lead.stage===stageFilter;


})


.sort((a,b)=>{


if(sort==="value"){

return (

b.value||0

)

-

(

a.value||0

);

}



if(sort==="oldest"){


return (

new Date(a.created_at)

-

new Date(b.created_at)

);


}



return (

new Date(b.created_at)

-

new Date(a.created_at)

);



});







const pipelineValue =

leads.reduce(

(total,lead)=>

total+

(Number(lead.value)||0),

0

);









if(workspaceLoading){

return (

<div className="
p-4
sm:p-6
">

Loading CRM...

</div>

)

}







return (

<section className="
w-full
max-w-full
min-w-0
overflow-x-hidden
px-3
sm:px-4
lg:px-6
space-y-6
sm:space-y-8
">







<div className="
min-w-0
">


<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-4
">


<div className="
min-w-0
">

<h1 className="
text-2xl
sm:text-3xl
font-bold
break-words
">

CRM

</h1>


<p className="
text-slate-500
break-words
">

Manage your sales pipeline.

</p>


</div>





<div className="
bg-slate-900
text-white
rounded-2xl
px-5
py-3
w-full
sm:w-fit
text-center
shrink-0
font-medium
shadow-sm
">

{leads.length} Leads

</div>


</div>







<div className="
grid
grid-cols-2
md:grid-cols-3
xl:grid-cols-6
gap-3
sm:gap-4
mt-6
min-w-0
">


{

stageSummary.map(stage=>{


const stageLeads = leads.filter(

lead=>lead.stage===stage.id

);


const stageValue = stageLeads.reduce(

(total,lead)=>

total+(Number(lead.value)||0),

0

);


return (

<div

key={stage.id}

className="
bg-white
rounded-2xl
border
border-slate-200
p-4
sm:p-5
shadow-sm
min-w-0
transition
hover:-translate-y-0.5
hover:shadow-md
"


>


<div className="
flex
items-start
justify-between
gap-3
">


<div className="
min-w-0
">


<p className="
text-sm
font-medium
text-slate-500
truncate
">

{stage.label}

</p>


<h2 className="
mt-1
text-2xl
font-bold
text-slate-900
">

{stageLeads.length}

</h2>


</div>


<span className="
flex
h-9
min-w-9
items-center
justify-center
rounded-full
bg-slate-100
px-2
text-xs
font-semibold
text-slate-700
">

{stageLeads.length}

</span>


</div>


<p className="
mt-3
truncate
text-xs
font-medium
text-slate-500
">

${stageValue.toLocaleString()} value

</p>


</div>

);


})

}


</div>


</div>







{
error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-4
w-full
min-w-0
break-words
">

{error}

</div>

)

}







<div className="
bg-white
rounded-3xl
border
border-slate-200
p-4
sm:p-5
shadow-sm
space-y-4
w-full
min-w-0
">


<h2 className="
font-bold
text-xl
">

Add Lead

</h2>




<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-3
w-full
min-w-0
">



{

Object.keys(form).map(field=>(


field==="notes"

?


<textarea

key={field}

name={field}

value={form[field]}

onChange={updateField}

placeholder={field}

className="
border
border-slate-200
rounded-xl
p-3
h-28
w-full
min-w-0
max-w-full
resize-y
outline-none
transition
focus:border-slate-400
focus:ring-2
focus:ring-slate-200
"

/>



:

<input

key={field}

name={field}

value={form[field]}

onChange={updateField}

placeholder={field}

className="
border
border-slate-200
rounded-xl
p-3
w-full
min-w-0
max-w-full
outline-none
transition
focus:border-slate-400
focus:ring-2
focus:ring-slate-200
"

/>



))

}



</div>





<button

onClick={addLead}

disabled={loading}

className="
bg-black
text-white
rounded-xl
px-5
py-3
w-full
sm:w-auto
font-medium
transition
hover:bg-slate-800
active:scale-[0.99]
disabled:cursor-not-allowed
disabled:opacity-60
"

>

{

loading

?

"Adding..."

:

"Add Lead"

}

</button>


</div>







<div className="
bg-white
rounded-3xl
border
border-slate-200
p-4
sm:p-5
shadow-sm
space-y-4
w-full
min-w-0
">



<input

placeholder="Search leads..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
border
border-slate-200
rounded-xl
p-3
w-full
min-w-0
max-w-full
outline-none
transition
focus:border-slate-400
focus:ring-2
focus:ring-slate-200
"

/>





<div className="
flex
flex-col
sm:flex-row
sm:flex-wrap
gap-3
w-full
min-w-0
">


<select

value={stageFilter}

onChange={
e=>setStageFilter(e.target.value)
}

className="
border
border-slate-200
rounded-xl
p-3
w-full
sm:w-auto
min-w-0
bg-white
outline-none
transition
focus:border-slate-400
focus:ring-2
focus:ring-slate-200
"

>

<option value="all">
All
</option>

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





<select

value={sort}

onChange={
e=>setSort(e.target.value)
}

className="
border
border-slate-200
rounded-xl
p-3
w-full
sm:w-auto
min-w-0
bg-white
outline-none
transition
focus:border-slate-400
focus:ring-2
focus:ring-slate-200
"

>

<option value="newest">
Newest
</option>

<option value="oldest">
Oldest
</option>

<option value="value">
Highest Value
</option>


</select>




</div>




</div>







{

selectedLeads.length>0 && (

<button

onClick={handleDeleteSelected}

className="
bg-red-600
text-white
rounded-xl
px-5
py-3
w-full
sm:w-auto
max-w-full
"

>

Delete Selected ({selectedLeads.length})

</button>

)

}







<div className="
w-full
max-w-full
min-w-0
overflow-visible
">

<Pipeline

leads={filteredLeads}

onMove={loadLeads}

onDelete={loadLeads}

selectedLeads={selectedLeads}

toggleLeadSelection={toggleLeadSelection}

/>

</div>







{workspace?.id && (

<TaskPanel

organizationId={workspace.id}

/>

)}







</section>

)

}