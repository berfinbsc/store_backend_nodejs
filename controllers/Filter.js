const Filter = require("../model/Filter");


const getFilter =async(req,res)=>{
    try {
        
        const filter = await Filter.find();
        res.status(200).json(filter)

    } catch (error) {
        res.status(500).json({msg : "get filter error : :  "})
    }}






const addFilter =async(req,res)=>{
    try {
        const {category,value} =req.body;
        const filter = await Filter.findOne({category :category})
        if(filter && !filter.values.includes(value)){
            filter.values.push(value);
            filter.save();
            res.status(200).json(filter);
        }
        else{
            const newFilter = new Filter({
                category : category,
                values : [value],
            })
            newFilter.save();
            res.status(200).json(newFilter);
        }
    } catch (error) {
        res.status(500).json({msg : "add filter error : :  "})
        
    }
}


module.exports = {
    getFilter,
    addFilter,
}