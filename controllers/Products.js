const Product = require('../model/Model')
const express =require('express')
express.json()

const getAllProducts =async(req,res)=>{
  const queryObject={}
const numericFilter = (queryFilter)=>{
  const regeEx =/\b(<|>|>=|=|<|<=)\b/g;
  const operatorMap={
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  }
  const option =['price','rating']
let filters =  queryFilter.replace(regeEx,match=>`-${operatorMap[match]}-`)
filters.split(',').forEach((item)=>{
const [field,operator,value]=item.split('-')
if(option.includes(field)){
  queryObject[field]={[operator]:Number(value)}

}})}







try{

const {numFilter, brand, gender,sort}=req.query;


if(numFilter){
  numericFilter(numFilter)
} 

if(brand){
    queryObject.brand=brand;
} 

if(gender){
  queryObject.gender = gender
}


let productsQuery = Product.find(queryObject);


if(sort){
  productsQuery = productsQuery.sort(sort);
}
else{
  productsQuery = productsQuery.sort('rating');
  }


const page = req.query.page || 1
const limit = req.query.limit || 5

  const products = await productsQuery
  .skip((page-1)*limit)
  .limit(limit)
  .exec();
  res.status(200).json({ products, nbHits: products.length });





}catch(err){
  console.log("hata............")
console.log({msg : err})
}

}





module.exports={
    getAllProducts};