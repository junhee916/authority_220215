const mongoose = require('mongoose')
const modelSchema = mongoose.Schema(
    {
        user : {
            type : String,
            required : true
        },
        MON : {
            type : String
        },
        TUES : {
            type : String
        },
        WEDNES : {
            type : String
        },
        THURS : {
            type : String
        },
        FRI : {
            type : String
        },
        SATUR : {
            type : String
        },
        SUN : {
            type : String
        },
        STARTTIME : {
            type : Number
        },
        ENDTIME : {
            type : Number
        }
    },
    {
        timestamps : true
    }
)
module.exports = mongoose.model('setTimeLogin', modelSchema)