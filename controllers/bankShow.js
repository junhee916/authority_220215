const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const NUM = urlParams.get("mpaNum")
const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/bank/getDetailMpa/${NUM}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('get detail mpa: ', response["mpaData"])
            const mpa = response["mpaData"]
            const NUM = mpa["_id"]
            const COMPANY = mpa["COMPANY"]
            const BANK = (mpa["BANK"]=="Y")?"완료":(mpa["BANK"]=="W")?"진행중":"취소"
            const updatedAt = moment(mpa["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
            $("#NUM").text(NUM)
            $("#COMPANY").text(COMPANY)
            $("#updatedAt").text(updatedAt)
            $("#BANK").text(BANK)
            if(BANK == "완료"){
                getBankUser(COMPANY)
            }
            else{
                const temp =
                `
                USER 정보를 불러올 수 없습니다.
                `
                $("#userView").text(temp)
            }
        }
    })
})
function getBankUser(company){
    $.ajax({
        type : "GET",
        url : `/bank/getUser/${company}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('user 정보 확인', response["usersData"])
            const users = response["usersData"]
            for(const user of users){
                const NUM = user["_id"]
                const COMPANY = user["COMPANY"]
                const ID = user["ID"]
                const NAME = user["NAME"]
                const DEPARTMENT = user["DEPARTMENT"]
                const SPOT = user["SPOT"]
                const updatedAt = moment(user["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
                const BANK = (user["BANK"]=="Y")?"완료":(user["BANK"]=="W")?"진행중":"취소"
                const htmlTemp =
                `
                <tr>
                    <td>
                        <a href="/bankUserShow?userNum=${NUM}">${NUM}</a>
                    </td>
                    <td>${COMPANY}</td>
                    <td>${ID}</td>
                    <td>${NAME}</td>
                    <td>${DEPARTMENT}</td>
                    <td>${SPOT}</td>
                    <td>${updatedAt}</td>
                    <td id="Bank_YN">${BANK}</td>
                </tr>
                `
                $("#userView").append(htmlTemp)
            }
        }
    })
}
const addBankAuthority = document.getElementById("addBankAuthority")
addBankAuthority.addEventListener("click", function(){
    $.ajax({
        type : "POST",
        url : `/bank/updateBank/${NUM}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("BANK authority 등록 완료되었습니다.")
                window.location.href=`/bankShow?mpaNum=${NUM}`
            }
        }
    })
})
const deleteBankAuthority = document.getElementById("deleteBankAuthority")
deleteBankAuthority.addEventListener("click", function(response){
    $.ajax({
        type : "POST",
        url : `/bank/canselBank/${NUM}`,
        data : {
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("BANK authority 취소 완료되었습니다.")
                window.location.href=`/bankShow?mpaNum=${NUM}`
            }
        }
    })
})