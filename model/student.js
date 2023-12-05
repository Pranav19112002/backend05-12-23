const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://pranav:pranav@cluster0.k4b8aal.mongodb.net/student?retryWrites=true&w=majority")
.then(()=>{console.log("db connected")
})
.catch(err=> console.log(err));
const studentsschema=new mongoose.Schema({
    admissionno:Number,
    Name:String,
    age:Number,
    course:String,

});
var studentmodel=mongoose.model("student",studentsschema)
module.exports=studentmodel;