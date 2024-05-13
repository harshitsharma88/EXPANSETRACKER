
const ul = document.querySelector('ul');
const token=localStorage.getItem('token');
let ispremium =false;


window.onload=getAll;


function getAll() {
    
    
    axios.get('http://localhost:4000/expanse/get-expanse',{headers:{Authorazation:token}})
    .then(result=>{
        console.log(result.data.premium);
        if(result.data.premium){
            ispremium=true;
           premiumContent();
        }
        result.data.response.forEach(element => {
            display(element);
        });
    })
    
}



function handleAddExpanse(event){
    event.preventDefault();
    const expanseObj={
        category:event.target.category.value,
        amount:event.target.amount.value,
        description:event.target.description.value,
    }
    axios.post('http://localhost:4000/expanse/add-expanse',expanseObj,{headers:{Authorazation:token}})
    .then(result=>{
        event.target.category.value="None"
        event.target.amount.value=""
        event.target.description.value=""
        console.log(result.data);
        display(result.data);
       
    })
}


 
function display(object){
const li= document.createElement('li');
li.textContent=`${object.amount} - ${object.category} - ${object.description} `
const deletebtn= document.createElement('button');
deletebtn.textContent= "Delete";

deletebtn.addEventListener('click',async()=>{
    try{

const result=await axios({
    method:'delete',
    url:'http://localhost:4000/expanse/delete-expanse',
    data:object,
    headers:{Authorazation:token}})

    console.log(result.data);
    deletebtn.parentElement.remove();
    }
    catch(error){
        console.log(error);
    }

})

li.appendChild(deletebtn);
ul.appendChild(li);

}

document.querySelector('#rzrbtn').onclick=async (e)=>{

    try {
        const response = await axios.get('http://localhost:4000/purchase/premiummembership',{headers:{Authorazation:token}});
        const options={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async (rzpresponse)=>{
                premiumContent();

                const res=await axios.post('http://localhost:4000/purchase/updatepremium',{
                    orderid:options.order_id,
                    paymentid:rzpresponse.razorpay_payment_id

                },{headers:{Authorazation:token}});
                console.log(res.data.message);
                localStorage.setItem('token',res.data.token);
                ispremium=true
            
                alert("You are a Premium User Now");

                

            }
        } 
        
    const rzp= new Razorpay(options);
    rzp.open();
    e.preventDefault();
    rzp.on('payment.failed',async(issue)=>{
        console.log(issue);
        await axios.post('http://localhost:4000/purchase/failedpremium',{orderid:options.order_id,});
    alert('Something Went Wrong')
    })
        
    } 
    catch (error) {
        
    }

}

function premiumContent(){
    try {
        document.querySelector('#rzrbtn').remove();
        let html=`You are a Premium User <button id="showleaderboard" type="button">Show LeaderBoard</button>`;

        document.querySelector('#premium').innerHTML=html;
        const leaderbtn= document.querySelector('#showleaderboard');
        leaderbtn.addEventListener('click',leaderboardreport)
        
    } catch (error) {
        
    }
}

async function leaderboardreport(){
    try {
        const response = await axios.get('http://localhost:4000/premium/showleaderboard');
        const leaderboard= document.querySelector('#leaderboard');
        let html="<h1>Leaderoard</h1>"
        response.data.forEach(ele=>{
            html+=`<li><b>Name-</b> ${ele.name} <b>Amount-</b> ${ele.totalexpanse}`
        })
        leaderboard.innerHTML=html;

        
    } catch (error) {
        alert("Error")
        console.log(error);
    }
    

}

document.querySelector('#reportbtn').addEventListener('click',downloadReport);


async function downloadReport(){
    // if(!ispremium){
    //     alert('Buy Premium to access This Feature')
    //     return;
    // }
    
    try {
        
        const response = await axios.get('http://localhost:4000/premium/downloadreport',{headers:{Authorazation:token}});
        console.log(response);
        location.href=response.data.url;

        
    } catch (error) {
        alert(error)
        console.log(error);
        
    }

}
