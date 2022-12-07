import { useCards } from "../context/CardProvider";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from "axios";




function CardBox({ card }) {
  const { amountToPay,FormRequest,MyComponent } = useCards();
  const mercadoPagoPublicKey = 'TEST-1b823431-863d-47f7-8b65-22d300acecd3'
  const navigate = useNavigate();

  const handleClick = async() => {
    await amountToPay(card.importe);
    
      //navigate("/paymentform");
    //window.location.assign("http://127.0.0.1:5173/form.html ");
    window.location.assign("http://localhost:8080/")
  }



/*   const handleDone = async () => {
    await toggleTaskDone(task.id);
  }; */

  return (
    
<div className="grid-container">
    <div className="left" >
      <div className = "strong"> {card.description} </div>
      <div className ="label"> Fecha Emisión</div>
      <div className="field" > {moment(card.fecha_emision).format('DD/MM/YYYY')} </div> 
      <div className ="label"> Importe Total</div>
      <div className="price"> {card.importe_total} </div>
    </div>
    <div className="left1" >
      <div className ="label"> Príodo </div>
      <div className="field"> {card.periodo}</div>
      <div className ="label"> Saldo</div>
      <div className="price"> {card.saldo}</div>
    </div>
    
   
    <div className="middle">
      <div className = "label"> Pagos pendientes</div>
    </div>  

    <div className="middle1" >
      <div className ="label">Tipo</div>
      <div className="field"> Liquidación</div>
    </div>  
    <div className="right">
      <div className ="label">Liquidación</div>
    </div>

    
    <div className="footer1">
      <div className ="label"> Importe</div>
      <div> <span className="badge price">{card.importe}</span></div>
    </div>
    <div className="footer2">
      <div className ="label"> Vencimiento</div>
      <div> <span className="badge ">{moment(card.vencimiento).format('DD/MM/YYYY')}</span></div>
      </div>
    <div className="footer3">
      <div className ="btn"
        //onClick={() => amountToPay(card.importe)}
        onClick={handleClick}
               
      > Pagar
       </div>
    </div>
    <div className="footer4">
            <p></p>
    </div>
    <div className="footer5">
            <p></p>
    </div>
</div>


/*     // ex
    <div classNameName="bg-zinc-700 text-white rounded-md p-4">
      <header classNameName="flex justify-between">
        <h2 classNameName="text-sm font-bold">{task.title}</h2>
        <span>{task.done == 1 ? "️✅️" : "❌"}</span>
      </header>
      <p classNameName="text-xs">{task.description}</p>
      <span>{task.createAt}</span>
      <div classNameName="flex gap-x-1">
        <button
          classNameName="bg-slate-300 px-2 py-1 text-black"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          classNameName="bg-slate-300 px-2 py-1 text-black"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          classNameName="bg-slate-300 px-2 py-1 text-black"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div> */

  );
}

export default CardBox;
