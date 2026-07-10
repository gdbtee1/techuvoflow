import {
DndContext,
closestCorners,
DragOverlay
} from "@dnd-kit/core";


import {
useDroppable,
useDraggable
} from "@dnd-kit/core";


import {
useState
} from "react";


import {
updateLeadStage
} from "../services/leadService";


import {
createActivity
} from "../../activity/services/activityService";


import LeadDrawer
from "./LeadDrawer";



const stages=[

{
id:"new",
name:"New Lead"
},

{
id:"contacted",
name:"Contacted"
},

{
id:"qualified",
name:"Qualified"
},

{
id:"proposal",
name:"Proposal"
},

{
id:"won",
name:"Won"
},

{
id:"lost",
name:"Lost"
}

];







function LeadCard({

lead,

dragging=false,

onClick,

selected,

toggleSelect

}){


const {

attributes,

listeners,

setNodeRef,

transform

}=useDraggable({

id:lead.id

});



return (

<div

ref={setNodeRef}

{...attributes}

style={{

transform: transform

?

`translate(${transform.x}px, ${transform.y}px)`

:

undefined

}}

className={`
bg-white
rounded-xl
p-4
mb-3
shadow-sm
border
transition
hover:shadow-md

${dragging ? "opacity-50" : ""}
`}

>



<div className="
flex
items-start
gap-3
">


<input

type="checkbox"

checked={selected}

onChange={()=>toggleSelect(lead.id)}

className="
h-4
w-4
mt-1
cursor-pointer
"

/>




<div

{...listeners}

className="
flex-1
cursor-grab
"

>


<h3 className="
font-semibold
truncate
">

{lead.name}

</h3>


<p className="
text-sm
text-slate-500
truncate
">

{lead.email || "No email"}

</p>


<div className="
mt-3
text-xs
bg-slate-100
rounded-full
px-3
py-1
inline-block
">

{lead.source || "Manual"}

</div>


</div>


</div>





<button

onClick={onClick}

className="
mt-4
text-sm
text-blue-600
hover:underline
"

>

View Details

</button>



</div>

)

}









function Column({

stage,

leads,

onSelectLead,

selectedLeads,

toggleLeadSelection

}){


const {

setNodeRef

}=useDroppable({

id:stage.id

});



return (

<section

ref={setNodeRef}

className="
bg-slate-100
rounded-2xl
p-4
min-h-[420px]
w-[280px]
flex-shrink-0
"


>


<div className="
flex
justify-between
items-center
mb-4
">


<h2 className="
font-semibold
">

{stage.name}

</h2>


<span className="
text-sm
text-slate-500
">

{leads.length}

</span>


</div>




{

leads.length===0

?

<div className="
text-center
text-sm
text-slate-400
py-10
">

Drop leads here

</div>


:


leads.map(lead=>(


<LeadCard

key={lead.id}

lead={lead}

selected={
selectedLeads.includes(lead.id)
}

toggleSelect={
toggleLeadSelection
}

onClick={()=>onSelectLead(lead)}

/>


))


}


</section>

)

}









export default function Pipeline({

leads,

onMove,

onDelete,

selectedLeads=[],

toggleLeadSelection

}){


const [

activeLead,

setActiveLead

]=useState(null);



const [

selectedLead,

setSelectedLead

]=useState(null);







function handleDragStart(event){


const lead = leads.find(

item=>item.id===event.active.id

);


setActiveLead(lead);


}








async function handleDragEnd(event){


const {

active,

over

}=event;



setActiveLead(null);



if(!over)return;



const lead = leads.find(

item=>item.id===active.id

);



if(!lead)return;



const oldStage = lead.stage;

const newStage = over.id;



if(oldStage===newStage)return;





try{


await updateLeadStage(

lead.id,

newStage

);




await createActivity({

lead_id:lead.id,

organization_id:lead.organization_id,

type:"stage_change",

description:
`${lead.name} moved from ${oldStage} to ${newStage}`

});



onMove();



}catch(err){

console.error(
"Pipeline update failed:",
err
);

}



}







return (

<>


<DndContext

collisionDetection={closestCorners}

onDragStart={handleDragStart}

onDragEnd={handleDragEnd}

>


<div className="
flex
gap-4
overflow-x-auto
pb-4
">


{

stages.map(stage=>(


<Column

key={stage.id}

stage={stage}

leads={

leads.filter(

lead=>lead.stage===stage.id

)

}

onSelectLead={setSelectedLead}

selectedLeads={selectedLeads}

toggleLeadSelection={toggleLeadSelection}

/>


))


}


</div>





<DragOverlay>


{

activeLead && (

<LeadCard

lead={activeLead}

dragging

selected={false}

toggleSelect={()=>{}}

/>

)

}


</DragOverlay>




</DndContext>








<LeadDrawer

lead={selectedLead}

onClose={()=>setSelectedLead(null)}


onUpdated={()=>{

setSelectedLead(null);

onMove();

}}



onDeleted={()=>{

setSelectedLead(null);


if(onDelete){

onDelete();

}else{

onMove();

}

}}

/>



</>

)

}