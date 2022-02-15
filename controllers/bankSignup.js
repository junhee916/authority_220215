const bankSignupBtn = document.getElementById("bankSignupBtn")
bankSignupBtn.addEventListener("click", function(){
    const BANK = $("#BANK").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : `/bank/signup`,
        data : {
            BANK : BANK,
            password : password
        },
        success : function(response){
            if(response){
                alert('BANK 회원가입이 완료되었습니다.')
                window.location.href="/bankLogin"
            }
            else{
                alert("회원가입이 실패하였습니다.")
                window.location.href="/bankSignup"
            }
        }
    })
})