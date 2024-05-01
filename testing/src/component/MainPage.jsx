import React from "react";
import Sidebar from "./Sidebar";
import Headers from "./Headers";


const MainPage = ({children}) => {
    return (
        <div>
            <Headers />
            <Sidebar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default MainPage;