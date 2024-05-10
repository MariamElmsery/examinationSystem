
var btn_login = document.getElementById("btn-login");
var inp_login = document.getElementsByTagName("input");
var span_login = document.getElementsByTagName("span");

var emailStored=localStorage.getItem("Email");
var passwordStored=localStorage.getItem("Password");

btn_login.addEventListener("click", function (e) {
    
    if (inp_login[0].value != emailStored) {
        span_login[0].style.display = "inline";
        e.preventDefault();
    } else { span_login[0].style.display = "none"; }
    if (inp_login[1].value != passwordStored) {
        span_login[1].style.display = "inline";
        e.preventDefault();
    } else { span_login[1].style.display = "none"; }
    if (inp_login[0].value == emailStored && inp_login[1].value == passwordStored) {
        window.close();
    }


    // var user_recorded=new Array();
    // user_recorded=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
    // if(user_recorded.some((v)=>{
    //     return v.email==inp_login[0].value && v.password==inp_login[1].value;
    // })){
    //     let currentUser=user_recorded.filter((v)=>{
    //         return v.email=inp_login[0].value && v.password==inp_login[1].value;
    //     })[0]
    //     localStorage.setItem("First name",currentUser.)
    // }

})
