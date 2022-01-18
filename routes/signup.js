const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    knex("tasks")
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
      });
    });
});

router.post('/', function (req, res, next) {
    const todo = req.body.add;
    knex("tasks")
      .insert({user_id: 1, content: todo})
      .then(function () {
        res.redirect('/')
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
        });
      });
  });

router.use('/signup', require('./signup'));


module.exports = router;



//     connection.query(
//         `select * from users where ({name: username}) `,
//         (error,result)=>{
//             if(result.length!==0){
//                 res.render("signup", {
//                     title: "Sign up",
//                     errorMessage: ["このユーザ名は既に使われています"],
//                     })
//             }else if(password === repassword){
//                 `insert into users value ({name: username, password: password})`,
//                 res.redirect("/");
//             }else{
//                 res.render("signup", {
//                     title: "Sign up",
//                     errorMessage: ["パスワードが一致しません"],
//                     });
//                 }
//             }
//         )
//     });