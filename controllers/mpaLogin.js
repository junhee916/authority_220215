const mpaLoginBtn = document.getElementById("mpaLoginBtn")
mpaLoginBtn.addEventListener("click", function(){
    const ID = $("#ID").val()
    const password = $("#password").val()
    $.ajax({
        type : "POST",
        url : `/mpa/login`,
        data : {
            ID : ID,
            password : password
        },
        success : function(response){
            console.log('response 전달 확인: ', response["mpaInfo"])
            const BANK = response["mpaInfo"]["BANK"]
            if(BANK == "Y"){
                let token = response.token
                console.log("token set 확인: ", token)
                localStorage.setItem("token", token)
                location.href = '/viewAuthority'
            }
            else if(BANK == "W"){
                alert("심사중입니다.")
                window.location.href="/mpaLogin"
            }
            else{
                alert("권한이 없습니다.")
                window.location.href="/mpaLogin"
            }
        }
    })
})