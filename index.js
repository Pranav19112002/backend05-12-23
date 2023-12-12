const express =require("express");
const cors=require("cors")

const multer=require('multer');

const storage=multer.memoryStorage();

const upload=multer({storage:storage});



const app =new express(); 

const studentmodel=require('./model/student');
const { request } = require("express");
const { contentType } = require("express/lib/response");

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());



// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new studentmodel(request.body).save();
//     response.send("Record saved")

// })

app.post('/new',upload.single('image1'),async(request,response)=>{

    try{

        const{admissionno,Name,age,course}=request.body
        const newdata= new studentmodel({
            admissionno,Name,age,course,
            image1:{
            data:request.file.buffer,
            contentType:request.file.mimetype,
            }
    })
        await newdata.save();
        response.status(200).json({message:'Record saved'});
    }

    catch(error)
    {
        response.status(500).json({error:'Internal server error'});
    }
})
app.get('/',(request,response)=>{
response.send("hi");

})
app.get('/view',async(request,response) => {
    var data=await studentmodel.find();
    console.log(data)
    response.send(data)
}
)

app.put('/edit/:id',async(request,response) => {
    let id = request.params.id;
    await studentmodel.findByIdAndUpdate(id,request.body)
  
    response.send("data updated")
})



app.listen(3010,(request,response)=>{
    console.log("port is runing 3010")

})
