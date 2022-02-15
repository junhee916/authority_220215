const mpaSignupBtn = document.getElementById("mpaSignupBtn")
mpaSignupBtn.addEventListener("click", function(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    const COMPANY = $("#COMPANY").val()
    const ADDRESS = $("#ADDRESS").val()
    const DAYACCOUNT = $("#DAYACCOUNT").val()
    const FIRSTACCOUNT = $("#FIRSTACCOUNT").val()
    $.ajax({
    type : "POST",
    url : "/mpa/signup",
    data : {
        ID : ID,
        password : password,
        COMPANY : COMPANY,
        ADDRESS : ADDRESS,
        DAYACCOUNT : DAYACCOUNT,
        FIRSTACCOUNT : FIRSTACCOUNT,
    },
    success : function(response){
        window.location.href="/mpaLogin"
    }
})
})