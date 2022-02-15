const setTimeLoginModel = require('../models/setTimeLogin')
const setTimeLoginController = {}
setTimeLoginController.checkTime = (req, res) => {
    const user = req.params.userID
    try{
        setTimeLoginModel.findOne({user}).exec(function(err, setTimeLogin){
            if(err){
                console.log(err)
            }
            else{
                res.status(200).json({
                    msg : "get setTimeLogin",
                    setTimeLoginData : setTimeLogin
                })
            }
        })  
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
setTimeLoginController.confirmAuthority = (req, res) => {
    const user = res.locals.user.ID
    try{
        if(res.locals.user){
            setTimeLoginModel.findOne({user}).exec(function(err, setTimeLogin){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get setTimeLogin",
                        setTimeLoginData : setTimeLogin
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
setTimeLoginController.get = (req, res) => {
    const user = req.params.userID
    try{
        if(res.locals.user){
            setTimeLoginModel.findOne({user}).exec(function(err, setTimeLogin){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get setTimeLogin",
                        setTimeLoginData : setTimeLogin
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
setTimeLoginController.save = async(req, res) => {
    const user = req.params.userID
    const {MON, TUES, WEDNES, THURS, FRI, SATUR, SUN, STARTTIME, ENDTIME} = req.body
    const newSetTimeLogin = new setTimeLoginModel({
        user : user,
        MON, TUES, WEDNES, THURS, FRI, SATUR, SUN, STARTTIME, ENDTIME
    })
    try{
        await newSetTimeLogin.save()
        res.status(200).json({
            msg : "save setTimeLogin"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
setTimeLoginController.update = async (req, res) => {
    const user = req.params.userID
    try{
        if(res.locals.user){
            const setTimeLogin =  await setTimeLoginModel.findOneAndUpdate({user : user}, {$set : {
                MON : req.body.MON,
                TUES : req.body.TUES,
                WEDNES : req.body.WEDNES,
                THURS : req.body.THURS,
                FRI : req.body.FRI,
                SATUR : req.body.SATUR,
                SUN : req.body.SUN,
                STARTTIME : req.body.STARTTIME,
                ENDTIME : req.body.ENDTIME
            }})
            if(!setTimeLogin){
                return res.status(402).json({
                    msg : "no setTimeLogin id"
                })
            }
            else{
            res.status(200).json({
                msg : "update setTimeLogin by id: " + user,
                setTimeLogin : setTimeLogin
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
module.exports = setTimeLoginController