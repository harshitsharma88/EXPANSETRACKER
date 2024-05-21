async function updatepassword(e){
    e.preventDefault();
    try{
    const pass1=e.target.forgotpassword.value;
    const pass2=e.target.confirmpassword.value;
    
    if(pass1!==pass2){
        alert("Password Doesn't Match")
        return;
    }

    const url=document.URL.split('/').pop()
     const obj = {
        password:pass2,
        rqstid:url
     }
     
     await axios.post('http://18.232.150.169:80/password/updatepassword',obj);
      
     document.querySelector('body').innerHTML='<h1>Password Reset Succesfully</h1>';

    

    }
    catch(error){
        alert('Error')
        console.log(error);
    }

} 