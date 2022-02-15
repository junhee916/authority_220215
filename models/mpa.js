const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcryptjs')
const modelSchema = mongoose.Schema(
    {
        _id : Number,
        ID : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        COMPANY : {
            type : String
        },
        ADDRESS : {
            type : String
        },
        DAYACCOUNT : {
            type : Number
        },
        FIRSTACCOUNT : {
            type : Number
        },
        BANK : {
            type : String
        }
    },
    {
        timestamps : true
    }
)
modelSchema.plugin(autoIncrement, {id: 'mpa_id_counter', inc_field: '_id'})
modelSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash;
        next();
    }
    catch(err){
        next(err)
    }
})
modelSchema.methods.comparePassword = function(isInpuPassword, cb){
    bcrypt.compare(isInpuPassword, this.password, (err, isMatch) => {
        console.log('compare password 확인: ', isInpuPassword, this.password)
        if(err) return cb(null, err)
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('mpa', modelSchema)