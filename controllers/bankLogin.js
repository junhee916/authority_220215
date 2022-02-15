const bankLoginBtn = document.getElementById("bankLoginBtn")
bankLoginBtn.addEventListener("click", function(){
    const BANK = $("#BANK").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : `/bank/login`,
        data : {
            BANK : BANK,
            password : password
        },
        success : function(response){
            console.log('response 전달 확인: ', response)
            let token = response.token
            console.log("token set 확인: ", token)
            localStorage.setItem("token", token)
            location.href = '/checkBank'
        }
    })
})