import {
useState
} from "react";



export default function KnowledgeBase(){


const [
sources,
setSources
]=useState([]);



const [
search,
setSearch
]=useState("");





function addSource(type){


const source={

id:Date.now(),

name:`New ${type} Source`,

type,

status:"Ready",

size:"Pending"

};



setSources(prev=>[

...prev,

source

]);


}







function removeSource(id){


setSources(prev=>

prev.filter(
source=>source.id!==id
)

);


}






const filteredSources =
sources.filter(source=>

source.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);








return (

<div className="
bg-white
rounded-2xl
shadow
border
p-6
space-y-6
w-full
min-w-0
">







<div className="
flex
flex-col
gap-4
">



<div>


<h2 className="
text-xl
font-bold
">

Knowledge Base

</h2>


<p className="
text-sm
text-slate-500
mt-1
">

Train your AI agents with company knowledge.

</p>


</div>







<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search knowledge..."

className="
border
rounded-xl
p-3
w-full
"

/>



</div>









<div className="
grid
grid-cols-1
sm:grid-cols-3
gap-3
">



<Button

text="Upload Document"

onClick={()=>addSource("Document")}

/>



<Button

text="Website Data"

onClick={()=>addSource("Website")}

/>



<Button

text="Add FAQ"

onClick={()=>addSource("FAQ")}

/>



</div>









<div className="
space-y-3
">



<h3 className="
font-semibold
">

Sources

</h3>





{

filteredSources.length===0

?


<div className="
rounded-xl
bg-slate-50
p-6
text-center
text-slate-500
">

No knowledge sources yet.

</div>


:


filteredSources.map(source=>(


<div

key={source.id}

className="
border
rounded-xl
p-4
flex
flex-col
sm:flex-row
sm:items-center
sm:justify-between
gap-4
"

>



<div className="
min-w-0
">


<h4 className="
font-semibold
truncate
">

{source.name}

</h4>


<div className="
flex
gap-2
text-sm
text-slate-500
flex-wrap
">

<span>

{source.type}

</span>


<span>
•
</span>


<span>

{source.status}

</span>


</div>


</div>








<button

onClick={()=>removeSource(source.id)}

className="
text-red-600
text-sm
"

>

Remove

</button>






</div>


))


}



</div>









<div className="
border-t
pt-5
grid
grid-cols-1
md:grid-cols-3
gap-4
">





<InfoCard

title="Documents"

description="PDFs, files, manuals"

/>




<InfoCard

title="Website"

description="Website crawling later"

/>




<InfoCard

title="FAQs"

description="Customer questions"

/>





</div>







</div>

)

}









function Button({

text,

onClick

}){


return (

<button

onClick={onClick}

className="
bg-black
text-white
rounded-xl
px-4
py-3
text-sm
"

>

{text}

</button>

)

}








function InfoCard({

title,

description

}){


return (

<div className="
bg-slate-50
rounded-xl
p-4
">


<h4 className="
font-semibold
">

{title}

</h4>


<p className="
text-sm
text-slate-500
mt-1
">

{description}

</p>


</div>

)

}