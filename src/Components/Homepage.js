import React from "react"
import {useLocation, useNavigate} from 'react-router-dom'
function Homepage(){
    const location  = useLocation()
    return(
        <div className="homepage">
            <h1>Hello {location.state.id} welcome to home</h1>
        </div>
    )
}

export default Homepage;