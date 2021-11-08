import React, { useContext } from "react"
import AuthContext from "../contexts/Auth"
import Splash from "../screens/Splash"

import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"

const Routes: React.FC = () => {
    const { user, isContextLoading } = useContext(AuthContext)

    if (isContextLoading)
        return <Splash />

    return user ? <AppRoutes /> : <AuthRoutes />
}


export default Routes