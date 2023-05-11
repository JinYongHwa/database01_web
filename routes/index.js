var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render("index", { message: null })

});
router.get("/namecard/create", function (req, res) {
  res.render("namecard/create")
})

router.get("/main", async function (req, res) {
  var [rows] = await connection.query("select * from namecard where userId = ?", [req.session.user.id])
  res.render("main", { namecardList: rows })
})


module.exports = router;
