import {
useState
} from "react";


import AgentCard
from "../components/AgentCard";


import AgentBuilder
from "../components/AgentBuilder";


import KnowledgeBase
from "../components/KnowledgeBase";


import AgentChat
from "../components/AgentChat";



export default function Agents(){


const [
agents,
setAgents
]=useState([]);



const [
selectedAgent,
setSelectedAgent
]=useState(null);



const [
showBuilder,
setShowBuilder
]=useState(false);





function createAgent(){


const newAgent={

id:Date.now(),

name:"New AI Agent",

role:"Sales Agent",

status:"active",

model:"Not Connected",

messages:0

};



setAgents(prev=>[

...prev,

newAgent

]);


setSelectedAgent(newAgent);


setShowBuilder(false);

}








return (

<section className="
space-y-8
w-full
max-w-full
overflow-hidden
">






{/* Header */}

<div className="
flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-5
">


<div>


<h1 className="
text-3xl
font-bold
">

AI Agents

</h1>


<p className="
text-slate-500
mt-2
">

Build AI employees that handle sales, support, and automation.

</p>


</div>






<button

onClick={()=>setShowBuilder(true)}

className="
bg-black
text-white
rounded-xl
px-6
py-3
w-full
sm:w-auto
"

>

Create Agent

</button>


</div>









{/* Stats */}

<div className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
">



<Stat

title="Agents"

value={agents.length}

/>



<Stat

title="Active"

value={
agents.filter(
a=>a.status==="active"
).length
}

/>



<Stat

title="Messages"

value="0"

/>



</div>









{
showBuilder && (

<AgentBuilder

onCreate={createAgent}

/>

)

}









{/* Main Workspace */}

<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
items-start
">








{/* Agents */}

<div className="
xl:col-span-2
space-y-5
">


<h2 className="
text-xl
font-bold
">

Your Agents

</h2>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">



{

agents.length===0

?

<div className="
bg-white
rounded-2xl
shadow
p-8
text-center
text-slate-500
md:col-span-2
">

No AI agents created yet.

</div>


:


agents.map(agent=>(


<AgentCard

key={agent.id}

agent={agent}

onSelect={setSelectedAgent}

/>


))


}



</div>


</div>









{/* Right Panel */}

<div className="
space-y-6
min-w-0
">



<div className="
min-w-0
">

<KnowledgeBase/>

</div>





<div className="
min-w-0
">


<AgentChat

agent={selectedAgent}

/>


</div>





</div>






</div>








</section>

)

}








function Stat({

title,

value

}){


return (

<div className="
bg-white
rounded-2xl
shadow
p-5
min-w-0
">


<p className="
text-slate-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>


</div>

)

}