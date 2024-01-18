const not_found=(req,res)=>{
  return res.status(404).send('page not fount');
}

module.exports=not_found;