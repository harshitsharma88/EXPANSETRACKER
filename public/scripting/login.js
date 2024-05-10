async function signUp(event){
    event.preventDefault();
    const obj= {
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    axios.post('http://localhost:4000/user/signup',obj)
    .then(res=>{
        console.log(res);
        event.target.name.value=""
        event.target.email.value=""
        event.target.password.value=""
    
    }
    )
    .catch(err=>{
        console.log(err);
        alert(err)
    })
}

async function login(event){
    event.preventDefault();
    const obj={
        email:event.target.email.value,
        password:event.target.password.value
    }
    axios.post('http://localhost:4000/user/login',obj)
    .then(res=>{
        console.log(res);
        localStorage.setItem("token",res.data.token);
        event.target.password.value=""
        event.target.email.value=""
        window.location.href="/expanse"

    })
    .catch(err=>alert(err))
}