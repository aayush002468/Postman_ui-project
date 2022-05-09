import './App.css';
import HomePage from './components/homePage/homePage';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"
import "normalize.css/normalize.css"
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-json-pretty/themes/monikai.css';

function App() {
  // toast.configure();

  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [history, setHistory] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [responseHeaders, setResponseHeaders] = useState({});
  const [responseCookie, setResponseCookie] = useState("");
  const [responseStatus, setResponseStatus] = useState("null");

  const [requestTabs] = useState([
    "Params",
    "Authorization",
    "Headers",
    "Body",
    "Pre-request Script",
    "Tests",
    "Settings",
  ]);

  const [requestsTabIndex, setRequestsTabIndex] = useState(0);



  const handleRequestTabChange = (index) => {
    setRequestsTabIndex(index);
  };

  useEffect(() => {
    setMethod("GET");
    setUrl("");
    setHeaders(
      `{\n"Access-Control-Allow-Origin":"*",\n"Content-Type":"application/json"\n,\n"Access-Control-Allow-Credentials":"true"\n,\n"Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS"\n,\n"Access-Control-Allow-Headers":"Content-Type, Authorization, X-Requested-With"\n}`
    );
    setBody("{\n\n}");
  }, []);
  const clearResponseTable = () => {
    setResponseData("");
    setResponseHeaders({});
    setResponseCookie("");
  };

  const sendHandler = async () => {
    try {
      const id = Math.random();
      setHistory([
        ...history,
        { id: id.toString(), url, method, headers, body ,setResponseData,responseData },
      ]);
      console.log(body)
      const res = await axios.post("https://postman-node.herokuapp.com/get",{url,method,body,headers})
      const data = res.data;
      console.log(res)

      if (data) setResponseData(JSON.stringify(data));
      if (document.cookie) setResponseCookie(document.cookie);
      setResponseStatus(res.status);

      toast.success(`🧪 successfully returned response status:${res.status}`);

    } catch (error) {
      if (error.message.includes("Failed to parse URL"))
        toast.error("⚠️ wrong URL,enter correct URL");
      if (error.message.includes("Unexpected token < in JSON at position 0"))
        toast.error("⚠️ wrong body request data, enter correct body");
      if (error.message.includes("Unexpected string in JSON"))
        toast.error("⚠️ wrong headers sets, enter correct headers");
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
                clearResponseTable={clearResponseTable}
                tabs={requestTabs}
                tabIndex={requestsTabIndex}
                handleTabChange={(index) => handleRequestTabChange(index)}
                />  
                
                     
    </div>
  );
}

export default App;
