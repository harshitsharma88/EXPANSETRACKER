async function updatepassword(e){
    e.preventDefault();
    try{
    const pass1=e.target.forgotpassword.value;
    const pass2=e.target.confirmpassword.value;
    if(pass1!==pass2){
        alert("Password Doesn't Match")
        return;
    }
    

    }
    catch(error){
        alert('Error')
        console.log(error);
    }

} 