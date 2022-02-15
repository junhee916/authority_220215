const mongoose = require('mongoose')
const modelSchema = mongoose.Schema(
    {
        user : {
            type : String,
            required : true
        },
        // 계좌 잔액조회
        ABI : {
            type : String
        },
        // 입출금 거래내역
        DWTH : {
            type : String
        },
        // 당타행 계좌이체
        ATAB : {
            type : String
        },
        // 카드 내역조회
        CDI : {
            type : String
        },
        // 서버 인증등록
        SAR : {
            type : String
        }
    },
    {
        timestamps : true
    }
)
module.exports = mongoose.model('authority', modelSchema)