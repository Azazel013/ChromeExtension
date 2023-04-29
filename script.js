let myLeads=[];

const inputEl=document.getElementById("input-el");
const inputBtn=document.getElementById("input-btn");
const ulEl=document.getElementById("ul-el");
const clearBtn=document.getElementById("clear-btn");
const tabBtn=document.getElementById("tab-btn");

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads)
}

tabBtn.addEventListener("click",()=>{
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myleads',JSON.stringify(myLeads))
        render(myLeads);
    })

  
})


function render(leads){ 
    let listItems="";
    for(let i=0; i<leads.length; i++){
        
       listItems +=`   
            <li>
                <a target='_blank' href='https://${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
       
    }
    ulEl.innerHTML=listItems
}   

clearBtn.addEventListener("dblclick",()=>{
    localStorage.clear();
    myLeads="";
    ulEl.textContent="";
    render();
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value); 
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render( myLeads);   
})



