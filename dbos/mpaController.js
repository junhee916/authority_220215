const mpaModel = require('../models/mpa')
const jwt = require('jsonwebtoken')
const mpaController = {}
mpaController.getAuthorityMpa = (req, res) => {
    const ID = req.params.userId
    try{
        mpaModel.findOne(ID).exec(function(err, mpa){
            if(err){
                res.status(201).json({
                    msg : "null",
                    mpaData : null
                })
            }
            else{
                res.status(200).json({
                    msg : "get authority mpa",
                    mpaData : mpa
                })
            }
        })

    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}
mpaController.get = (req, res) => {
    try{
        if(res.locals.user){
            mpaModel.aggregate([
                {$match : {_id : Number(res.locals.user._id)}},
                {
                    $lookup:{
                        from : "users",
                        localField : "COMPANY",
                        foreignField : "COMPANY",
                        as : "user_docs"
                    }
                }
            ], function(err, result){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        mpaData : result
                    })
                }
            })
        }
        else{
            res.status(403).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}
mpaController.signup = async (req, res) => {
    const {
        ID, 
        password, 
        COMPANY, 
        ADDRESS, 
        DAYACCOUNT,
        FIRSTACCOUNT,
    } = req.body
    console.log('signup req.body: ', req.body)
    try{
        const mpa = await mpaModel.findOne({ID})
        if(mpa){
            return res.status(400).json({
                msg : "user id, please other id"
            })
        }
        else{
            const mpa = new mpaModel({
                ID, 
                password, 
                COMPANY, 
                ADDRESS, 
                DAYACCOUNT,
                FIRSTACCOUNT,
                BANK : "W",
                RULE : "MPA"
            })
            await mpa.save()
            res.status(200).json({
                msg : "success signup",
                mpaInfo : {
                    _id : mpa["_id"],
                    ID : mpa["ID"],
                    password : mpa["password"],
                    COMPANY : mpa["COMPANY"],
                    ADDRESS : mpa["ADDRESS"],
                    DAYACCOUNT : mpa["DAYACCOUNT"],
                    FIRSTACCOUNT : mpa["FIRSTACCOUNT"],
                    BANK : mpa["BANK"],
                    RULE : mpa["RULE"]
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.login = async (req, res) => {
    const {ID, password} = req.body
    console.log("login req.body 확인: ", ID, password)
    try{
        const mpa = await mpaModel.findOne({ID})
        if(!mpa){
            return res.status(400).json({
                msg : "user id, please other id"
            })
        }
        else{
            await mpa.comparePassword(password, (err, isMatch) => {
                console.log('isMatch 확인: ', isMatch)
                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{
                    const payload = {
                        _id : mpa["_id"],
                        ID : mpa["ID"],
                        COMPANY : mpa["COMPANY"]
                    }
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn : '1h'}
                    )
                    res.status(200).json({
                        msg : "success login",
                        token : token,
                        mpaInfo : {
                            _id : mpa["_id"],
                            ID : mpa["ID"],
                            password : mpa["password"],
                            COMPANY : mpa["COMPANY"],
                            ADDRESS : mpa["ADDRESS"],
                            BANK : mpa["BANK"],
                            RULE : mpa["RULE"]
                        }
                    })
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
module.exports = mpaController