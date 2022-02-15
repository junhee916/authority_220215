const BearerToken = `Bearer ${localStorage.getItem("token")}`
$(document).ready(function(){
    $("#DAYACCOUNT").empty()
    $("#FIRSTACCOUNT").empty()
    timeSelect()
    $.ajax({
        type : "GET",
        url : `/user`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('userData 확인: ', response["usersData"])
            const users = response["usersData"]
            for(const user of users){
                console.log('user 확인: ', user)
                const selectTemp = 
                `
                <option id="selectUser" val="${user["ID"]}">${user["ID"]}</option>
                `
                $("#userSelect").append(selectTemp)
            }

        }
    })
    $.ajax({
        type : "GET",
        url : `/mpa/mpaInfo`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log("mpa data 확인: ", response["mpaData"]["0"])
            const DAYACCOUNT = response["mpaData"]["0"]["DAYACCOUNT"]
            const FIRSTACCOUNT = response["mpaData"]["0"]["FIRSTACCOUNT"]
            const users = response["mpaData"]["0"]["user_docs"]
            var sumDKRW = 0;
            var sumTKRW = 0;
            for(const user of users){
                sumDKRW += user["DAYKRW"];
                sumTKRW += user["TIMEKRW"]
            }
            const remainDAYKRW = parseInt(DAYACCOUNT)-sumDKRW
            const remainTIMEKRW = parseInt(FIRSTACCOUNT)-sumTKRW
            console.log(remainDAYKRW,remainTIMEKRW)
            $("#DAYACCOUNT").text(DAYACCOUNT)
            $("#FIRSTACCOUNT").text(FIRSTACCOUNT)
            $("#remainDAYKRW").text(remainDAYKRW)
            $("#remainTIMEKRW").text(remainTIMEKRW)
        }
    })
})  
const selectUserMoveBtn = document.getElementById("selectUserMoveBtn")
selectUserMoveBtn.addEventListener("click", function(){
    const userSelectVal = $("[name = userSelect] option:selected").val() 
    console.log('userId', userSelectVal)
    $.ajax({
    type : "GET",
    url : `/user/${userSelectVal}`,
    headers : {
        authorization : BearerToken
    },
    success : function(response){
        console.log('detail get user data: ', response["userData"])
        const user = response["userData"]
        $("#NAME").text(user["NAME"])
        $("#DEPARTMENT").text(user["DEPARTMENT"])
        $("#SPOT").text(user["SPOT"])
        $("#DAYKRW").val(user["DAYKRW"])
        $("#DAYFOREIGN").val(user["DAYFOREIGN"])
        $("#TIMEKRW").val(user["TIMEKRW"])
        $("#TIMEFOREIGN").val(user["TIMEFOREIGN"])
    }
    }) 
    $.ajax({
    type : "GET",
    url : `/setTimeLogin/${userSelectVal}`,
    headers : {
        authorization : BearerToken
    },
    success : function(response){
        console.log('setTimeLogin 확인: ', response["setTimeLoginData"])
        const setTimeLoginResult = response["setTimeLoginData"]
        if(setTimeLoginResult == null){
            firstSetTime()
        }
        else{
            setTimeCtrl()
        }
    }
    }) 
})
function setTimeCtrl(){
    const userSelectVal = $("[name = userSelect] option:selected").val()
    $("#setMonCheck").empty()
    $("#setTuesCheck").empty()
    $("#setWednesCheck").empty()
    $("#setThursCheck").empty()
    $("#setFriCheck").empty()
    $("#setSaturCheck").empty()
    $("#setSunCheck").empty()
    $.ajax({
        type : "GET",
        url : `/setTimeLogin/checkTime/${userSelectVal}`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            console.log('setTimeCtrl 확인: ', response["setTimeLoginData"])
            const MON_Check = response["setTimeLoginData"]["MON"] == "Y"?
            `
            <input type="checkbox" name="MON" value="MON" checked>월
            `
            :
            `
            <input type="checkbox" name="MON" value="MON">월
            `
            const TUES_Check = response["setTimeLoginData"]["TUES"] == "Y"?
            `
            <input type="checkbox" name="TUES" value="TUES" checked>화
            `
            :
            `
            <input type="checkbox" name="TUES" value="TUES">화
            `
            const WEDNES_Check = response["setTimeLoginData"]["WEDNES"] == "Y"?
            `
            <input type="checkbox" name="WEDNES" value="WEDNES" checked>수
            `
            :
            `
            <input type="checkbox" name="WEDNES" value="WEDNES">수
            `
            const THURS_Check = response["setTimeLoginData"]["THURS"] == "Y"?
            `
            <input type="checkbox" name="THURS" value="THURS" checked>목
            `
            :
            `
            <input type="checkbox" name="THURS" value="THURS">목
            `
            const FRI_Check = response["setTimeLoginData"]["FRI"] == "Y"?
            `
            <input type="checkbox" name="FRI" value="FRI" checked>금
            `
            :
            `
            <input type="checkbox" name="FRI" value="FRI">금
            `
            const SATUR_Check = response["setTimeLoginData"]["SATUR"] == "Y"?
            `
            <input type="checkbox" name="SATUR" value="SATUR" checked>토
            `
            :
            `
            <input type="checkbox" name="SATUR" value="SATUR">토
            `
            const SUN_Check = response["setTimeLoginData"]["SUN"] == "Y"?
            `
            <input type="checkbox" name="SUN" value="SUN" checked>일
            `
            :
            `
            <input type="checkbox" name="SUN" value="SUN">일
            `
            $("#setMonCheck").append(MON_Check)
            $("#setTuesCheck").append(TUES_Check)
            $("#setWednesCheck").append(WEDNES_Check)
            $("#setThursCheck").append(THURS_Check)
            $("#setFriCheck").append(FRI_Check)
            $("#setSaturCheck").append(SATUR_Check)
            $("#setSunCheck").append(SUN_Check)
        }
    })
}
function timeSelect(){
    for(let i = 0; i<=24; i++){
        const htmlTemp = 
        `
        <option val=${i}>${i}</option>
        `
        $("#startTime").append(htmlTemp)
    }
    for(let i = 0; i<=24; i++){
        const htmlTemp = 
        `
        <option val=${i}>${i}</option>
        `
        $("#endTime").append(htmlTemp)
    }
}
const setAmtBtn = document.getElementById("setAmtBtn")
setAmtBtn.addEventListener("click", function(){
    $.ajax({
        type : "GET",
        url : `/user`,
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            var sumDKRW = 0;
            var sumTKRW = 0;
            //console.log('user account 확인: ', response["usersData"])
            const users = response["usersData"]
            for(user of users){
                //console.log('user account 확인: ', user["DAYKRW"])
                sumDKRW += user["DAYKRW"];
                sumTKRW += user["TIMEKRW"]
            }
            const dayAccount = $("#DAYACCOUNT").text()
            const firstAccount = $("#FIRSTACCOUNT").text()
            const DAYKRW = $("#DAYKRW").val()
            const TIMEKRW = $("#TIMEKRW").val()
            const SumDayKRW = sumDKRW + parseInt(DAYKRW)
            console.log('sumdaykrw: ', SumDayKRW)
            const SumTimeKRW = sumTKRW + parseInt(TIMEKRW)
            console.log('sumtimekrw: ', SumTimeKRW)
            if(dayAccount<SumDayKRW){
                alert("1일한도범위를 초과하셨습니다.")
                window.location.href = "/setting"
            }
            else if(firstAccount<SumTimeKRW){
                alert("1회 한도범위를 초과하셨습니다.")
                window.location.href = "/setting"
            }
            else{
                successUpdate()
                window.location.href = "/setting"
            }
        }
    })
})
function successUpdate(){
    const userSelectVal = $("[name = userSelect] option:selected").val()
    const DAYKRW = $("#DAYKRW").val()
    const DAYFOREIGN = $("#DAYFOREIGN").val()
    const TIMEKRW = $("#TIMEKRW").val()
    const TIMEFOREIGN = $("#TIMEFOREIGN").val()
    $.ajax({
        type : "POST",
        url : `/user/update/${userSelectVal}`,
        headers : {
            authorization : BearerToken
        },
        data : {
            DAYKRW : DAYKRW,
            DAYFOREIGN : DAYFOREIGN,
            TIMEKRW : TIMEKRW,
            TIMEFOREIGN : TIMEFOREIGN
        },
        success : function(response){
            if(response){
                alert("이체한도 설정 변경되었습니다.")
            }
            else{
                alert("다시 시도해주시길 바랍니다.")
            }
        }
    })
}
const userAuthorityBtn = document.getElementById("userAuthorityBtn")
userAuthorityBtn.addEventListener("click", function(){
    const userSelectVal = $("[name = userSelect] option:selected").val()
    window.location.href = `/setUserAuthority?userID=${userSelectVal}`
})

