const errorHandler =(err,req,res)=>{


    console.log(err);
    res.status(500).json({msg:'something went wrong'})






}

module.exports=errorHandler;