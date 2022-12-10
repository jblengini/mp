//import express from "express";
import cors from "cors";
import {dirname, join} from 'path';
import path from "path";
import {fileURLToPath, URLSearchParams} from 'url'
import { PORT } from "./config.js";
import express from "express";
import open from 'open';
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import consolidate from "consolidate";
import swig from "swig";

import cardsRoutes from "./routes/cards.routes.js";
import { stringify } from "querystring";


dotenv.config();


const mercadoPagoPublicKey = process.env.MERCADO_PAGO_SAMPLE_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}
const mercadoPagoAccessToken = process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}
mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)




app.set("view engine", "html");
app.engine('html', consolidate.swig)
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: false }));
//app.use(express.static("./static"));

app.use(cors());
app.use(express.json());

app.use(cardsRoutes);



//app.use(express.static(join(__dirname, '../client/dist')))
app.use(express.static("./static"));
app.get("/", function (req, res) {
    var amount = 100;
    var facturas = [
        {factura: '00202020208', Total: '1294558'},
        {factura: '011202020208', Total: '3494558'},
    ];
    res.status(200).render("form", { mercadoPagoPublicKey, amount,
     // res.status(200).render("index", { mercadoPagoPublicKey,amount,
        myFacturasArray: facturas });
  }); 


  // app.post("/process_payment", (req, res) => {
  //   const { body } = req;
  //   console.log('pasa prosess' + body);
    
  //   mercadopago.payment.save(body)
  //     .then(function(response) {
  //       const { response: data } = response;
  //         res.status(201).json({
  //         detail: data.status_detail,
  //         status: data.status,
  //         id: data.id
  //       });
       
  //     })
      
  //     .catch(function(error) {
  //       console.log(error);
  //       const { errorMessage, errorStatus }  = validateError(error);
  //       res.status(errorStatus).json({ error_message: errorMessage });
  //     });
  // });

 
  app.post("/process_payment", (req, res) => {
    mercadopago.payment.save(req.body)
    .then(function(response) {
      const { status, status_detail, id } = response.body;
      console.log('respuesta:'+  JSON.stringify(response.body));
      res.status(response.status).json({ status, status_detail, id });
    })
    .catch(function(error) {
      console.error(error);
    });

  });
  
 
  


  
  function validateError(error) {
    let errorMessage = 'Unknown error cause';
    let errorStatus = 400;
  
    if(error.cause) {
      const sdkErrorMessage = error.cause[0].description;
      errorMessage = sdkErrorMessage || errorMessage;
  
      const sdkErrorStatus = error.status;
      errorStatus = sdkErrorStatus || errorStatus;
    }
  
    return { errorMessage, errorStatus };
  }

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);