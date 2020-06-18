import React,{useState} from 'react';
import {Link,useHistory } from 'react-router-dom';
import M from 'materialize-css'; 
const Signup = ()=>{
    const history = useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const Postdata = ()=>{
      if (email!=="" &&  !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
      {
        const toastHTML = `<span>Invalid Email</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
         M.toast({html:toastHTML ,classes:"#c62828 red darken-3 rounded"})
        return
        }

      fetch("/signup",{
        method:"post",
        headers:
        {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name  ,
          password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
           M.Toast.dismissAll();
           const toastHTML = `<span>${data.error}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
            M.toast({html:toastHTML,classes:"#c62828 red darken-3 rounded"})
        }
        else
        {
          const toastHTML = `<span>${data.message}</span><button onClick='M.Toast.getInstance(this.parentElement).dismiss();' class="btn-flat toast-action"><i class="medium material-icons">clear</i></button>`;
          M.toast({html: toastHTML,classes:"#388e3c green darken-2 rounded"})
          history.push('/login')
        }
      }).catch(err=>{
        console.log(err)
      })
    }
    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>Postdata()}
            >
                Signup
            </button>
            <h5>
                <Link to="/login">Already Have an account</Link>
            </h5>
    
        </div>
      </div>

    )
}


export default Signup;