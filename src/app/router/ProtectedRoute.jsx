import {
Navigate
} from "react-router-dom";


import {
useAuth
} from "../../features/auth/context/AuthContext";



export default function ProtectedRoute({children}){


const {
user,
loading
}=useAuth();



if(loading){

return (

<div className="p-10">

Loading...

</div>

)

}



if(!user){

return (

<Navigate to="/signup"/>

)

}



return children;


}