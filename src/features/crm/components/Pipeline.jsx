import {
DndContext,
closestCorners,
pointerWithin,
DragOverlay,
MeasuringStrategy,
PointerSensor,
TouchSensor,
useSensor,
useSensors
} from "@dnd-kit/core";


import {
useDroppable,
useDraggable
} from "@dnd-kit/core";


import {
useMemo,
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
name:"New Lead",
shortName:"New"
},

{
id:"contacted",
name:"Contacted",
shortName:"Contacted"
},

{
id:"qualified",
name:"Qualified",
shortName:"Qualified"
},

{
id:"proposal",
name:"Proposal",
shortName:"Proposal"
},

{
id:"won",
name:"Won",
shortName:"Won"
},

{
id:"lost",
name:"Lost",
shortName:"Lost"
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

transform,

isDragging

}=useDraggable({

id:lead.id

});



return (

<article

ref={setNodeRef}

style={{

transform: transform

?

`translate3d(${transform.x}px, ${transform.y}px, 0)`

:

undefined

}}

className={`
group
relative
w-full
min-w-0
rounded-2xl
border
border-slate-200
bg-white
p-3
sm:p-4
shadow-sm
transition-all
duration-200
hover:-translate-y-0.5
hover:border-slate-300
hover:shadow-md

${dragging || isDragging ? "opacity-40" : ""}
`}

>



<div className="
flex
items-start
gap-3
min-w-0
">


<input

type="checkbox"

checked={selected}

onChange={()=>toggleSelect(lead.id)}

onClick={event=>event.stopPropagation()}

className="
mt-1
h-4
w-4
shrink-0
cursor-pointer
accent-black
"

/>




<div className="
min-w-0
flex-1
">


<button

type="button"

{...attributes}

{...listeners}

className="
block
w-full
min-w-0
cursor-grab
touch-none
text-left
active:cursor-grabbing
"

>


<div className="
flex
items-start
justify-between
gap-2
min-w-0
">


<div className="
min-w-0
">


<h3 className="
truncate
font-semibold
text-slate-900
">

{lead.name}

</h3>


<p className="
mt-1
truncate
text-sm
text-slate-500
">

{lead.email || "No email"}

</p>


</div>


<span className="
shrink-0
rounded-lg
bg-slate-100
px-2
py-1
text-[10px]
font-semibold
uppercase
tracking-wide
text-slate-500
">

Drag

</span>


</div>


</button>



<div className="
mt-3
flex
items-center
justify-between
gap-2
">


<span className="
min-w-0
truncate
rounded-full
bg-slate-100
px-3
py-1
text-xs
text-slate-600
">

{lead.source || "Manual"}

</span>


{

Number(lead.value)>0 && (

<span className="
shrink-0
text-sm
font-semibold
text-slate-800
">

${Number(lead.value).toLocaleString()}

</span>

)

}


</div>


</div>


</div>





<button

type="button"

onClick={onClick}

className="
mt-4
w-full
rounded-xl
border
border-slate-200
px-3
py-2
text-sm
font-medium
text-slate-700
transition
hover:border-slate-300
hover:bg-slate-50
"

>

View Details

</button>



</article>

)

}









