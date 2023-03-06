
const authorize=(permitedrole)=>{
    return (req,res,next)=>{
        const role=req.body.role

if(permitedrole.includes(role)){
    next()
}else{
    res.send({"msg":"unuthorised porsone"})
}


    }

}
module.exports = {authorize};


// ,authorize(["admin","patient"])