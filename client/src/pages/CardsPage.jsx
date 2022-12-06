import { useEffect } from "react";
import CardBox from "../components/CardBox";
import { useCards } from "../context/CardProvider";
import './cardbox.css';



function CardsPage() {
  const { cards, loadCards,payAmount } = useCards();

  useEffect(() => {
    loadCards();
  }, []);

  function renderMain() {
    
    if (cards.length === 0) return <h1>No cards yet</h1>;
    console.log('cards: ' + JSON.stringify(cards));
       return cards.map((card) => <CardBox card={card} key={card.id_service} />);
      // return <h1>cards</h1>;
  } 

  return (
    <div>
      <h1 className="">Facturas</h1>
      <div className="">{renderMain()}</div>
      <div>Monto a pagar: {payAmount}</div>
   </div>
  );
  };

export default CardsPage;
