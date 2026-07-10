import {
useEffect,
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";


import {
getAppointments,
deleteAppointment,
updateAppointment
} from "../services/appointmentService";


import AppointmentCard
from "../components/AppointmentCard";


import AppointmentForm
from "../components/AppointmentForm";


import AppointmentDrawer
from "../components/AppointmentDrawer";


import CalendarView
from "../components/CalendarView";



export default function Appointments(){


const {
workspace
}=useWorkspace();



const [
appointments,
setAppointments
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
view,
setView
]=useState("list");



const [
selectedAppointment,
setSelectedAppointment
]=useState(null);



const [
showForm,
setShowForm
]=useState(false);



const [
loading,
setLoading
]=useState(false);



const [
error,
setError
]=useState("");






async function loadAppointments(){


if(!workspace?.id)return;


try{


setLoading(true);


const data =
await getAppointments(
workspace.id
);


setAppointments(data);



}catch(err){


setError(
err.message
);



}finally{


setLoading(false);


}


}







useEffect(()=>{


loadAppointments();


},[workspace]);









async function removeAppointment(id){


if(!confirm(
"Delete appointment?"
))return;



await deleteAppointment(id);


loadAppointments();


}







async function changeStatus(
id,
status
){


await updateAppointment(

id,

{
status
}

);



loadAppointments();


}









const filteredAppointments =

appointments

.filter(item=>{


const text = `

${item.title}

${item.customer_name}

${item.email}

`

.toLowerCase();



return text.includes(
search.toLowerCase()
);



})


.filter(item=>{


if(filter==="all")
return true;


return item.status===filter;


});









const upcoming = appointments.filter(

a=>a.status==="scheduled"

).length;




const completed = appointments.filter(

a=>a.status==="completed"

).length;




const cancelled = appointments.filter(

a=>a.status==="cancelled"

).length;









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

Appointments

</h1>



<p className="
text-slate-500
mt-2
">

Manage bookings, meetings, and customer schedules.

</p>


</div>





<button

onClick={()=>setShowForm(true)}

className="
bg-black
text-white
rounded-xl
px-6
py-3
"

>

+ New Appointment

</button>



</div>









<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">



<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Upcoming
</p>

<h2 className="
text-2xl
font-bold
">

{upcoming}

</h2>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Completed
</p>

<h2 className="
text-2xl
font-bold
">

{completed}

</h2>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-5
">

<p className="text-slate-500">
Cancelled
</p>

<h2 className="
text-2xl
font-bold
">

{cancelled}

</h2>


</div>



</div>









{
error && (

<div className="
bg-red-50
text-red-600
p-4
rounded-xl
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

className="
border
rounded-xl
p-3
flex-1
"

placeholder="Search appointments..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>





<select

className="
border
rounded-xl
p-3
"

value={filter}

onChange={
e=>setFilter(e.target.value)
}

>


<option value="all">
All
</option>


<option value="scheduled">
Scheduled
</option>


<option value="completed">
Completed
</option>


<option value="cancelled">
Cancelled
</option>


</select>





<button

onClick={()=>
setView(
view==="list"
?
"calendar"
:
"list"
)

}

className="
border
rounded-xl
px-4
"

>

{
view==="list"
?
"Calendar"
:
"List"
}

</button>


</div>


</div>









{
view==="calendar"

?

<CalendarView

appointments={
filteredAppointments
}

/>


:

<div className="
space-y-4
">


{

loading

?

<p>
Loading appointments...
</p>


:


filteredAppointments.map(item=>(


<AppointmentCard

key={item.id}

appointment={item}

onClick={()=>
setSelectedAppointment(item)
}

onDelete={()=>
removeAppointment(item.id)
}

onStatusChange={changeStatus}

/>


))


}



</div>

}





{
showForm && (

<AppointmentForm

organizationId={
workspace.id
}

onClose={()=>
setShowForm(false)
}

onCreated={()=>{
setShowForm(false);
loadAppointments();
}}

/>

)

}





{
selectedAppointment && (

<AppointmentDrawer

appointment={
selectedAppointment
}

onClose={()=>
setSelectedAppointment(null)
}

onUpdated={loadAppointments}

/>

)

}





</section>

)

}