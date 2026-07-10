export default function CalendarView({

appointments=[]

}){



function formatDate(date){


return new Date(date)

.toLocaleDateString(
undefined,
{
weekday:"short",
month:"short",
day:"numeric"
}

);


}






return (

<div className="
bg-white
rounded-2xl
shadow
p-6
space-y-6
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

Calendar

</h2>



<p className="
text-sm
text-slate-500
">

{
appointments.length
}

Appointments

</p>


</div>









{

appointments.length===0

?


<div className="
text-center
py-12
text-slate-500
">

No appointments scheduled.

</div>


:


<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">


{

appointments.map(item=>(


<div

key={item.id}

className="
border
rounded-2xl
p-5
space-y-3
"

>


<div className="
flex
justify-between
items-start
">


<h3 className="
font-bold
">

{item.title}

</h3>



<span className="
text-xs
bg-slate-100
rounded-full
px-3
py-1
"

>

{item.status}

</span>



</div>







<div className="
text-sm
text-slate-500
">


<p>

📅

{" "}

{
item.start_time

?

formatDate(
item.start_time
)

:

"No date"

}

</p>




<p className="
mt-1
">

🕒

{" "}

{

item.start_time

?

new Date(
item.start_time
)

.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}

)

:

""

}

</p>


</div>







{

item.leads?.name && (

<p className="
text-sm
font-medium
">

Customer:

{" "}

{item.leads.name}

</p>


)

}





</div>


))


}



</div>


}




</div>

)

}