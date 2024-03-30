const connectDB = require("../../dataBase/Connect")
const Filter = require("../../model/Filter")
const filterData = require("../data/filters.json")
const url='mongodb+srv://berfin:1234@darvindatabase.kfxm2jd.mongodb.net/StoreDataBase?retryWrites=true&w=majority'


const addAllFilters =async(req,res)=>{

try {
    await connectDB(url)
    await Filter.deleteMany();
    await Filter.create(filterData);
    console.log("All filter data have been created successfully")

} catch (error) {
    console.log(error);
}

}

addAllFilters();