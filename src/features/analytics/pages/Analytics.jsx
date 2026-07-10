import {
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";



export default function Analytics(){


const {
workspace
}=useWorkspace();



const [
range,
setRange
]=useState("30");



const [
stats,
setStats
]=useState({

revenue:0,

leads:0,

pipeline:0,

won:0,

conversion:0,

appointments:0,

activities:0

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
md:justify-between
gap-4
">


<div>


<h1 className="
text-3xl
font-bold
">

Analytics

</h1>


<p className="
text-slate-500
mt-2
">

Monitor your workspace performance.

</p>


</div>






<select

value={range}

onChange={
e=>setRange(e.target.value)
}

className="
border
rounded-xl
p-3
"

>


<option value="7">
Last 7 Days
</option>


<option value="30">
Last 30 Days
</option>


<option value="90">
Last 90 Days
</option>


<option value="365">
Last Year
</option>


</select>


</div>









<div className="
grid
grid-cols-1
md:grid-cols-4
gap-5
">



<Card

title="Revenue"

value={`$${stats.revenue}`}

/>



<Card

title="Leads"

value={stats.leads}

/>



<Card

title="Pipeline"

value={`$${stats.pipeline}`}

/>



<Card

title="Conversion"

value={`${stats.conversion}%`}

/>



</div>









<div className="
grid
grid-cols-1
md:grid-cols-2
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
text-xl
mb-5
">

Sales Overview

</h2>


<div className="
space-y-4
">


<Row

label="Won Deals"

value={stats.won}

/>


<Row

label="Appointments"

value={stats.appointments}

/>


<Row

label="Activities"

value={stats.activities}

/>



</div>


</div>








<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
font-bold
text-xl
mb-5
">

Growth Chart

</h2>



<div className="
h-48
rounded-xl
bg-slate-100
flex
items-center
justify-center
text-slate-400
">


Chart Integration Ready


</div>


</div>




</div>








</section>

)

}








function Card({

title,

value

}){


return (

<div className="
bg-white
rounded-2xl
shadow
p-5
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








function Row({

label,

value

}){


return (

<div className="
flex
justify-between
border-b
pb-3
">

<span>
{label}
</span>


<b>
{value}
</b>


</div>

)

}