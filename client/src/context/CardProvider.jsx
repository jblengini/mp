import { createContext, useContext, useState } from "react";
import {
  getCardsRequest,
  getFormRequest,
} from "../api/Cards.api";

import { CardContext } from "./CardContex";

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardContextProvider");
  }
  return context;
};

export const CardContextProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [payAmount, setPayAmount] = useState(0);
  
    async function loadCards() {
      const response = await getCardsRequest();
      setCards(response.data);
    };
    async function FormRequest() {
      const response = fetch('http://localhost:8080/paymentform');
      const backendHtmlString = (await response).text
    
      //console.log(backendHtmlString)
      return {__html: backendHtmlString};
    };

    function MyComponent() {
      return <div dangerouslySetInnerHTML={FormRequest()} />;
    };
    
    
    function amountToPay(amount){
    setPayAmount(payAmount + parseInt(amount, 10) );
      };

    return (
      <CardContext.Provider
        value={{
          cards,
          payAmount,
          loadCards,
          amountToPay,
          FormRequest,
          MyComponent,
          }}
      >
        {children}
      </CardContext.Provider>
    );
  };