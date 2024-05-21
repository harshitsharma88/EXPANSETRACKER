
async function signUp(event){
    event.preventDefault();
    const obj= {
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    try {

        const res=await axios.post('http://18.232.150.169:80/user/signup',obj)
        console.log(res);
        event.target.name.value=""
        event.target.email.value=""
        event.target.password.value=""
        alert('User Created Successfully')
        
    } catch (error) {
        console.log(error);
        alert(error);
    }
    
    
   
}


async function login(event){
    event.preventDefault();
    const obj={
        email:event.target.email.value,
        password:event.target.password.value
    }
    try {
        const res= await axios.post('http://18.232.150.169:80/user/login',obj)

        console.log(res);
        localStorage.setItem("token",res.data.token);
        event.target.password.value=""
        event.target.email.value=""
        window.location.href="/expanse"
        
    } catch(err){
        alert(err)
        console.log(err);
    }
   

   
    
}

document.querySelector('#forgotbtn').addEventListener('click',forgotPassword);

async function forgotPassword(){
    const email= document.querySelector('#login').email.value;
    if(!email){
    alert('Please Enter your e-mail')
    }else{
        try {

            console.log("HEy");
            const response = await axios.post('http://18.232.150.169:80/password/forgotpassword',{email});
            console.log(response);
            alert('EMAIL SENT')
            
        } catch (error) {
            alert(error)
            
        }
    }
}