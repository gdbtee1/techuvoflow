import {
AuthProvider
} from "../../features/auth/context/AuthContext";


import {
WorkspaceProvider
} from "../../features/workspace/context/WorkspaceContext";



export default function AppProviders({children}){


return (

<AuthProvider>

<WorkspaceProvider>

{children}

</WorkspaceProvider>

</AuthProvider>

)

}