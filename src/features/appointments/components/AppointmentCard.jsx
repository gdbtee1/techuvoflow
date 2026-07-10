
export default function AppointmentCard({

appointment,

onClick,

onDelete,

onStatusChange

}){


return (

<div className="
bg-white
rounded-2xl
border
p-5
shadow-sm
space-y-4
">


<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-4
">



<div

onClick={onClick}

className="
cursor-pointer
flex-1
"

>


<h3 className="
font-bold
text-lg
">

{appointment.title}

</h3>



<p className="
text-sm
text-slate-500
mt-1
">

{
appointment.leads?.name

||

"No lead attached"

}

</p>




<p className="
text-sm
text-slate-500
">

{
appointment.leads?.email

||

""

}

</p>



</div>






<div className="
flex
items-center
gap-3
">


<select

value={
appointment.status
}

onChange={
e=>

onStatusChange(

appointment.id,

e.target.value

)

}

className="
border
rounded-xl
p-2
text-sm
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

onClick={onDelete}

className="
text-red-600
text-sm
hover:underline
"

>

Delete

</button>



</div>




</div>









<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
text-sm
">


<div>

<p className="
text-slate-500
">

Start

</p>


<p className="
font-medium
">

{
appointment.start_time

?

new Date(
appointment.start_time
)
.toLocaleString()

:

"No date"

}

</p>


</div>





<div>

<p className="
text-slate-500
">

End

</p>


<p className="
font-medium
">

{
appointment.end_time

?

new Date(
appointment.end_time
)
.toLocaleString()

:

"-"

}

</p>


</div>


</div>








{
appointment.description && (

<div className="
bg-slate-50
rounded-xl
p-3
text-sm
">

{appointment.description}

</div>

)

}




</div>

)

}