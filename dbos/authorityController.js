const authorityModel = require('../models/authority')
const authorityController = {}
authorityController.check = (req, res) => {
    const user = res.locals.user.ID
    try{
        if(res.locals.user){
            authorityModel.findOne({user : user}).exec(function(err, authority){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get authority",
                        authorityData : authority
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
authorityController.get = (req, res) => {
    const user = req.params.userID
    try{
        if(res.locals.user){
            authorityModel.findOne({user : user}).exec(function(err, authority){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get authority",
                        authorityData : authority
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
authorityController.save = async (req, res) => {
    const user = req.params.userID
    const {ABI, DWTH, ATAB, CDI, SAR} = req.body
    const newAuthority = new authorityModel({
        user : user,
        ABI, DWTH, ATAB, CDI, SAR
    })
    try{
        if(res.locals.user){
            await newAuthority.save()
            res.status(200).json({
                msg : "save authority"
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
authorityController.update = async (req, res) => {
    const user = req.params.userID
    console.log('authority update data 확인: ', req.body)
    try{
        if(res.locals.user){
            const authority = await authorityModel.findOneAndUpdate({user : user}, {$set : {
                                    ABI : req.body.ABI,
                                    DWTH : req.body.DWTH,
                                    ATAB : req.body.ATAB,
                                    CDI : req.body.CDI,
                                    SAR : req.body.SAR,
                                }})
            console.log("authority update 진행 확인: ", authority)
            if(!authority){
                return res.status(402).json({
                    msg : "no authorityId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update authority by userID: " + user,
                    authority : authority 
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
module.exports = authorityController