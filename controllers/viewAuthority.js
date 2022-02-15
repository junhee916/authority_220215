const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $("#searchTimeView").empty()
    $("#searchTimeView").text(getHoursLabel())
    getAllSearchUser()
})
function getHoursLabel(){
    var date = new Date();
    let date_update = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return date_update
}
function AllSelectUser(element) {
    const checkboxes = document.getElementsByName("searchUser");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function setForm(){
    $("#viewUserData").empty()
    const htmlTemp = 
    `
    <tr>
        <th>선택</th>
        <th>번호</th>
        <th>상태</th>
        <th>ID</th>
        <th>사용자명</th>
        <th>부서명</th>
        <th>직위</th>
        <th>1일이체한도</th>
        <th>1회이체한도</th>
        <th>메뉴권한설정</th>
        <th>사용자</th>
    </tr>
    `
    $("#viewUserData").append(htmlTemp)
}
function getAllSearchUser(){
    setForm()
    $.ajax({
        type : "GET",
        url : '/user/getAuthority',
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('user get authority 확인: ', response)
            const users = response["userData"]
            for(const user of users){
                const NUM = user["_id"]["NUM"]
                const ID = user["_id"]["ID"]
                const NAME = user["_id"]["NAME"]
                const DEPARTMENT = user["_id"]["DEPARTMENT"]
                const SPOT = user["_id"]["SPOT"]
                const DAYKRW = user["_id"]["DAYKRW"]
                const TIMEKRW = user["_id"]["TIMEKRW"]
                const AUTHORITY = user["authorities_docs"].length==0?"X":"O"
                const temp = 
                `
                <tr id="viewUserData">
                    <td class="table-td depth-list"><input type="checkbox" name="checkinp" id="check01"></td>
                    <td class="table-td depth-list">${NUM}</td>
                    <td class="table-td depth-list txt-left">정상</td>
                    <td class="table-td depth-list">${ID}</td>
                    <td class="table-td depth-list">${NAME}</td>
                    <td class="table-td depth-list">${DEPARTMENT}</td>
                    <td class="table-td depth-list">${SPOT}</td>
                    <td class="table-td depth-list">${DAYKRW}</td>
                    <td class="table-td depth-list">${TIMEKRW}</td>
                    <td class="table-td depth-list">${AUTHORITY}</td>
                    <td class="table-td depth-list">결재</td>
                </tr>
                `
                $("#viewUserData").append(temp)
            }
        }
    })
}
