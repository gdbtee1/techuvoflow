export default function AgentCard({

agent,

onSelect

}){


return (

<div

onClick={()=>onSelect(agent)}

className="
bg-white
rounded-2xl
border
shadow-sm
p-5
cursor-pointer
hover:shadow-lg
transition
space-y-5
w-full
min-w-0
"

>








<div className="
flex
justify-between
items-start
gap-4
">


<div className="
min-w-0
">


<h3 className="
text-xl
font-bold
truncate
">

{

agent.name || "Unnamed Agent"

}

</h3>



<p className="
text-sm
text-slate-500
truncate
mt-1
">

{

agent.role || "AI Assistant"

}

</p>


</div>







<span

className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
whitespace-nowrap
"

>

{

agent.status || "Active"

}

</span>





</div>









<div className="
grid
grid-cols-2
gap-3
">


<Stat

label="Messages"

value={
agent.messages || 0
}

/>



<Stat

label="Model"

value={
agent.model || "Ready"
}

/>




</div>









<div>


<p className="
text-sm
font-semibold
mb-3
">

Capabilities

</p>



<div className="
flex
flex-wrap
gap-2
">


{

(agent.capabilities || [

"Sales",

"Support",

"Automation"

])

.map(item=>(


<span

key={item}

className="
bg-slate-100
rounded-full
px-3
py-1
text-xs
"

>

{item}

</span>


))


}



</div>


</div>









<div className="
flex
gap-3
pt-3
border-t
">


<button

onClick={(e)=>{

e.stopPropagation();

onSelect(agent);

}}

className="
bg-black
text-white
rounded-xl
px-4
py-3
flex-1
"

>

Manage

</button>






<button

onClick={(e)=>{

e.stopPropagation();

}}

className="
border
rounded-xl
px-4
py-3
"

>

Settings

</button>





</div>









</div>

)

}









function Stat({

label,

value

}){


return (

<div className="
bg-slate-50
rounded-xl
p-3
min-w-0
">


<p className="
text-xs
text-slate-500
">

{label}

</p>


<p className="
font-bold
truncate
">

{value}

</p>


</div>

)

}