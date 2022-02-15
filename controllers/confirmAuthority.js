const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/authority/check`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('user authority 확인: ', response)
            const authorityData = response["authorityData"]
            const user = authorityData["user"]
            const mpaAuthority = getAuthorityMpa(user)
            console.log(mpaAuthority)
            const ConfirmABI = document.getElementById("ABI")
            const ConfirmDWTH = document.getElementById("DWTH")
            const ConfirmATAB = document.getElementById("ATAB")
            const ConfirmCDI = document.getElementById("CDI")
            const ConfirmSAR = document.getElementById("SAR")
            // view authority yn 
            $("#ABI_YN").text(authorityData["ABI"])
            $("#DWTH_YN").text(authorityData["DWTH"])
            $("#ATAB_YN").text(authorityData["ATAB"])
            $("#CDI_YN").text(authorityData["CDI"])
            $("#SAR_YN").text(authorityData["SAR"])
            // click event authority
            ConfirmABI.addEventListener("click", function(){
                if(authorityData["ABI"] == "Y"){
                    setTimeLoginCheck()
                    alert("계좌 잔액조회 권한 대상")
                }
                else{
                    alert("계좌 잔액조회 권한 비대상")
                }
            })
            ConfirmDWTH.addEventListener("click", function(){
                if(authorityData["DWTH"] == "Y"){
                    setTimeLoginCheck()
                    alert("입출금 거래내역 권한 대상")
                }
                else{
                    alert("입출금 거래내역 권한 비대상")
                }
            })
            ConfirmATAB.addEventListener("click", function(){
                if(authorityData["ATAB"] == "Y"){
                    setTimeLoginCheck()
                    alert("당타행 계좌이체 권한 대상")
                }
                else{
                    alert("당타행 계좌이체 권한 비대상")
                }
            })
            ConfirmCDI.addEventListener("click", function(){
                if(authorityData["CDI"] == "Y"){
                    setTimeLoginCheck()
                    alert("카드 내역조회 대상")
                }
                else{
                    alert("카드 내역조회 비대상")
                }
            })
            ConfirmSAR.addEventListener("click", function(){
                if(authorityData["SAR"] == "Y"){
                    setTimeLoginCheck()
                    alert("서버 인증등록 대상")
                }
                else{
                    alert("서버 인증등록 비대상")
                }
            })
        }
    })
})
function getAuthorityMpa(userId){
    $.ajax({
        type : "GET",
        url : `/mpa/getAuthorityMpa/${userId}`,
        success : function(response){
            if(response["mpaData"] != null){
                const ConfirmABI = document.getElementById("ABI")
                const ConfirmDWTH = document.getElementById("DWTH")
                const ConfirmATAB = document.getElementById("ATAB")
                const ConfirmCDI = document.getElementById("CDI")
                const ConfirmSAR = document.getElementById("SAR")
            }
        }
    })
}
function getHoursLabel(){
   var hours = new Date().getHours();
   return hours
}
function setTimeLoginCheck(){
    $.ajax({
        type : "GET",
        url : `/setTimeLogin/confirmAuthority`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log(response["setTimeLoginData"])
            const setTimeLoginData = response["setTimeLoginData"]
            const STARTTIME = setTimeLoginData["STARTTIME"]
            const ENDTIME = setTimeLoginData["ENDTIME"]
            if(STARTTIME<=getHoursLabel() && ENDTIME>getHoursLabel()){
                if(setTimeLoginData["MON"] == "Y" && getTodayLabel() == "MON"){
                    alert("월요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["TUES"] == "Y" && getTodayLabel() == "TUES"){
                    alert("화요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["WEDNES"] == "Y" && getTodayLabel() == "WEDNES"){
                    alert("수요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["THURS"] == "Y" && getTodayLabel() == "THURS"){
                    alert("목요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["FRI"] == "Y" && getTodayLabel() == "FRI"){
                    alert("금요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["SATUR"] == "Y" && getTodayLabel() == "SATUR"){
                    alert("토요일은 로그인 가능 날짜입니다.")
                }
                else if(setTimeLoginData["SUN"] == "Y" && getTodayLabel() == "SUN"){
                    alert("일요일은 로그인 가능 날짜입니다.")
                }
                else{
                    alert("접속 날짜가 아닙니다.")
                    window.location.href='/userLogin'
                }
            }
            else{
                alert("접속 가능한 시간대가 아닙니다. 접속 가능한 시간대에 다시 접속 바랍니다.")
                window.location.href='/userLogin'
            }
        }
    })
}
