const express = require('express');
const { default: knex } = require('knex');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'peppo3014',
  database: 'todo_app'
});

router.get('/', function (req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      console.log(error);
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

// knex対応型
// router.get('/', function (req, res, next) {
//   knex("tasks")
//     .select("*")
//     .then(function (results) {
//       console.log(results);
//       res.render('index', {
//         title: 'ToDo App',
//         todos: results,
//       });
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.render('index', {
//         title: 'ToDo App',
//       });
//     });
// });


router.post('/', function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      console.log(error);
      res.redirect('/');
    }
  );
});

// knex対応型
// router.post('/', function (req, res, next) {
//   const todo = req.body.add;
//   knex("tasks")
//     .insert({user_id: 1, content: todo})
//     .then(function () {
//       res.redirect('/')
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.render('index', {
//         title: 'ToDo App',
//       });
//     });
// });

// router.use('/signup', require('./signup'));

module.exports = router;