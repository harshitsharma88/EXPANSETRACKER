
const table = document.querySelector('table');
const token = localStorage.getItem('token');
let ispremium = false;
let currentpage =1;
let itemsperpage = document.querySelector('#perpage').value;
let firstpage = document.querySelector('#firstpage');
let lastpage = document.querySelector('#lastpage');
let navbtns = document.querySelector('#nav-btns');
let totalpages = 0;
const sidebar = document.querySelector(".report-prem-btn");

window.onload=getAll;

document.querySelector('#username').textContent = localStorage.getItem('username');

document.querySelector("#logoutbtn").addEventListener('click',(event)=>{
    localStorage.clear();
    location.replace("http://54.144.79.95")
})
document.querySelector("#opensidebar").addEventListener('click',(event)=>{
    
    sidebar.style.width = "13%";
})

document.querySelector("#closesidebar").addEventListener('click',(event)=>{
    
    sidebar.style.width = "0";

})

const leaderbtn= document.querySelector('#leaderboardbtn');
leaderbtn.addEventListener('click',leaderboardreport);





document.querySelector('#firstpage').addEventListener('click',()=>{
    if(currentpage===1){
        return;
    }
    table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
    currentpage=1;
    getAll();
})

document.querySelector('#lastpage').addEventListener('click',()=>{
    if(currentpage===totalpages){
        return;
    }
    table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
    currentpage=totalpages;
    getAll();
})

document.querySelector('#previous').addEventListener('click',()=>{
    
    if(currentpage>1){
        table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
        currentpage=currentpage-1;
        getAll();
    }
})

document.querySelector('#next').addEventListener('click',()=>{
    
    if(currentpage<totalpages){
        table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
        currentpage=currentpage+1;
        getAll();
    }
})

function changeItems(){
    itemsperpage= document.querySelector('#perpage').value;
    table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'

    getAll();

}


async function getAll() {

    try {


        const result = await axios.get(`http://54.144.79.95/expanse/get-expanse/${itemsperpage}/${currentpage}`,{headers:{Authorazation:token}})
        console.log(result.data.premium);
        console.log(currentpage);
        if(result.data.premium){
            ispremium=true;
           premiumContent();
        }
        result.data.response.forEach(element => {
            display(element);
        });
        totalpages=result.data.totalpages
        
        if(totalpages===0){
            firstpage.textContent=0;
            navbtns.innerHTML='';
            lastpage.textContent=0;
            
        }
        else{
            navButtons(result.data.totalpages);
        }

        
        
    } catch (error) {

        alert(error.response.data)
        
    }
    
    
    
    
}

function navButtons(totalpages){
    firstpage.textContent=1;
    lastpage.textContent=totalpages;
    navbtns.innerHTML='';
    if(totalpages>0){
        if(totalpages===1){
            navbtns.innerHTML=`<button class='skip'>1</button>`
        }
        else if(totalpages===2){
            navbtns.innerHTML='';

            const btn1= document.createElement('button');
            btn1.textContent=1;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.textContent=2;
            btn2.className='skip';
            btn2.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
        }
        else{
            if(currentpage>totalpages-2){
            navbtns.innerHTML='';
            const btn1= document.createElement('button');
            btn1.textContent=totalpages-2;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.textContent=totalpages-1;
            btn2.className='skip';
            btn2.addEventListener('click',navbtnListenner);
            const btn3= document.createElement('button');
            btn3.textContent=totalpages;
            btn3.className='skip';
            btn3.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
            navbtns.appendChild(btn3);


            }
        
            else{
            navbtns.innerHTML='';
            const btn1= document.createElement('button');
            btn1.textContent=currentpage;
            btn1.className='skip';
            btn1.addEventListener('click',navbtnListenner);
            const btn2= document.createElement('button');
            btn2.className='skip';
            btn2.textContent=currentpage+1;
            btn2.addEventListener('click',navbtnListenner);
            const btn3= document.createElement('button');
            btn3.className='skip';
            btn3.textContent=currentpage+2;
            btn3.addEventListener('click',navbtnListenner);
            navbtns.appendChild(btn1);
            navbtns.appendChild(btn2);
            navbtns.appendChild(btn3);

        }

        }

    }
}

