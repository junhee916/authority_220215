const BearerToken = `Bearer ${localStorage.getItem("token")}`
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const userID = urlParams.get("userID")
$(document).ready(function(){
    $.ajax({
        type : "GET",
        url : `/authority/${userID}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('authority data 확인: ', response)
            const authority = response["authorityData"]
            if(authority == null){
                const temp =
                `
                <input type="button" value="초기 셋팅" onclick="saveAuthority()">
                `
                $("#authorityStart").append(temp)
            }
            else{
                const ABI_YN = (authority["ABI"] == "Y")?
                ` 
                <td class="table-td depth-list"><input type="checkbox" name="ABI" value="Y" checked  onclick='ABIOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="ABI" value="N" onclick='ABIOnlyOne(this)'></td>
                `
                :
                `
                <td class="table-td depth-list"><input type="checkbox" name="ABI" value="Y" onclick='ABIOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="ABI" value="N" checked onclick='ABIOnlyOne(this)'></td>
                `
                const DWTH_YN = (authority["DWTH"] == "Y")?
                ` 
                <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="Y" checked onclick='DWTHOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="N" onclick='DWTHOnlyOne(this)'></td>
                `
                :
                `
                <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="Y" onclick='DWTHOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="N" checked onclick='DWTHOnlyOne(this)'></td>
                `
                const ATAB_YN = (authority["ATAB"] == "Y")?
                ` 
                <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="Y" checked onclick='ATABOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="N" onclick='ATABOnlyOne(this)'></td>
                `
                :
                `
                <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="Y" onclick='ATABOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="N" checked onclick='ATABOnlyOne(this)'></td>
                `
                const CDI_YN = (authority["CDI"] == "Y")?
                ` 
                <td class="table-td depth-list"><input type="checkbox" name="CDI" value="Y" checked onclick='CDIOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="CDI" value="N" onclick='CDIOnlyOne(this)'></td>
                `
                :
                `
                <td class="table-td depth-list"><input type="checkbox" name="CDI" value="Y" onclick='CDIOnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="CDI" value="N" checked onclick='CDIOnlyOne(this)'></td>
                `
                const SAR_YN = (authority["SAR"] == "Y")?
                ` 
                <td class="table-td depth-list"><input type="checkbox" name="SAR" value="Y" checked onclick='SAROnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="SAR" value="N" onclick='SAROnlyOne(this)'></td>
                `
                :
                `
                <td class="table-td depth-list"><input type="checkbox" name="SAR" value="Y" onclick='SAROnlyOne(this)'></td>
                <td class="table-td depth-list"><input type="checkbox" name="SAR" value="N" checked onclick='SAROnlyOne(this)'></td>
                `
                const htmlTemp = 
                `
				<div class="table-responsive">
					<div class="col">
						<span id="autoCall" onclick="allSelect()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두해제</span>
						<span id="autoCall" onclick="allDelete()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두선택</span>
					</div>
					<table>
						<thead>
							<tr>
								<th>업무구분</th>
								<th>상세구분</th>
								<th colspan="2">권한여부</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="table-td depth-list"></td>
								<td class="table-td depth-list txt-left">계좌 잔액조회</td>
                                ${ABI_YN}
							</tr>
							<tr>
								<td class="table-td depth-list"></td>
								<td class="table-td depth-list txt-left">입출금 거래내역</td>
                                ${DWTH_YN}
							</tr>
							<tr>
								<td class="table-td depth-list"></td>
								<td class="table-td depth-list txt-left">당타행 계좌이체</td>
                                ${ATAB_YN}
							</tr>
							<tr>
								<td class="table-td depth-list"></td>
								<td class="table-td depth-list txt-left">카드 내역조회</td>
                                ${CDI_YN}
							</tr>
							<tr>
								<td class="table-td depth-list"></td>
								<td class="table-td depth-list txt-left">서버 인증등록</td>
                                ${SAR_YN}
							</tr>
						</tbody>
					</table>
				</div>
                `
                $("#authorityHtml").append(htmlTemp)
                const buttonTemp =
                `
                <a href="#" class="btn btn-d btn-lg bt-gray-bottom" data-toggle="modal" data-target="#register">목록</a>
                <a onclick="changeAuthority()" class="btn btn-d btn-lg bt-yellow-bottom">정보변경</a>
                `
                $('#buttonLayout').append(buttonTemp)
            }
        }
    })
})
function saveAuthority(){
    $.ajax({
        type : "POST",
        url : `/authority/save/${userID}`,
        headers : {
            authorization : BearerToken
        },
        data : {
            ABI : "N",
            DWTH : "N",
            ATAB : "N",
            CDI : "N",
            SAR : "N"
        },
        success : function(response){
            if(response){
                alert("권한 부여 준비 완료되었습니다.")
                window.location.href=`/setUserAuthority?userID=${userID}`
            }
            else{
                alert("다시 시도해주시길 바랍니다.")
            }
        }
    })
}
function changeAuthority(){
    /*
    * check push 방식
    const obj_length = document.getElementsByName("authority").length;
    const searchArray = [];
    for(let i=0; i<obj_length; i++){
        const array = {}
        if(document.getElementsByName("authority")[i].checked == true){
            array["data"] = document.getElementsByName("authority")[i].value
            searchArray.push(array)
            console.log('authority arr 확인: ', searchArray)
        }
    }
    console.log('최종 authority arr 확인: ', searchArray)
    */
    const ABI_YN = $("[name = ABI]:checked").val()
    const DWTH_YN = $("[name = DWTH]:checked").val()
    const ATAB_YN = $("[name = ATAB]:checked").val()
    const CDI_YN = $("[name = CDI]:checked").val()
    const SAR_YN = $("[name = SAR]:checked").val()
    $.ajax({
        type : "POST",
        url : `/authority/update/${userID}`,
        headers : {
            authorization : BearerToken
        },
        data : {
            ABI : ABI_YN,
            DWTH : DWTH_YN,
            ATAB : ATAB_YN,
            CDI : CDI_YN,
            SAR : SAR_YN
        },
        success : function(response){
            if(response){
                alert("사용자 권한 설정이 완료되었습니다.")
                window.location.href=`/setUserAuthority?userID=${userID}`
            }
        }
    })
}
function ABIOnlyOne(element) {
    const checkboxes = document.getElementsByName("ABI");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function DWTHOnlyOne(element) {
    const checkboxes = document.getElementsByName("DWTH");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function ATABOnlyOne(element) {
    const checkboxes = document.getElementsByName("ATAB");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function CDIOnlyOne(element) {
    const checkboxes = document.getElementsByName("CDI");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function SAROnlyOne(element) {
    const checkboxes = document.getElementsByName("SAR");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    })
    element.checked = true;
}
function allSelect(){
    $("#authorityHtml").empty()
    const temp = 
                `
                <div class="table-responsive">
                <div class="col">
                    <span id="autoCall" onclick="allSelect()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두선택</span>
                    <span id="autoCall" onclick="allDelete()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두해제</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>업무구분</th>
                            <th>상세구분</th>
                            <th colspan="2">권한여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">계좌 잔액조회</td>
                            <td class="table-td depth-list"><input type="checkbox" name="ABI" value="Y" checked  onclick='ABIOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="ABI" value="N" onclick='ABIOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">입출금 거래내역</td>
                            <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="Y" checked onclick='DWTHOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="N" onclick='DWTHOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">당타행 계좌이체</td>
                            <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="Y" checked onclick='ATABOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="N" onclick='ATABOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">카드 내역조회</td>
                            <td class="table-td depth-list"><input type="checkbox" name="CDI" value="Y" checked onclick='CDIOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="CDI" value="N" onclick='CDIOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">서버 인증등록</td>
                            <td class="table-td depth-list"><input type="checkbox" name="SAR" value="Y" checked onclick='SAROnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="SAR" value="N" onclick='SAROnlyOne(this)'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
                `
                $("#authorityHtml").append(temp)
}
function allDelete(){
    $("#authorityHtml").empty()
    const temp = 
                `
                <div class="table-responsive">
                <div class="col">
                    <span id="autoCall" onclick="allSelect()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두해제</span>
                    <span id="autoCall" onclick="allDelete()" class="btn btn-d btn-lg bt-yellow-bottom" style="text-align:right;float:right;font-weight:bold;">모두선택</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>업무구분</th>
                            <th>상세구분</th>
                            <th colspan="2">권한여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">계좌 잔액조회</td>
                            <td class="table-td depth-list"><input type="checkbox" name="ABI" value="Y" onclick='ABIOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="ABI" value="N" checked onclick='ABIOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">입출금 거래내역</td>
                            <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="Y" onclick='DWTHOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="DWTH" value="N" checked onclick='DWTHOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">당타행 계좌이체</td>
                            <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="Y" onclick='ATABOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="ATAB" value="N" checked onclick='ATABOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">카드 내역조회</td>
                            <td class="table-td depth-list"><input type="checkbox" name="CDI" value="Y" onclick='CDIOnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="CDI" value="N" checked onclick='CDIOnlyOne(this)'></td>
                        </tr>
                        <tr>
                            <td class="table-td depth-list"></td>
                            <td class="table-td depth-list txt-left">서버 인증등록</td>
                            <td class="table-td depth-list"><input type="checkbox" name="SAR" value="Y" onclick='SAROnlyOne(this)'></td>
                            <td class="table-td depth-list"><input type="checkbox" name="SAR" value="N" checked onclick='SAROnlyOne(this)'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
                `
                $("#authorityHtml").append(temp)
}
