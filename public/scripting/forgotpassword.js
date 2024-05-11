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
     
     await axios.post('http://localhost:4000/password/updatepassword',obj);
      
     document.querySelector('body').innerHTML='<h1>Password Reset Successfully</h1><br><p>Please Login again to your account</p>'

    

    }
    catch(error){
        alert('Error')
        console.log(error);
    }

} 