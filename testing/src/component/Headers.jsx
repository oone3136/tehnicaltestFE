import React from "react";
import { useAuth } from "../auth/useAuth";

const Headers = () => {
    const {user} = useAuth();
    return (
        <div className="header shadow-1">
            <h1>{user.username}</h1>
            
        </div>
    )
}

export default Headers;