import {
useEffect,
useState
} from "react";


import {
updateAppointment,
deleteAppointment
} from "../services/appointmentService";



export default function AppointmentDrawer({

appointment,

onClose,

onUpdated,

onDeleted

}){


const [
editing,
setEditing
]=useState(false);



const [
saving,
setSaving
]=useState(false);



const [
form,
setForm
]=useState({});



useEffect(()=>{


if(appointment){


setForm({

title:appointment.title || "",

description:appointment.description || "",

start_time:appointment.start_time
?
appointment.start_time.slice(0,16)
:
"",

end_time:appointment.end_time
?
appointment.end_time.slice(0,16)
:
"",

status:appointment.status || "scheduled"

});


}


},[appointment]);







function updateField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}







async function save(){


try{


setSaving(true);



await updateAppointment(

appointment.id,

form

);



setEditing(false);



if(onUpdated){

onUpdated();

}



}catch(err){


console.error(err);


}finally{


setSaving(false);


}


}









async function remove(){


const confirmed =
window.confirm(
"Delete this appointment?"
);



if(!confirmed)return;



await deleteAppointment(
appointment.id
);



if(onDeleted){

onDeleted();

}


}








if(!appointment)return null;






return (

<div

className="
fixed
inset-0
bg-black/40
z-50
flex
justify-end
"

onClick={onClose}

>


<div

onClick={
e=>e.stopPropagation()
}

className="
bg-white
w-full
md:max-w-md
h-full
overflow-y-auto
p-6
space-y-6
"

>





<div className="
flex
justify-between
items-center
">


<h2 className="
text-2xl
font-bold
">

Appointment

</h2>



<button

onClick={onClose}

>

✕

</button>


</div>









<div>


<label className="
text-sm
text-slate-500
">

Title

</label>


<input

disabled={!editing}

name="title"

value={form.title || ""}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>


</div>








<div>


<label className="
text-sm
text-slate-500
">

Description

</label>


<textarea

disabled={!editing}

name="description"

value={form.description || ""}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
h-28
"

/>


</div>









<div>


<label className="
text-sm
text-slate-500
">

Status

</label>


<select

disabled={!editing}

name="status"

value={form.status}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

>


<option value="scheduled">
Scheduled
</option>


<option value="completed">
Completed
</option>


<option value="cancelled">
Cancelled
</option>


<option value="no_show">
No Show
</option>


</select>


</div>








<div className="
grid
grid-cols-1
gap-4
">


<div>


<label className="
text-sm
text-slate-500
">

Start Time

</label>


<input

disabled={!editing}

type="datetime-local"

name="start_time"

value={form.start_time || ""}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>


</div>







<div>


<label className="
text-sm
text-slate-500
">

End Time

</label>


<input

disabled={!editing}

type="datetime-local"

name="end_time"

value={form.end_time || ""}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>


</div>


</div>









<div className="
flex
gap-3
">


{

editing

?

<button

onClick={save}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

{

saving
?
"Saving..."
:
"Save"

}

</button>


:

<button

onClick={()=>setEditing(true)}

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

Edit

</button>


}



</div>








<button

onClick={remove}

className="
w-full
bg-red-600
text-white
rounded-xl
py-3
"

>

Delete Appointment

</button>





</div>


</div>

)

}