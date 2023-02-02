const {userService} = require('../User/user.Service');




const userGetInfo = async(req,res)=>{
    try {
        const { name } = req.params;
        const data = await userService.userInfoRead(name);
        return res.status(200).json(data);
    } catch (e) {
        res.status(400).json({success:false});
    }
}



module.exports ={
    controller:{
        userGetInfo,
    }
}