import React, { useState, useEffect } from "react";
import "./homePage.css";
import view from "../../img/view.png";
import dots from "../../img/dots.svg";
import plus from "../../img/plus.png";
import JSONPretty from "react-json-pretty";
import Sidenav from "../Sidenav/Sidenav";

const HomePage = ({
  tabs,
  tabIndex,
  handleTabChange,
  url,
  setUrl,
  method,
  setMethod,
  sendHandler,
  body,
  setBody,
  setHeaders,
  headers,
  history,
  clearResponseTable,
  responseData,
  setResponseData,
  responseStatus,
}) => {
  console.log(tabIndex);
  const [statusClassName, setStatusClassName] = useState(
    "nav-item warning success error"
  );
  const [environment] = useState(["No environment"]);
  const [text] = useState(["Text", "JSON", "XML", "HTML"]);
  const [response] = useState([
    "Save Response",
    "Save Response as File",
    "Save Response as Example",
  ]);
  const [environmentValue, setEnvironmentValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [responseValue, setResponseValue] = useState("");

  useEffect(() => {
    if (responseStatus >= 400) {
      setStatusClassName("nav-item nav-item-error");
    } else if (responseStatus >= 300) {
      setStatusClassName("nav-item warning");
    } else {
      setStatusClassName("nav-item success");
    }
  }, [responseStatus]);


  return (
   
            <div className="sideNav-group horizontal">
              <Sidenav
                history={history}
                MethodValue={setMethod}
                headerValue={setHeaders}
                setUrl={setUrl}
                bodyValue={setBody}
                clearResponseTable={clearResponseTable}
                response={responseData}
                responseValue={setResponseData}
              />

              <div className="homePage-container">
                <div className="homePage">
                  <div className="homePage-builder">
                    <div className="homePage-header">
                      <div className="homePage-tabs-wrapper">
                        <div className="homePage-tabs header-tab">
                          <div className="homePage-tabs is-active">
                            <div className="homePage-tabs-title__wrapper">
                              <div className="homePage-text__wrapper">
                                <div className="homePage-text-icon">
                                  <div className="homePage-icon-wrapper">
                                    <div className="home-icon-get">GET</div>
                                  </div>
                                </div>
                                <div className="homePage-tab-name">
                                  Untitled Request
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="homePage-tabs-actions actions-header">
                          <div className="btn create">
                            <img
                              src={plus}
                              alt="plus-button"
                              style={{
                                display: "inline-flex",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                          </div>
                          <div className="homePage-tabs-options-wrapper">
                            <div className="dropdown tab-actions-dropdown">
                              <div className="dropdown-button">
                                <div className="btn btn-tertiary homePage-tab-options">
                                  <img
                                    src={dots}
                                    alt="dots"
                                    style={{
                                      display: "inline-flex",
                                      width: "16px",
                                      height: "16px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="environment-wrapper">
                        <div className="enviroment-handler"></div>
                      </div>
                      <div className="environment-container">
                        
                          
                            <div className="input-select-wrapper">
                              <div className="input-search-group">
                                <div className="input-search-group__input-wrapper">
                                  <select
                                    className="input input-search"
                                    value={environmentValue}
                                    onChange={(e) =>
                                      setEnvironmentValue(e.target.value)
                                    }
                                  >
                                    {environment.map((item, index) => (
                                      <option value={item} key={index}>
                                        {item}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                         
                      
                        <div className="environment-view">
                          
                              <div className="btn btn-icon">
                                <img
                                  src={view}
                                  alt="view_img"
                                  style={{
                                    display: "inline-flex",
                                    width: "16px",
                                    height: "16px",
                                  }}
                                />
                              </div>
                            
                        </div>
                      </div>
                    </div>
                    <div className="homePage-content">
                      <div className="sideNav-group horizontal">
                          <div className="homePage">
                            <div className="main-container">
                              <div className="tab-header">
                                <div className="tab-header-container">
                                  <div className="tabheader-name">
                                    <div
                                      className="tabheader-name-wrapper"
                                      title="Untitled response"
                                    >
                                      <div className="tabheader-name-input">
                                        Untitled request
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tabheader-actions">
                                    <div className="save-button"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="url-container">
                                <div className="url-container-main">
                                  <div className="url-container-main__group">
                                    <div className="url-editor">
                                      <div className="url-editor__list-wrapper">
                                        <div className="input-search-group">
                                          <div className="input-search-group__input-wrapper">
                                            <select
                                              className="form-select btn-secondary"
                                              value={method}
                                              onChange={(e) =>
                                                setMethod(e.target.value)
                                              }
                                            >
                                              <option value="GET" defaultValue>
                                                GET
                                              </option>
                                              <option value="POST">POST</option>
                                              <option value="DELETE">
                                                DELETE
                                              </option>
                                              <option value="PUT">PUT</option>
                                              <option value="PATCH">
                                                PATCH
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="request_input" style={{width:"100%" , height:"100%" , border:"1px solid #f2f2f2"}}>
                                    <input
                                              type="text"
                                              className="form-control btn-secondary url-editor-root "
                                              placeholder="Enter Request URL"
                                              aria-label="url"
                                              aria-describedby="basic-addon1"
                                              value={url}
                                              style={{ border: 'none' }}
                                              onChange={(e) =>
                                                setUrl(e.target.value)
                                              }
                                            />
                                    </div>
                                  </div>
                                  <div className="url-container-button__group">
                                    <div className="url-container__send-button">
                                      <button
                                        className="btn btn-outline-warning send_button"
                                        onClick={sendHandler}
                                      >
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="homePage-group verticle">
                                <div className="homePage-container">
                                  <div className="homePage-request-editor">
                                    <div className="homePage-header params-content">
                                      <div className="homePage-tabs-wrapper">
                                        <div className="homePage-tabs">
                                          {tabs.map((tab, index) => {
                                            return (
                                              <span
                                                onClick={() =>
                                                  handleTabChange(index)
                                                }
                                                className={
                                                  index === tabIndex
                                                    ? "tab tab-primary tab-text-wrapper is-active"
                                                    : "tabs tabs-primary tab-text-wrapper"
                                                }
                                              >
                                                {tab}
                                              </span>
                                            );
                                          })}

                                          
                                        </div>
                                        <div className="homePage-tabs-actions">
                                          <div className="btn btn-text btn-action">
                                            Cookies
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {tabIndex === 3 && (
                                            <div className="homepage-content">
                                              <div className="url_editor-group">
                                                <div
                                                  className="tab-content"
                                                  id="pills-tabContent"
                                                >
                                                  <div
                                                    className="tab-pane fade show active"
                                                    id="pills-body"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-body-tab"
                                                  >
                                                    <textarea
                                                      name="body"
                                                      className=" request-area border   p-3 json-pretty json-pretty-container"
                                                      id="body"
                                                      spellCheck="false"
                                                      value={body}
                                                      cols="141"
                                                      rows="10"
                                                      onChange={e =>
                                                        setBody(e.target.value)
                                                      }
                                                    ></textarea>
                                                  </div>
                                                  <div
                                                    className="tab-pane fade"
                                                    id="pills-headers"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-headers-tab"
                                                  >
                                                    <textarea
                                                      name="headers"
                                                      className="bg-light border border-1 rounded p-3"
                                                      value={headers}
                                                      id="headers"
                                                      cols="70"
                                                      rows="10"
                                                      onChange={(e) =>
                                                        setHeaders(
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      {headers}
                                                    </textarea>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                    {tabIndex !== 3 && (
                                      <div className="homepage-content">
                                        <div className="url_editor-group">
                                          <div className="editor-title">
                                            <span>Query Params</span>
                                          </div>
                                          <div className="editor_params">
                                            <div className="key_value-editor">
                                              <div className="key_value-form-editor">
                                                <div className="key_value-header">
                                                  <div className="key_value-header-row">
                                                    <div className="key_value-form-actions"></div>
                                                    <div className="suggestion_group">
                                                      <div className="key-value-header-item">
                                                        <div className="header-content">
                                                          KEY
                                                        </div>
                                                      </div>
                                                      <div className="key-value-header-item">
                                                        <div className="header-content">
                                                          VALUE
                                                        </div>
                                                      </div>
                                                      <div className="key-value-header-item">
                                                        <div className="header-content">
                                                          DESCRIPTION
                                                        </div>
                                                      </div>
                                                      <div className="bulk__editor-controls">
                                                        <div className="key_value-toggle">
                                                          <div className="dropdown">
                                                            <div className="btn btn-text">
                                                              <img
                                                                src={dots}
                                                                alt="dot_img"
                                                                style={{
                                                                  display:
                                                                    "inline-flex",
                                                                  width: "16px",
                                                                  height:
                                                                    "16px",
                                                                }}
                                                              />
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="btn btn-text bulk-editor">
                                                          Bulk Edit
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="key-value__body">
                                                  <div className="key_value-header-row">
                                                    <div className="key_value-form-actions"></div>
                                                    <div className="suggestion_group">
                                                      <div className="key-value-header-item">
                                                        <div className="key-value-placeholder">
                                                          KEY
                                                        </div>
                                                      </div>
                                                      <div className="key-value-header-item">
                                                        <div className="key-value-placeholder">
                                                          VALUE
                                                        </div>
                                                      </div>
                                                      <div className="key-value-header-item">
                                                        <div className="key-value-placeholder">
                                                          DESCRIPTION
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="body-resizehandler">
                                          <div className="resize-body"></div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="homePage-content">
                                      <div className="footer-response-container">
                                        <div className="footer-response__header">
                                          <div className="response-section-top">
                                            <div className="response-section-tabs">
                                              <div className="response-tab">
                                                <div className="tabs">
                                                  <div className="tab tab-primary is-active">
                                                    <div className="tab-text-wrapper">
                                                      <span>Body</span>
                                                    </div>
                                                  </div>
                                                  <div className="tab tab-primary">
                                                    <div className="tab-text-wrapper">
                                                      <span>Cookies</span>
                                                    </div>
                                                  </div>
                                                  <div className="tab tab-primary">
                                                    <div className="tab-text-wrapper">
                                                      <span>Headers</span>
                                                    </div>
                                                  </div>
                                                  <div className="tab tab-primary">
                                                    <div className="tab-text-wrapper">
                                                      <span>TestResult</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="response-section-meta">
                                              <div className="response-meta-viewer">
                                                <div className="response-meta-item">
                                                  <span>Status:</span>
                                                  <li
                                                    className={statusClassName}
                                                    role="presentation"
                                                  >
                                                    <div className="nav-link text-muted">
                                                      {responseStatus}
                                                    </div>
                                                  </li>
                                                </div>
                                                <div className="response-meta-time">
                                                  <span>Time:</span>
                                                </div>
                                                <div className="response-action-container">
                                                  <div className="response-action">
                                                    <select
                                                      className="save-response-button btn-text"
                                                      value={responseValue}
                                                      onChange={(e) =>
                                                        setResponseValue(
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      {response.map(
                                                        (item, index) => (
                                                          <option
                                                            value={item}
                                                            key={index}
                                                          >
                                                            {item}
                                                          </option>
                                                        )
                                                      )}
                                                    </select>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="footer-response__content">
                                          <div className="response-body-viewer">
                                            <div className="text-editor">
                                              <div className="text-editor-div">
                                                <div className="text-editor-primary">
                                                  <div className="tabs tab-secondry">
                                                    <div className="tab-text-wrapper">
                                                      Pretty
                                                    </div>
                                                  </div>
                                                  <div className="tabs tab-secondry">
                                                    <div className="tab-text-wrapper">
                                                      Raw
                                                    </div>
                                                  </div>
                                                  <div className="tabs tab-secondry">
                                                    <div className="tab-text-wrapper">
                                                      Preview
                                                    </div>
                                                  </div>
                                                  <div className="tabs tab-secondry">
                                                    <div className="tab-text-wrapper">
                                                      Visualize
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div className="dropdown text-editor">
                                                      <select
                                                        className="btn btn-secondary btn-small"
                                                        value={textValue}
                                                        onChange={(e) =>
                                                          setTextValue(
                                                            e.target.value
                                                          )
                                                        }
                                                      >
                                                        {text.map(
                                                          (item, index) => (
                                                            <option
                                                              value={item}
                                                              key={index}
                                                            >
                                                              {item}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="tab-pane fade show active"
                                          id="pills-data"
                                          role="tabpanel"
                                          aria-labelledby="pills-data-tab"
                                        >
                                          <div
                                            className="data-content border border-1 p-3 json-pretty json-pretty-container"
                                            style={{
                                              width: "95%",
                                              height: "246px",
                                              overflow: "scroll",
                                              margin: "0 auto",
                                              overflowX:"hidden",
                                              textAlign: "initial",
                                              display: "flex",
                                              flex:"1 1 0%",
                                              flexDirection: "column",
                                              justifyContent: "flex-start",
                                              fontFamily: " IBMPlexMono Courier New  monospace",
                                            }}
                                          >
                                            <JSONPretty
                                              style={{fontSize: "1.1em"}} data={responseData} mainStyle="padding:1em  overflow:hidden  background:#fafafa " valueStyle="color:#0451a5"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
  );
};

export default HomePage;
