const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const modelSchema = mongoose.Schema(
    {
        BANK : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }   
)
modelSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash;
        next();
    }
    catch(err){
        next(err)
        process.exit(1)
    }
})
modelSchema.methods.comparePassword = function(isInputPassword, cb){
    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {
        if(err) return cb(null, err)
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('bank', modelSchema)