import express from "express"
import bodyParser from "body-parser";
import axios from "axios"


let port = process.env.PORT || 2410;
import cors from 'cors'
let app = express();
app.use(express.json());
app.options('*', cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers', 'X-Requested-With,content-type");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials: true")
    next();
  
  });


app.use(cors({origin: '*','Access-Control-Allow-Origin': '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/get',cors(), async (req,res , next)=>{
    
  let method = req.body.method;
  if (method === 'GET') {
   try{
    let apiURL = req.body.url;
    const response = await axios.get(apiURL,{method:"GET"})
    .then(function (response) {
      res.send({
        "data":response.data,
        "status":response.status,
        "statusText":response.statusText,
        "headers":response.headers
      })
    });

      }
      catch(err){
        console.log(err)
        res.sendStatus(err.response.status)
        console.log(err.code)
      }  
  }
  else if (method === 'POST') {
    try{
    let apiURL = req.body.url;
    let body = req.body.body;
    let header= {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    const response = axios.post(apiURL,{method:"POST",body,headers:header})
      .then(function (response) {
        res.send({
          "data":response.data,
          "body":response.body,
          "status":response.status,
          "statusText":response.statusText,
          "headers":response.headers
        })
      });
  }
  catch{
    console.log(err)
    res.sendStatus(err.response.status)
    console.status(err.code)
  }
}

})

app.listen(port,()=> console.log(`server started on http://localhost:${port}`))