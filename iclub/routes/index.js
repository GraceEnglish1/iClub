var express = require('express');
var router = express.Router();

const CLIENT_ID ='777390567095-m2jtui5tvtuaut3ks0jkmuka9lmjobue.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const argon2 = require('argon2');

/* GET home page remove express deafult. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login.html', function(req, res, next) {
  res.sendFile('login.html', { root: '../../' });
  next();
});

/* GET clubs search page */
router.get('/clubs.html', function(req, res, next) {
  res.sendFile('clubs.html', { root: '../../' });
  next();
});

/* GET clubs info pages dynamically */
router.get('/club_info.html', function(req, res, next) {
  res.sendFile('clubs.html', { root: '../../' });
  next();
});

/* GET home page */
router.get('/home.html', function(req, res, next) {
  res.sendFile('home.html', { root: '../../' });
  next();
});

/* GET clubs by type id */

router.get('/clubs', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM clubs WHERE club_type_id=?";
    connection.query(query, [req.query.type], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* GET clubs by type id */

router.get('/allclubs', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM clubs";
    connection.query(query, function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* CHANGE session club id */
router.get('/session', function(req, res, next) {
  req.session.clubID = req.query.clubID;
  res.send("It works" + req.session.clubID);
});


router.get('/club_info', function(req, res, next) {
  let id = req.session.clubID;
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM clubs WHERE id=?";
    connection.query(query, [id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET events by club id
router.get('/events', function(req, res, next) {
  let id = req.session.clubID;
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM posts WHERE club_id=? AND post_type_id=?";
    connection.query(query, [id, 1], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET annoucements by club id
router.get('/updates', function(req, res, next) {
  let id = req.session.clubID;
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM posts WHERE club_id=? AND post_type_id=?";
    connection.query(query, [id, 2, 1], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* GET degrees */

router.get('/degrees', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM degrees";
    connection.query(query, function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* POST login */
router.post('/login', async function(req, res, next) {

  if('client_id' in req.body && 'credential' in req.body){
      const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      var query2 = "SELECT id, email, permissions FROM person WHERE email=?";
      req.pool.getConnection(function(err, connection){
        if(err){
          res.sendStatus(500);
          return;
        }
        connection.query(query2,[payload.email], function(err2, rows2, fields){
          connection.release();
          if(err2){
            res.sendStatus(500);
            return;
          }
          if(rows2.length > 0){
            req.session.user_id = rows2[0].id;
            req.session.user_permissions = rows2[0].permissions;
            req.session.user_email = rows2[0].email;
            res.json(req.session.user_id);
          } else {
            res.sendStatus(401);
          }
        });
      });

      // res.end();
  } else if('user_email' in req.body && 'pass' in req.body){

    var query = "SELECT id, email, pass, permissions FROM person WHERE email=?";
    req.pool.getConnection(function(err, connection){
      if(err){
        res.sendStatus(500);
        return;
      }
      connection.query(query,[req.body.user_email], async function(err2, rows, fields){
        connection.release();
        if(err2){
          res.sendStatus(500);
          return;
        }
        if(rows.length > 0){
          if(await argon2.verify(rows[0].pass, req.body.pass)){
            let [user] = rows;
            delete user.pass;
            // removes password before storing
            req.session.user_id = rows[0].id;
            req.session.user_permissions = rows[0].permissions;
            req.session.user_email = rows[0].email;
            res.json(req.session.user_id);
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      });
    });
  }
});

/* POST signup */
router.post('/signup', function(req, res, next) {

  req.pool.getConnection(async function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    const hash = await argon2.hash(req.body.pass);
    var query = "INSERT person(permissions, first_name, last_name, pass, email, degree, year_level) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(query,[2, req.body.first_name,
      req.body.last_name, hash, req.body.email, req.body.degree,
      req.body.year_level], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* GET permissions */

router.get('/permissions', function(req, res, next) {
  // console.log("this function works");
  // res.send("this works");
  if('user_permissions' in req.session){
    res.send(req.session.user_permissions);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
