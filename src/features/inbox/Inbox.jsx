import {
useEffect,
useState
} from "react";


import {
useWorkspace
} from "../workspace/context/WorkspaceContext";


import {
getConversations,
sendMessage
} from "./services/messageService";



export default function Inbox(){


const {
workspace
}=useWorkspace();



const [
conversations,
setConversations
]=useState([]);



const [
selectedConversation,
setSelectedConversation
]=useState(null);



const [
message,
setMessage
]=useState("");



const [
search,
setSearch
]=useState("");



const [
loading,
setLoading
]=useState(false);



const [
error,
setError
]=useState("");






async function loadConversations(){


if(!workspace?.id){

return;

}



try{


setLoading(true);



const data =
await getConversations(
workspace.id
);



setConversations(data);



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}


}







useEffect(()=>{


loadConversations();


},[workspace]);








async function handleSend(){


if(
!message.trim() ||
!selectedConversation
){

return;

}



try{


await sendMessage({

conversation_id:selectedConversation.id,

content:message,

sender:"user"

});



setMessage("");



await loadConversations();



}catch(err){


setError(
err.message
);


}


}








const filteredConversations =

conversations.filter(conversation=>{


const text=

`

${conversation.contact_name || ""}

${conversation.contact_email || ""}

${conversation.last_message || ""}

`

.toLowerCase();



return text.includes(
search.toLowerCase()
);


});








return (

<section className="
space-y-6
w-full
overflow-hidden
">






<div>

<h1 className="
text-3xl
font-bold
">

Inbox

</h1>


<p className="
text-slate-500
mt-2
">

Manage customer conversations and messages.

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
lg:grid-cols-3
gap-5
">









<div className="
bg-white
rounded-2xl
shadow
p-5
h-[650px]
overflow-y-auto
">





<input

placeholder="Search conversations..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
border
rounded-xl
p-3
w-full
"

/>







<div className="
mt-5
space-y-3
">



{

loading

?

<p>
Loading...
</p>


:

filteredConversations.length===0

?

<p className="
text-center
text-slate-500
py-10
">

No conversations yet

</p>


:


filteredConversations.map(conversation=>(


<button

key={conversation.id}

onClick={()=>setSelectedConversation(conversation)}

className={`
w-full
text-left
border
rounded-xl
p-4
transition

${
selectedConversation?.id===conversation.id

?

"bg-slate-100"

:

"hover:bg-slate-50"

}

`}

>


<h3 className="
font-semibold
">

{
conversation.contact_name ||

"No Name"

}

</h3>



<p className="
text-sm
text-slate-500
truncate
">

{
conversation.last_message ||

"No messages"

}

</p>



</button>


))


}



</div>





</div>









<div className="
lg:col-span-2
bg-white
rounded-2xl
shadow
h-[650px]
flex
flex-col
">





{

selectedConversation

?


<>


<div className="
border-b
p-5
">


<h2 className="
font-bold
text-xl
">

{
selectedConversation.contact_name

}


</h2>



<p className="
text-sm
text-slate-500
">

{
selectedConversation.channel

}

</p>



</div>







<div className="
flex-1
overflow-y-auto
p-5
space-y-4
">



{

selectedConversation.messages?.length

?

selectedConversation.messages.map(msg=>(


<div

key={msg.id}

className={`
rounded-xl
p-3
max-w-md

${
msg.sender==="user"

?

"ml-auto bg-black text-white"

:

"bg-slate-100"

}

`}

>

{msg.content}

</div>


))


:


<div className="
text-slate-500
">

No messages yet.

</div>


}



</div>









<div className="
border-t
p-4
flex
gap-3
">


<input

value={message}

onChange={
e=>setMessage(e.target.value)
}

onKeyDown={
e=>{

if(e.key==="Enter"){

handleSend();

}

}

}

placeholder="Type message..."

className="
border
rounded-xl
p-3
flex-1
"

/>



<button

onClick={handleSend}

className="
bg-black
text-white
rounded-xl
px-5
"

>

Send

</button>



</div>




</>


:


<div className="
flex
items-center
justify-center
flex-1
text-slate-500
">

Select a conversation

</div>



}



</div>








</div>





</section>

)

}