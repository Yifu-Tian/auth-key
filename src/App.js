import React, { useState } from 'react';
import './KeyForm.css'; // 确保你有一个名为 KeyForm.css 的样式文件


const KeyForm = () => {
  const [inputKey, setInputKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const verifyKey = async (key) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/'; 
    const targetUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=example&api_key=${key}`;
    const Url = proxy + targetUrl;
    try{
      const response = await fetch(Url);
      const data = await response.text();
      const isValid = !data.includes('API key invalid') && response.ok;
      
      if (!isValid){
        throw new Error("Invalid API Key. Please try again.");
      }
      return isValid;
    }catch (error) {
     setErrorMessage(error.message);
     return false;
    }
  };
  const handleInputChange = (e) => {
    setInputKey(e.target.value);
    setErrorMessage('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyIsValid = await verifyKey(inputKey);
    
    if (keyIsValid) {
      window.location.href = 'https://yifu-tian.github.io/pmc-downloader/'
    };
  }	  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="accessKey">Enter your access key:</label>
          <input
            id="accessKey"
            type="text"
            value={inputKey}
            onChange={handleInputChange}
            className="form-control"
            // 如果存在错误消息，input框将会高亮
            style={{ borderColor: errorMessage ? 'red' : 'initial' }}
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default KeyForm;

