import express, { json } from "express"
import fetch from "node-fetch";



let port = process.env.PORT || 2410;
import cors from 'cors'
let app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers', 'X-Requested-With,content-type");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials: true")
    next();
  
  });
app.use(cors({origin: '*','Access-Control-Allow-Origin': '*'}));



app.post('/get',async (req,res)=>{
    let apiURL = req.body.url;
    let method = req.body.method;
    let body = req.body.body;

    console.log('get '+apiURL, body);
  if (method === 'GET') {
    const response = await fetch(apiURL,{method:method})
      .then((data) => data.json())
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  }
  else if (method === 'POST') {
    let apiURL = req.body.url;
    let method = req.body.method;
    let body = req.body.body;
    let header= {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    const response = fetch(apiURL,{method:"POST",body,headers:header})
      .then((data) => data.json())
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  }
})


// app.use('/',AllRoutes);
app.listen(port,()=> console.log(`server started on http://localhost:${port}`))