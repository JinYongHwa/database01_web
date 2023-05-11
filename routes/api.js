var express = require('express');
var router = express.Router();

router.post("/join", async function (req, res) {
    console.log(req.body)
    var [rows] = await connection.query("select * from user where id = ?", [req.body.id])

    if (rows.length == 0) { //회원가입 가능
        var [rows] = await connection.query("insert into user(id, password, name,email) values(?,?,?,?)",
            [req.body.id, req.body.password, req.body.name, req.body.email])

        //회원가입 성공
        res.render("join", { message: "회원가입 성공" })
    }
    else {  //동일한 아이디로 가입된 회원이 있음
        res.render("join", { message: "이미 가입된 아이디입니다" })
    }
    /*
    connection.query("select * from user where id = ?", [req.body.id],
        function (err, rows) {
            console.log(rows)
            if (rows.length == 0) { //회원가입 가능
                connection.query("insert into user(id, password, name,email) values(?,?,?,?)",
                    [req.body.id, req.body.password, req.body.name, req.body.email],
                    function (err, rows) {

                    })
            }
            else {   //동일한 아이디로 가입된 회원이 있음

            }
        })*/

})


router.post("/login", async function (req, res) {
    console.log(req.body)
    var [rows] = await connection.query("select * from user where id = ? and password = ?",
        [req.body.id, req.body.password])

    console.log(rows)
    if (rows.length == 0) {//로그인 실패
        res.render("index", { message: "아이디 또는 패스워드가 일치하지 않습니다" })
    }
    else {   //로그인 성공
        req.session.user = rows[0]
        res.redirect("/main")
    }
})
router.post("/namecard/create", async function (req, res) {
    console.log(req.body)
    await connection.query(`insert into namecard(name,department,title, phone, email, address,web, userId)
                            values(?,?,?,?,?,?,?,?)`,
        [req.body.name, req.body.department,
        req.body.title, req.body.phone,
        req.body.email, req.body.address, req.body.web,
        req.session.user.id])

    res.redirect("/main")
})


module.exports = router