function navbtnListenner(event){
    let shiftpage = parseInt(event.target.textContent);
    if(shiftpage==currentpage){
        return;
    }
    currentpage=shiftpage;
    table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
    getAll();
    
}



async function handleAddExpanse(event){
    event.preventDefault();
    
    try {
        const expanseObj={
            category:event.target.category.value,
            amount:event.target.amount.value,
            description:event.target.description.value,
        }

        const result= await axios.post('http://54.144.79.95/expanse/add-expanse',expanseObj,{headers:{Authorazation:token}});
        event.target.category.value="None"
        event.target.amount.value=""
        event.target.description.value=""
       
        table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
        getAll();
        
    } catch (error) {
        console.log(error);
        alert(error);
        
    }
    

        
   
}


 
function display(object){
    const tr= document.createElement('tr');
    tr.className='expenserecordtr'
    tr.innerHTML=`<td>${object.category}</td><td>${object.amount}</td><td>${object.description}</td>`
    const deletebtn= document.createElement('button');
    deletebtn.textContent= "Delete";
    deletebtn.className='delexpnse';

    deletebtn.addEventListener('click',async()=>{
        try{

    const result=await axios({
    method:'delete',
    url:'http://54.144.79.95/expanse/delete-expanse',
    data:object,
    headers:{Authorazation:token}})

    console.log(result.data);
    table.innerHTML='<tr><th>Category</th><th>Amount</th><th>Description</th></tr>'
    getAll();
    deletebtn.parentElement.remove();

    }

    catch(error){
        console.log(error);
    }

})

tr.appendChild(deletebtn);
table.appendChild(tr);

}

document.querySelector('#rzrbtn').onclick=async (e)=>{

    try {
        const response = await axios.get('http://54.144.79.95/purchase/premiummembership',{headers:{Authorazation:token}});
        const options={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async (rzpresponse)=>{
                premiumContent();

                const res=await axios.post('http://54.144.79.95/purchase/updatepremium',{
                    orderId:options.order_id,
                    paymentId:rzpresponse.razorpay_payment_id

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
        await axios.post('http://54.144.79.95/purchase/failedpremium',{orderId:options.order_id,});
    alert('Something Went Wrong')
    })
        
    } 
    catch (error) {

        console.log(error);
        
        
    }

}

function premiumContent(){
    try {
        const usernameDiv= document.querySelector('#username');
        const img = document.createElement('img');
        img.className = 'premiumImage';
        img.src="https://upload.wikimedia.org/wikipedia/commons/8/81/Twitter_Verified_Badge_Gold.svg";
        usernameDiv.appendChild(img);
        
    } catch (error) {

        console.log(error);
        
    }
}

async function leaderboardreport(){
    try {
        if(!ispremium){
            alert("Buy Premium to access this Feature");
            return;

        }
        const response = await axios.get('http://54.144.79.95/premium/showleaderboard');
        sidebar.style.width="0";
        const leaderboard= document.querySelector('#leaderboard');
        let html="<h1>Leaderoard</h1>"
        response.data.forEach(ele=>{
            html+=`<li class='leadli'><b class='leadname'>Name-</b> ${ele.name} <b class='leadname'>Amount-</b> ${ele.totalexpanse}`
        })
        leaderboard.innerHTML=html;

        
    } catch (error) {
        alert("Error")
        console.log(error);
    }
    

}

document.querySelector('#reportbtn').addEventListener('click',downloadReport);


async function downloadReport(){
    if(!ispremium){
        alert('Buy Premium to access This Feature')
        return;
    }
    
    try {
        
        const response = await axios.get('http://54.144.79.95/premium/downloadreport',{headers:{Authorazation:token}});
        console.log(response);
        location.href=response.data.url;

        
    } catch (error) {
        alert(error)
        console.log(error);
        
    }

}
