import {
useEffect,
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import {
useWorkspace
} from "../features/workspace/context/WorkspaceContext";


import {
getDashboardStats,
getRecentActivities
} from "../features/dashboard/services/dashboardService";



export default function Dashboard(){


const navigate = useNavigate();



const {
workspace
}=useWorkspace();



const [
stats,
setStats
]=useState({

leads:0,

tasks:0,

automations:0,

appointments:0,

pipeline:{

new:0,

contacted:0,

qualified:0,

proposal:0,

won:0,

lost:0

}

});



const [
activities,
setActivities
]=useState([]);



const [
loading,
setLoading
]=useState(true);



const [
error,
setError
]=useState("");




useEffect(()=>{


async function loadDashboard(){


if(!workspace?.id) return;



try{


setLoading(true);

setError("");



const data = await getDashboardStats(
workspace.id
);



const activityData = await getRecentActivities(
workspace.id
);



setStats(data);

setActivities(activityData);



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}


}



loadDashboard();



},[workspace]);







const cards=[

{
title:"Total Leads",
value:stats.leads,
path:"/crm"
},

{
title:"Open Tasks",
value:stats.tasks,
path:"/tasks"
},

{
title:"Appointments",
value:stats.appointments,
path:"/appointments"
},

{
title:"Automations",
value:stats.automations,
path:"/automations"
}

];





const pipeline=[

{
name:"New Leads",
key:"new"
},

{
name:"Contacted",
key:"contacted"
},

{
name:"Qualified",
key:"qualified"
},

{
name:"Proposal",
key:"proposal"
},

{
name:"Won",
key:"won"
},

{
name:"Lost",
key:"lost"
}

];






return (

<section className="
space-y-8
w-full
">





<div>


<h1 className="
text-2xl
sm:text-3xl
font-bold
">

Welcome back, {workspace?.name || "Workspace"} 👋

</h1>


<p className="
text-slate-500
mt-2
text-sm
sm:text-base
">

Here is what's happening with your business today.

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
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4
">


{

cards.map(card=>(


<button

key={card.title}

onClick={()=>navigate(card.path)}

className="
text-left
bg-white
rounded-2xl
p-5
shadow-sm
border
hover:shadow-md
transition
"

>


<p className="
text-sm
text-slate-500
">

{card.title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{

loading

?

"..."

:

card.value

}

</h2>


</button>


))

}


</div>








<div className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
">







<div className="
bg-white
rounded-2xl
p-5
sm:p-6
shadow-sm
border
">


<h2 className="
text-xl
font-semibold
mb-5
">

Sales Pipeline

</h2>





<div className="
space-y-3
">


{

pipeline.map(stage=>(


<div

key={stage.key}

className="
flex
justify-between
items-center
bg-slate-50
rounded-xl
p-4
"

>


<span>

{stage.name}

</span>



<span className="
font-bold
">

{

loading

?

"..."

:

stats.pipeline?.[stage.key] || 0

}

</span>


</div>


))

}


</div>


</div>









<div className="
bg-white
rounded-2xl
p-5
sm:p-6
shadow-sm
border
">


<h2 className="
text-xl
font-semibold
mb-5
">

Quick Actions

</h2>



<div className="
grid
gap-3
">


<button

onClick={()=>navigate("/crm")}

className="
border
rounded-xl
p-4
text-left
hover:bg-slate-50
transition
"

>

+ Add Lead

</button>




<button

onClick={()=>navigate("/automations")}

className="
border
rounded-xl
p-4
text-left
hover:bg-slate-50
transition
"

>

+ Create Automation

</button>




<button

onClick={()=>navigate("/appointments")}

className="
border
rounded-xl
p-4
text-left
hover:bg-slate-50
transition
"

>

+ Schedule Appointment

</button>



</div>



</div>







</div>








<div className="
bg-white
rounded-2xl
p-5
sm:p-6
shadow-sm
border
">


<h2 className="
text-xl
font-semibold
mb-4
">

Recent Activity

</h2>



<div className="
space-y-3
">


{

activities.length === 0

?

(

<p className="
text-slate-500
text-sm
">

No recent activity yet.

</p>

)

:

(

activities.map(activity=>(


<div

key={activity.id}

className="
bg-slate-50
rounded-xl
p-4
"

>


<h3 className="
font-medium
">

{activity.title}

</h3>


<p className="
text-sm
text-slate-500
mt-1
">

{activity.description}

</p>


<p className="
text-xs
text-slate-400
mt-2
">

{
new Date(
activity.created_at
).toLocaleString()
}

</p>


</div>


))

)

}


</div>



</div>






</section>

)

}