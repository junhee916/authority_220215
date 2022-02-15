const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/bank/getMpa`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('mpas data 확인: ',response["mpasData"])
            const mpas = response["mpasData"]
            for(const mpa of mpas){
                const NUM = mpa["id"]
                const COMPANY = mpa["COMPANY"]
                const updatedAt = moment(mpa["updatedAt"]).format('YYYY-MM-DD HH:mm:ss')
                const BANK = (mpa["BANK"]=="Y")?"완료":(mpa["BANK"]=="W")?"진행중":"취소"
                const temp = 
                `
                <tr>
                    <td>${NUM}</td>
                    <td>${COMPANY}</td>
                    <td>${updatedAt}</td>
                    <td>${BANK}</td>
                    <td>
                        <a href="/bankShow?mpaNum=${NUM}">상세</a>    
                    </td>
                </tr>
                `
                $("#companyView").append(temp)
            }

        }
    })
})