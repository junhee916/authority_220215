const userSignupBtn = document.getElementById("userSignupBtn")
userSignupBtn.addEventListener("click", function(){
    const COMPANY = $("#COMPANY").val()
    const ID = $("#ID").val()
    const password = $("#password").val()
    const NAME = $("#NAME").val()
    const DEPARTMENT = $("#DEPARTMENT").val()
    const SPOT = $("#SPOT").val()
    $.ajax({
    type : "POST",
    url : "/user/signup",
    data : {
        COMPANY : COMPANY,
        ID : ID,
        password : password,
        NAME : NAME,
        DEPARTMENT : DEPARTMENT,
        SPOT : SPOT
    },
    success : function(response){
        alert("USER 회원가입이 완료되었습니다.")
        window.location.href="/userLogin"
    }
})
})