const setLoginBtn = document.getElementById("setLoginBtn")
setLoginBtn.addEventListener("click", function(){
    const startTime = $("[name = startTime] option:selected").val()
    const endTime = $("[name = endTime] option:selected").val()
    console.log('startTime 확인: ', startTime, 'endTime 확인: ', endTime)
    if(startTime == endTime){
        alert("시작과 마감시간이 동일할 수 없습니다. 다시 등록하시길 바랍니다.")
    }
    else if(parseInt(startTime)>parseInt(endTime)){
        alert("시작시간이 마감시간보다 클 수 없습니다. 다시 설정해주시길 바랍니다.")
    }
    else{
        saveSetLoginTime()
    }

})
function saveSetLoginTime(){
    const userSelectVal = $("[name = userSelect] option:selected").val() 
    const MON_Check = $("[name = MON]:checked").val()=="MON"?"Y":"N"
    const TUES_Check = $("[name = TUES]:checked").val()=="TUES"?"Y":"N"
    const WEDNES_Check = $("[name = WEDNES]:checked").val()=="WEDNES"?"Y":"N"
    const THURS_Check = $("[name = THURS]:checked").val()=="THURS"?"Y":"N"
    const FRI_Check = $("[name = FRI]:checked").val()=="FRI"?"Y":"N"
    const SATUR_Check = $("[name = SATUR]:checked").val()=="SATUR"?"Y":"N"
    const SUN_Check = $("[name = SUN]:checked").val()=="SUN"?"Y":"N"
    const startTime = $("[name = startTime] option:selected").val()
    const endTime = $("[name = endTime] option:selected").val()
    $.ajax({
        type : "POST",
        url : `/setTimeLogin/update/${userSelectVal}`,
        data : {
            MON : MON_Check,
            TUES : TUES_Check,
            WEDNES : WEDNES_Check,
            THURS : THURS_Check,
            FRI : FRI_Check,
            SATUR : SATUR_Check,
            SUN : SUN_Check,
            STARTTIME : startTime,
            ENDTIME : endTime
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert("업무 가능 요일 및 시간 변경 완료되었습니다.")
            }
            else{
                alert("업무 가능 요일 다시 확인바랍니다.")
            }
        }
    })
}
function firstSetTime(){
    const userSelectVal = $("[name = userSelect] option:selected").val() 
    $.ajax({
        type : "POST",
        url : `/setTimeLogin/save/${userSelectVal}`,
        data : {
            MON : 'N',
            TUES : 'N',
            WEDNES : 'N',
            THURS : 'N',
            FRI : 'N',
            SATUR : 'N',
            SUN : 'N',
            STARTTIME : 0,
            ENDTIME : 0
        },
        headers : {
            authorization : BearerToken
        },
        success : function(response){
            if(response){
                alert('업무가능요일 초기설정이 완료되었습니다.')
                setTimeCtrl()
            }
            else{
                alert('업무가능요일 초기설정이 실패하였습니다.')
            }
        }
    })
}
