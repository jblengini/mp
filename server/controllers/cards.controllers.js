import { pool } from "../db.js";

export const getCards = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM services ORDER BY fecha_creacion ASC"
    );
    res.json(result);
    //console.log(res.json(result));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getForm = async (req, res) => {
  try {
    var mercadoPagoPublicKey ="TEST-1b823431-863d-47f7-8b65-22d300acecd3"
    var mascots = [
      {name: 'Sammy', organization: 'DigitalOcean', birth_year: 2012},
      {name: 'Tux', organization: 'Linux', birth_year: 1996},
      {name: 'Moby Dick', organization: 'Docker', birth_year: 2013},
  ];
  res.status(200).render("index", { mercadoPagoPublicKey,
      myMascotsArray: mascots });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



