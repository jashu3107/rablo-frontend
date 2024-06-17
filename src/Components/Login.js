import React, {useEffect, useState} from "react"
import axios from "axios"
import { useNavigate, Link} from 'react-router-dom'

function Login(){
    const history = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function submit(e){
        e.preventDefault();
        try{
            await axios.post("https://rablo-mxwc.onrender.com/login",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    history("/home",{state:{id:email}})
                }
                else if(res.data==="notexist"){
                    alert("User have not signed up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div className="Login">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" id=""/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" id=""/>
                <input type="submit" onClick={submit}/>
            </form>
            <br/>
            <p>OR</p>
            <br/>
            <Link to="/signup">Signup Page</Link>
        </div>
    )
}

export default Login;