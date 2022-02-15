const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const userController = {}
userController.getAll = async (req, res) => {
    try{
        if(res.locals.user){
            const users = await userModel.find()
            res.status(200).json({
                msg : "get users",
                count : users.length,
                usersData : users.map(user => {
                    return {
                        _id : user["_id"],
                        ID : user["ID"],
                        password : user["password"],
                        NAME : user["NAME"],
                        DEPARTMENT : user["DEPARTMENT"],
                        SPOT : user["SPOT"],
                        RULE : user["RULE"],
                        DAYKRW : user["DAYKRW"],
                        DAYFOREIGN : user["DAYFOREIGN"],
                        TIMEKRW : user["TIMEKRW"],
                        TIMEFOREIGN : user["TIMEFOREIGN"]
                    }
                })
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
};
userController.getAuthority = (req, res) => {
    try{
        if(res.locals.user){
            userModel.aggregate([
                {
                    $group:{
                        _id:{
                            NUM:"$_id",
                            ID:"$ID", 
                            NAME:"$NAME", 
                            DEPARTMENT:"$DEPARTMENT",
                            SPOT:"$SPOT",
                            DAYKRW:"$DAYKRW",
                            TIMEKRW:"$TIMEKRW"
                        }
                    }
                },
                {
                    $sort:{
                        "_id.ID":1
                    }
                },
                {
                    $lookup:{
                        from : "authorities",
                        localField : "_id.ID",
                        foreignField : "user",
                        as : "authorities_docs"
                    }
                }
            ], function(err, result){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        userData : result
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
userController.get = (req, res) => {
    const ID = req.params.userId
    try{
        if(res.locals.user){
            userModel.findOne({ID}).exec(function(err, user){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get user",
                        userData : {
                            _id : user["_id"],
                            ID : user["ID"],
                            password : user["password"],
                            NAME : user["NAME"],
                            DEPARTMENT : user["DEPARTMENT"],
                            SPOT : user["SPOT"],
                            RULE : user["RULE"],
                            DAYKRW : user["DAYKRW"],
                            DAYFOREIGN : user["DAYFOREIGN"],
                            TIMEKRW : user["TIMEKRW"],
                            TIMEFOREIGN : user["TIMEFOREIGN"]
                        }
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
};
userController.signup = async (req, res) => {
    const {
        COMPANY,
        ID, 
        password, 
        NAME, 
        DEPARTMENT, 
        SPOT
    } = req.body
    console.log('user signup',req.body)
    try{
        const user = await userModel.findOne({ID})
        if(user){
            return res.status(400).json({
                msg : "user id, please other id"
            })
        }
        else{
            const user = new userModel({
                COMPANY,
                ID, 
                password, 
                NAME, 
                DEPARTMENT, 
                SPOT,
                RULE : "USER",
                BANK : "W",
                DAYKRW : 0,
                DAYFOREIGN : 0,
                TIMEKRW : 0,
                TIMEFOREIGN : 0
            })
            await user.save()
            res.status(200).json({
                msg : "success signup",
                userInfo : {
                    _id : user["_id"],
                    ID : user["ID"],
                    password : user["password"],
                    NAME : user["NAME"],
                    DEPARTMENT : user["DEPARTMENT"],
                    SPOT : user["SPOT"],
                    RULE : user["RULE"],
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
userController.login = async (req, res) => {
    const {ID, password} = req.body
    console.log("login req.body 확인: ", ID, password)
    try{
        const user = await userModel.findOne({ID})
        if(!user){
            return res.status(400).json({
                msg : "user id, please other id"
            })
        }
        else{
            await user.comparePassword(password, (err, isMatch) => {
                console.log('isMatch 확인: ', isMatch)
                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{
                    const payload = {
                        _id : user["_id"],
                        ID : user["ID"],
                        NAME : user["NAME"]
                    }
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn : '1h'}
                    )
                    res.status(200).json({
                        msg : "success login",
                        token : token,
                        userInfo : {
                            _id : user["_id"],
                            ID : user["ID"],
                            password : user["password"],
                            NAME : user["NAME"],
                            DEPARTMENT : user["DEPARTMENT"],
                            SPOT : user["SPOT"],
                            BANK : user["BANK"],
                            RULE : user["RULE"]
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
}
userController.update = async (req, res) => {
    const ID = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findOneAndUpdate({ID : ID}, {$set : {
                DAYKRW : req.body.DAYKRW,
                DAYFOREIGN : req.body.DAYFOREIGN,
                TIMEKRW : req.body.TIMEKRW,
                TIMEFOREIGN : req.body.TIMEFOREIGN
            }})
            if(!user){
                return res.status(402).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update user by id: " + ID
                })
            }
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
};

module.exports = userController