import { Router } from "express";
import {
  getCards,
  getForm,
} from "../controllers/cards.controllers.js";

const router = Router();

router.get("/cards", getCards);
router.get("/paymentform", getForm);

export default router;
