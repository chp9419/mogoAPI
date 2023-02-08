const  {adminService}  = require("./admin.Service");


const adminSiginUp = async(req,res)=>{
    const {id,pw} = req.body;
    try {
        const result = await adminService.adminUserSignUp(id,pw);

        if(result){
            return res.status(200).json({success:result});
        } else{
            return res.status(400).json({success:result});
        }
    } catch (e) {
        res.status(500).json({message:e});
    }


}


module.exports={
    controller:{
        adminSiginUp,
    }
}