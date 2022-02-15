const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const NUM = urlParams.get("userNum")
const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/bank/getDetailUser/${NUM}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('get detail user: ', response["userData"])
            const user = response["userData"]
            const NUM = user["_id"]
            const COMPANY = user["COMPANY"]
            const ID = user["ID"]
            const NAME = user["NAME"]
            const DEPARTMENT = user["DEPARTMENT"]
            const SPOT = user["SPOT"]
            const updatedAt = moment(user["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
            const BANK = (user["BANK"]=="Y")?"완료":(user["BANK"]=="W")?"진행중":"취소"
            $("#COMPANY").text(COMPANY)
            $("#NUM").text(NUM)
            $("#ID").text(ID)
            $("#NAME").text(NAME)
            $("#DEPARTMENT").text(DEPARTMENT)
            $("#SPOT").text(SPOT)
            $("#updatedAt").text(updatedAt)
            $("#BANK").text(BANK)
        }
    })
})
const addBankUserAuthority = document.getElementById("addBankUserAuthority")
addBankUserAuthority.addEventListener("click", function(){
    $.ajax({
        type : "POST",
        url : `/bank/updateUserBank/${NUM}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("USER authority 등록 완료되었습니다.")
                window.location.href=`/bankUserShow?userNum=${NUM}`
            }
        }
    })
})
const deleteBankUserAuthority = document.getElementById("deleteBankUserAuthority")
deleteBankUserAuthority.addEventListener("click", function(response){
    $.ajax({
        type : "POST",
        url : `/bank/canselBankUser/${NUM}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("USER authority 취소 완료되었습니다.")
                window.location.href=`/bankUserShow?userNum=${NUM}`
            }
        }
    })
})