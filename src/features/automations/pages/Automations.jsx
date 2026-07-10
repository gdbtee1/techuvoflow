import {
useEffect,
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";


import {
getAutomations,
deleteAutomation,
toggleAutomation
} from "../services/automationService";


import AutomationBuilder
from "../components/AutomationBuilder";



export default function Automations(){


const {
workspace
}=useWorkspace();



const [
automations,
setAutomations
]=useState([]);



const [
search,
setSearch
]=useState("");



const [
filter,
setFilter
]=useState("all");



const [
showBuilder,
setShowBuilder
]=useState(false);



const [
selectedAutomation,
setSelectedAutomation
]=useState(null);



const [
loading,
setLoading
]=useState(false);



const [
error,
setError
]=useState("");






async function loadAutomations(){


if(!workspace?.id)return;



try{


setLoading(true);



const data =
await getAutomations(
workspace.id
);



setAutomations(data);



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}


}







useEffect(()=>{


loadAutomations();


},[workspace]);









async function removeAutomation(id){


const confirmDelete =
window.confirm(
"Delete this automation?"
);



if(!confirmDelete)return;



try{


await deleteAutomation(id);


loadAutomations();



}catch(err){


setError(
err.message
);


}


}









async function changeStatus(id,current){


try{


await toggleAutomation(

id,

!current

);



loadAutomations();



}catch(err){


setError(
err.message
);


}


}









const filtered =

automations

.filter(auto=>{


const text=

`

${auto.name}

${auto.trigger}

`

.toLowerCase();



return text.includes(
search.toLowerCase()
);


})


.filter(auto=>{


if(filter==="all"){

return true;

}



if(filter==="active"){

return auto.active;

}



if(filter==="draft"){

return !auto.active;

}


});









return (

<section className="
space-y-8
w-full
">









<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-4
">


<div>


<h1 className="
text-3xl
font-bold
">

Automations

</h1>



<p className="
text-slate-500
mt-2
">

Create workflows that run your business automatically.

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
"

>

+ Create Automation

</button>



</div>









<div className="
grid
grid-cols-1
md:grid-cols-4
gap-4
">



<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Total
</p>

<h2 className="
text-2xl
font-bold
">

{automations.length}

</h2>

</div>




<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Active
</p>

<h2 className="
text-2xl
font-bold
">

{
automations.filter(
a=>a.active
).length
}

</h2>

</div>




<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Drafts
</p>

<h2 className="
text-2xl
font-bold
">

{
automations.filter(
a=>!a.active
).length
}

</h2>

</div>





<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Runs
</p>

<h2 className="
text-2xl
font-bold
">

0

</h2>

</div>




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
p-5
space-y-4
">


<div className="
flex
flex-col
md:flex-row
gap-3
">


<input

placeholder="Search automations..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
border
rounded-xl
p-3
flex-1
"

/>





<select

value={filter}

onChange={
e=>setFilter(e.target.value)
}

className="
border
rounded-xl
p-3
"

>


<option value="all">
All
</option>


<option value="active">
Active
</option>


<option value="draft">
Draft
</option>


</select>



</div>







<div className="
space-y-4
">


{

loading

?

<p>
Loading automations...
</p>


:


filtered.length===0

?

<div className="
text-center
py-10
text-slate-500
">

No automations yet.

</div>



:


filtered.map(auto=>(


<div

key={auto.id}

className="
border
rounded-2xl
p-5
flex
flex-col
md:flex-row
md:items-center
justify-between
gap-4
"

>


<div>


<h3 className="
font-bold
text-lg
">

{auto.name}

</h3>



<p className="
text-sm
text-slate-500
">

Trigger:

{auto.trigger}

</p>


</div>








<div className="
flex
gap-3
flex-wrap
">


<button

onClick={()=>
changeStatus(
auto.id,
auto.active
)
}

className="
border
rounded-xl
px-4
py-2
"

>

{
auto.active
?
"Disable"
:
"Enable"
}

</button>




<button

onClick={()=>
setSelectedAutomation(auto)
}

className="
border
rounded-xl
px-4
py-2
"

>

View

</button>





<button

onClick={()=>
removeAutomation(auto.id)
}

className="
bg-red-600
text-white
rounded-xl
px-4
py-2
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









{
showBuilder && (

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<div className="
flex
justify-between
mb-5
">


<h2 className="
text-xl
font-bold
">

Create Automation

</h2>



<button

onClick={()=>
setShowBuilder(false)
}

>

✕

</button>


</div>





<AutomationBuilder/>




</div>

)

}







{
selectedAutomation && (

<div className="
fixed
inset-0
bg-black/40
z-50
flex
justify-end
">


<div className="
bg-white
w-full
md:w-[450px]
h-full
p-6
overflow-y-auto
">


<div className="
flex
justify-between
mb-6
">


<h2 className="
text-xl
font-bold
">

Automation Details

</h2>



<button

onClick={()=>
setSelectedAutomation(null)
}

>

✕

</button>


</div>



<h3 className="
font-bold
">

{selectedAutomation.name}

</h3>



<p className="
text-slate-500
mt-2
">

Trigger:

{selectedAutomation.trigger}

</p>


</div>


</div>

)

}





</section>

)

}