import express from 'express';
import search from "./search";
const router = express.Router();

router.route("/search")
  .get(search);


module.exports = router;
