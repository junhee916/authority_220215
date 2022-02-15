const bankModel = require('../models/bank')
const jwt = require('jsonwebtoken')
const mpaModel = require('../models/mpa')
const userModel = require('../models/user')
const bankController = {}
bankController.getDetailMpa = async (req, res) => {
    const id = req.params.mpaNUM
    try{
        if(res.locals.user){
            const mpa = await mpaModel.findById(id)
            if(!mpa){
                return res.status(402).json({
                    msg : "no mpaId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get mpa",
                    mpaData : mpa
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
bankController.getDetailUser = async (req, res) => {
    const id = req.params.mpaNUM
    try{
        if(res.locals.user){
            const user = await userModel.findById(id)
            if(!user){
                return res.status(402).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get user",
                    userData : user
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
bankController.getUser = (req, res) => {
    const COMPANY = req.params.company
    try{
        userModel.find({COMPANY}).exec(function(err, users){
            if(err){
                console.log(err)
            }
            else{
                res.status(200).json({
                    msg : "get user in bank",
                    usersData : users
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
bankController.getMpa = (req, res) => {
    try{
        if(res.locals.user){
            mpaModel.find().sort({"_id":1}).exec(function(err, mpas){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        msg : "get mpas",
                        mpasData : mpas.map(mpa => {
                            return {
                                id : mpa["_id"],
                                COMPANY : mpa["COMPANY"],
                                BANK : mpa["BANK"],
                                updatedAt : mpa["updatedAt"]
                            }
                        })
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
bankController.updateBank = async (req, res) => {
    const id = req.params.mpaId
    try{
        if(res.locals.user){
            const mpa = await mpaModel.findByIdAndUpdate(id, {$set : {
                    BANK : "Y"
            }})
            if(!mpa){
                return res.status(402).json({
                    msg : "no mpaId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update by mpa id: " + id
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
bankController.updateUserBank = async (req, res) => {
    const id = req.params.mpaId
    try{
        if(res.locals.user){
            const user = await userModel.findByIdAndUpdate(id, {$set : {
                    BANK : "Y"
            }})
            if(!user){
                return res.status(402).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update by user id: " + id
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
bankController.canselBank = async (req, res) => {
    const id = req.params.mpaId
    try{
        if(res.locals.user){
            const mpa = await mpaModel.findByIdAndUpdate(id, {$set : {
                    BANK : "N"
            }})
            if(!mpa){
                return res.status(402).json({
                    msg : "no mpaId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update by mpa id: " + id
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
bankController.canselBankUser = async (req, res) => {
    const id = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findByIdAndUpdate(id, {$set : {
                    BANK : "N"
            }})
            if(!user){
                return res.status(402).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update by user id: " + id
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
bankController.signup = async (req, res) => {
    const {BANK, password} = req.body
    try{
        const bank = await bankModel.findOne({BANK})
        if(bank){
            return res.status(400).json({
                msg : "user bank, please other bank"
            })
        }
        else{
            const bank = new bankModel({
                BANK, password
            })
            await bank.save()
            res.status(200).json({
                msg : "signup bank",
                bankInfo : {
                    id : bank._id,
                    BANK : bank.BANK,
                    password : BANK.password
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
bankController.login = async (req, res) => {
    const {BANK, password} = req.body
    try{
        const bank = await bankModel.findOne({BANK})
        if(!bank){
            return res.status(400).json({
                msg : "user bank, please other bank"
            })
        }
        else{
            await bank.comparePassword(password, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{
                    const payload = {
                        id : bank._id,
                        BANK : bank.BANK
                    }
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {
                            expiresIn : '1h'
                        }
                    )
                    res.status(200).json({
                        msg : "login bank",
                        token : token,
                        bankInfo : {
                            id : bank._id,
                            BANK : bank.BANK,
                            password : bank.password
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
module.exports = bankController