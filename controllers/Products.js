const Product = require('../model/Model')


const getAllProductsStatic = async(req,res)=>{

    try{
        const products = await Product.find()
    res.status(200).json(products);
    }
    catch(err){
    console.log({msg : err})
    }
}
//


const getAllProducts =async(req,res)=>{

try{

const {featured, company, name, numericFilters}=req.query;
    
const queryObject ={};

if(featured){
    queryObject.featured=featured==='true' ? true:false;
}

if(company){
    queryObject.company=company;
} 

if(name){
    queryObject.name = { $regex: name, $options: 'i' };
}


 
if(numericFilters){
    const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          }

const regEx = /\b(<|>|>=|=|<|<=)\b/g;

let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
const options = ['price', 'rating'];
filters = filters.split(',').forEach((item) => {
  const [field, operator, value] = item.split('-');
  if (options.includes(field)) {
    queryObject[field] = { [operator]: Number(value) };
  }
});

    }


const products = await Product.find(queryObject)
res.status(200).json({products, productCount : products.length});


}
catch(err){
console.log({msg : err})
}

}





module.exports={
    getAllProducts,
    getAllProductsStatic,
};