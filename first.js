

var inp=document.getElementsByTagName("input");
var btn_submit=document.getElementById("btn-submit");
var span=document.getElementsByTagName("span");
var letters= /^[a-zA-Z]+$/;
var email=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

btn_submit.addEventListener("click",function(e){
    if(!letters.test(inp[0].value)){
        // console.log("hello");
        e.preventDefault();
        span[0].style.display="inline";
    }
    else{span[0].style.display="none"}
    if(!letters.test(inp[1].value)){
        e.preventDefault();
        span[1].style.display="inline";
    } else{span[1].style.display="none"}
    if(!email.test(inp[2].value)){
        e.preventDefault();
        span[2].style.display="inline";
    } else{span[2].style.display="none"}
    if(inp[3].value.length<8){
        e.preventDefault();
        span[3].style.display="inline";
    } else{span[3].style.display="none"}
    if(inp[4].value!=inp[3].value){
        e.preventDefault();
        span[4].style.display="inline";
    } else{span[4].style.display="none"}
    
    if(letters.test(inp[0].value)&&letters.test(inp[1].value)&&email.test(inp[2].value)&&inp[3].value.length>=8&&inp[4].value==inp[3].value){
    //    saveData();
    localStorage.setItem("First name",inp[0].value);
    localStorage.setItem("Last name",inp[1].value);
    localStorage.setItem("Email",inp[2].value);
    localStorage.setItem("Password",inp[3].value);
    window.close();

    }
   
   
})
// function saveData(){
//     var fname=inp[0].value;
//     var lname=inp[1].value;
//     var email=inp[2].value;
//     var password=inp[3].value;

//     var user_recorded=new Array();
//     user_recorded=JSON.parse(localStorage.getItem("users"))||[];
//     if(user_recorded.some((v)=>{
//         return v.email==email;
//     })){
//         console.log("hi");
//     }else{
//         user_recorded.push({
//             "First name":fname,
//             "Last name":lname,
//             "Email":email,
//             "Password":password
//         })
//         localStorage.setItem("users",JSON.stringify(user_recorded));
//     }
// }
// var res=localStorage.getItem("users").split(",")[3].split(":")[0];
// console.log(res);