function Column({

stage,

leads,

onSelectLead,

selectedLeads,

toggleLeadSelection,

droppableId,

compact=false

}){


const {

setNodeRef,

isOver

}=useDroppable({

id:droppableId || `column:${stage.id}`

});



const stageValue = leads.reduce(

(total,lead)=>

total+(Number(lead.value)||0),

0

);



return (

<section

ref={setNodeRef}

className={`
flex
min-w-0
flex-col
rounded-2xl
border
p-3
sm:p-4
transition-all
duration-200

${compact ? "min-h-[390px]" : "min-h-[440px]"}

${isOver
?
"border-slate-900 bg-slate-200 shadow-lg"
:
"border-slate-200 bg-slate-100"
}
`}


>


<div className="
mb-4
flex
items-start
justify-between
gap-3
">


<div className="
min-w-0
">


<h2 className="
truncate
font-semibold
text-slate-900
">

{stage.name}

</h2>


<p className="
mt-1
text-xs
text-slate-500
">

${stageValue.toLocaleString()}

</p>


</div>


<span className="
flex
h-7
min-w-7
shrink-0
items-center
justify-center
rounded-full
bg-white
px-2
text-xs
font-semibold
text-slate-700
shadow-sm
">

{leads.length}

</span>


</div>




<div className="
flex
min-h-0
flex-1
flex-col
gap-3
">


{

leads.length===0

?

<div className={`
flex
flex-1
items-center
justify-center
rounded-xl
border
border-dashed
px-4
text-center
text-sm
transition

${isOver
?
"border-slate-900 bg-white text-slate-900"
:
"border-slate-300 text-slate-400"
}
`}>

{isOver ? "Release to move lead" : "Drop leads here"}

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


</div>


</section>

)

}









function MobileStageTarget({

stage,

activeStage

}){


const {

setNodeRef,

isOver

}=useDroppable({

id:`mobile-target:${stage.id}`

});



const isCurrent = stage.id===activeStage;



return (

<div

ref={setNodeRef}

className={`
flex
min-h-20
items-center
justify-center
rounded-2xl
border-2
px-3
text-center
text-sm
font-semibold
transition-all

${isCurrent
?
"border-slate-300 bg-slate-100 text-slate-400"
:
isOver
?
"scale-[1.03] border-black bg-black text-white shadow-xl"
:
"border-dashed border-slate-300 bg-white text-slate-700"
}
`}

>

{isCurrent ? "Current stage" : `Move to ${stage.shortName}`}

</div>

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



const [

mobileStage,

setMobileStage

]=useState("new");



const [

optimisticStages,

setOptimisticStages

]=useState({});



const sensors = useSensors(

useSensor(PointerSensor,{

activationConstraint:{

distance:8

}

}),

useSensor(TouchSensor,{

activationConstraint:{

delay:180,

tolerance:8

}

})

);



const leadsByStage = useMemo(()=>{


return stages.reduce((groups,stage)=>{


groups[stage.id]=leads.filter(

lead=>(optimisticStages[lead.id] || lead.stage)===stage.id

);


return groups;


},{});


},[leads,optimisticStages]);



const visibleMobileLeads =

leadsByStage[mobileStage] || [];







function collisionStrategy(args){


const pointerHits = pointerWithin(args);


if(pointerHits.length){

return pointerHits;

}


return closestCorners(args);


}








function handleDragStart(event){


const lead = leads.find(

item=>item.id===event.active.id

);


setActiveLead(lead || null);


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

const rawDropId = String(over.id);

const newStage = rawDropId.includes(":")

?

rawDropId.split(":").pop()

:

rawDropId;



if(oldStage===newStage)return;



if(!stages.some(stage=>stage.id===newStage)){

return;

}





setOptimisticStages(prev=>({

...prev,

[lead.id]:newStage

}));


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



setMobileStage(newStage);



await onMove();


setOptimisticStages(prev=>{

const next={...prev};

delete next[lead.id];

return next;

});



}catch(err){

setOptimisticStages(prev=>{

const next={...prev};

delete next[lead.id];

return next;

});


console.error(
"Pipeline update failed:",
err
);

}



}







return (

<>


<DndContext

sensors={sensors}

collisionDetection={collisionStrategy}

measuring={{

droppable:{

strategy:MeasuringStrategy.Always

}

}}

onDragStart={handleDragStart}

onDragCancel={()=>setActiveLead(null)}

onDragEnd={handleDragEnd}

>


<div className="
hidden
w-full
min-w-0
grid-cols-2
gap-3
md:grid
lg:grid-cols-3
xl:grid-cols-6
">


{

stages.map(stage=>(


<Column

key={stage.id}

stage={stage}

leads={leadsByStage[stage.id] || []}

onSelectLead={setSelectedLead}

selectedLeads={selectedLeads}

toggleLeadSelection={toggleLeadSelection}

droppableId={`desktop-column:${stage.id}`}

compact

/>


))


}


</div>





<div className="
w-full
min-w-0
md:hidden
">


<div className="
mb-4
rounded-2xl
border
border-slate-200
bg-white
p-2
shadow-sm
">


<div className="
grid
grid-cols-3
gap-2
">


{

stages.map(stage=>(


<button

key={stage.id}

type="button"

onClick={()=>setMobileStage(stage.id)}

className={`
min-w-0
rounded-xl
px-2
py-2.5
text-xs
font-semibold
transition

${mobileStage===stage.id
?
"bg-black text-white shadow-md"
:
"bg-slate-100 text-slate-600"
}
`}

>


<span className="
block
truncate
">

{stage.shortName}

</span>


<span className="
mt-1
block
text-[10px]
opacity-70
">

{(leadsByStage[stage.id] || []).length} leads

</span>


</button>


))


}


</div>


</div>




<Column

stage={

stages.find(stage=>stage.id===mobileStage)

}

leads={visibleMobileLeads}

onSelectLead={setSelectedLead}

selectedLeads={selectedLeads}

toggleLeadSelection={toggleLeadSelection}

droppableId={`mobile-column:${mobileStage}`}

/>




<div className={`
fixed
inset-x-3
bottom-3
z-50
rounded-3xl
border
border-slate-200
bg-white/95
p-3
shadow-2xl
backdrop-blur
transition-all
duration-200

${activeLead
?
"translate-y-0 opacity-100 pointer-events-auto"
:
"translate-y-[120%] opacity-0 pointer-events-none"
}
`}>


<div className="
mb-3
flex
items-center
justify-between
gap-3
px-1
">


<div>


<p className="
text-sm
font-semibold
text-slate-900
">

{activeLead ? `Move ${activeLead.name}` : "Move lead"}

</p>


<p className="
text-xs
text-slate-500
">

Drop onto a destination

</p>


</div>


<span className="
rounded-full
bg-slate-100
px-3
py-1
text-xs
font-medium
text-slate-600
">

Release to move

</span>


</div>


<div className="
grid
grid-cols-2
gap-2
">


{

stages.map(stage=>(


<MobileStageTarget

key={stage.id}

stage={stage}

activeStage={activeLead?.stage}

/>


))


}


</div>


</div>


</div>





<DragOverlay

dropAnimation={null}

>


{

activeLead && (

<div className="
w-[min(88vw,320px)]
">

<LeadCard

lead={activeLead}

dragging

selected={false}

toggleSelect={()=>{}}

/>

</div>

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
