import './App.css';
import HomePage from './components/homePage/homePage';
import React, { useEffect, useState } from "react";
import axios from "axios"
import "normalize.css/normalize.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [history, setHistory] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [responseHeaders, setResponseHeaders] = useState({});
  const [responseCookie, setResponseCookie] = useState("");
  const [responseStatus, setResponseStatus] = useState("null");
  const [requestTabs] = useState([ "Params","Authorization", "Headers","Body", "Tests", "Settings"]);
  const [responseTabs] = useState([ "Body","Cookies", "Headers","Test Result"]);
  const [requestsTabIndex, setRequestsTabIndex] = useState(0);
  const [responseTabIndex, setResponseTabIndex] = useState(0);


  const handleRequestTabChange = (index) => {
    setRequestsTabIndex(index);
  };

  const handleResponseTabChange = (index)=>{
    setResponseTabIndex(index)
  }

  useEffect(() => {
    setMethod("GET");
    setUrl("");
    setHeaders( "" );
    setBody("{\n\n}");
  }, []);

  // const clearResponseTable = () => {
  //   setResponseData("");
  //   setResponseHeaders({});
  //   setResponseCookie("");
  // };

  const sendHandler = async () => {
   
    try {
      const id = Math.random();
      setHistory([
        ...history,
        { id: id.toString(), url, method, headers, body ,setResponseData,responseData },
      ]);
      console.log(body)
      const res = await axios.post("http://localhost:2410/get",{url,method,body,headers});
      const data = res.data;
      console.log(data)
      if (method === "GET"){
        if (data) setResponseData(JSON.stringify(data.data));
      }
      else if (method === "POST" && data) setResponseData(data.data.body);

      if (document.cookie) setResponseCookie(document.cookie);
      setResponseStatus(data.status);
      setResponseHeaders(data.headers);
      setHeaders(data.headers)
    } 
    catch (error) {
      console.log(error)
      if(error.response.status === 404){
      setResponseStatus(error.response.status)
      }
      else {
        setResponseStatus(error.response.code)
      }
    }
  };

  return (
    <div className="App">
      <HomePage url={url}
                setUrl={setUrl}
                method={method}
                setMethod={setMethod}
                setResponseData={setResponseData}
                setHeaders={setHeaders}
                responseData={responseData}
                responseCookie={responseCookie}
                responseHeaders={responseHeaders}
                responseStatus={responseStatus}
                body={body}
                setBody={setBody}
                headers={headers}
                sendHandler={sendHandler}
                history={history}
                tabs={requestTabs}
                responseTabs={responseTabs}
                tabIndex={requestsTabIndex}
                responseTabIndex={responseTabIndex}
                handleTabChange={(index) => handleRequestTabChange(index)}
                handleResponseTab={(index) => handleResponseTabChange(index)}
                />  
    </div>
  );
}

export default App;
