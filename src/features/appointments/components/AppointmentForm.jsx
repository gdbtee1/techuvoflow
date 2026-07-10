import {
useState
} from "react";


import {
createAppointment
} from "../services/appointmentService";



export default function AppointmentForm({

organizationId,

onClose,

onCreated

}){


const [
loading,
setLoading
]=useState(false);



const [
error,
setError
]=useState("");



const [
form,
setForm
]=useState({

title:"",

description:"",

start_time:"",

end_time:"",

status:"scheduled"

});







function updateField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}







async function submit(){


if(!form.title){

setError(
"Appointment title is required"
);

return;

}



try{


setLoading(true);

setError("");



await createAppointment({

organization_id:organizationId,

title:form.title,

description:form.description,

start_time:form.start_time,

end_time:form.end_time,

status:form.status

});





if(onCreated){

onCreated();

}



}catch(err){


setError(
err.message
);



}finally{


setLoading(false);


}



}








return (

<div className="
fixed
inset-0
bg-black/40
z-50
flex
items-center
justify-center
p-4
">


<div className="
bg-white
rounded-2xl
w-full
max-w-lg
p-6
space-y-5
">


<div className="
flex
justify-between
items-center
">

<h2 className="
text-xl
font-bold
">

New Appointment

</h2>



<button

onClick={onClose}

>

✕

</button>


</div>








{
error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-3
">

{error}

</div>

)

}








<input

name="title"

placeholder="Appointment title"

value={form.title}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>







<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
h-28
"

/>








<div className="
grid
grid-cols-1
md:grid-cols-2
gap-3
">


<div>

<label className="
text-sm
text-slate-500
">

Start

</label>


<input

type="datetime-local"

name="start_time"

value={form.start_time}

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

End

</label>


<input

type="datetime-local"

name="end_time"

value={form.end_time}

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









<select

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








<button

onClick={submit}

disabled={loading}

className="
bg-black
text-white
rounded-xl
px-6
py-3
w-full
"

>

{

loading

?

"Creating..."

:

"Create Appointment"

}

</button>







</div>


</div>

)

}