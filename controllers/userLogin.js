const userLoginBtn = document.getElementById("userLoginBtn")
userLoginBtn.addEventListener("click", function(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : `/user/login`,
        data : {
            ID : ID,
            password : password
        },
        success : function(response){
            if(response){ 
                const BANK = response["userInfo"]["BANK"]
                if(BANK == "Y"){
                    console.log('response 전달 확인: ', response)
                    let token = response.token
                    console.log("token set 확인: ", token)
                    localStorage.setItem("token", token)
                    alert("로그인이 완료되었습니다.")
                    window.location.href = `/confirmAuth`
                }
                else if(BANK == "W"){
                    alert("심사중입니다.")
                    window.location.href="/userLogin"
                }
                else{
                    alert("권한이 없습니다.")
                    window.location.href="/userLogin"
                }
            }
            else{
                alert("아이디 및 비밀번호가 일치하지 않습니다. 다시 입력해주시기 바랍니다.")
                window.location.href = `/userLogin`
            }
        }
    })
})

