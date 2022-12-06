import React, { useEffect, useState } from 'react'
//import renderHTML from 'react-render-html';






function PaymentForm() {
  const [html, setHTML] = useState({__html: ""});
  

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(`http://localhost:8080/paymentform`)
       const backendHtmlString = await response.text()

       console.log(backendHtmlString)
        return {__html: backendHtmlString};
     }
     createMarkup().then(result => setHTML(result));
  }, []);
  

  return (
    //renderHTML("<a class='github' href='https://github.com'><b>GitHub</b></a>"))
  //<div dangerouslySetInnerHTML={html} />);
  <div>Form</div>)
}


export default PaymentForm