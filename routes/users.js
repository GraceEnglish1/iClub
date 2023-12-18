var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'keven12@ethereal.email', // generated ethereal user
    pass: 'ArZZJahZRamrtwPVPU' // generated ethereal password
  }
});

// everything under is gated by login

router.use('/', function(req, res, next){
  if(!('user_email' in req.session)){
    res.sendStatus(403);
    return;
  }
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET profile page */

router.get('/myprofile.html', function(req, res, next) {
  res.sendFile('myprofile.html', { root: '../../' });
  next();
});

/* GET profile */

router.get('/has_account', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT first_name FROM person WHERE person.id=?";
    connection.query(query,[req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.send(true);
    });
  });
});

/* GET profile */

router.get('/profile', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM person INNER JOIN degrees ON person.degree = degrees.id WHERE person.id=?";
    connection.query(query,[req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET allow rsvp
router.get('/rsvp', function(req, res, next) {
  if(req.session.user_permissions < 3){
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO personrsvptoevent(person_id, post_id) VALUES (?, ?)";
    connection.query(query, [req.session.user_id, req.query.post_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
} else{
  res.sendStatus(401);
}
});

// GET check for rsvps
router.get('/getrsvps', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM personrsvptoevent WHERE person_id=?";
    connection.query(query, [req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


router.get('/getmembers', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM persontoclub INNER JOIN person ON persontoclub.person_id = person.id WHERE club_id=?";
    connection.query(query, [req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET is manager of club
router.get('/ismanager', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT isManager FROM persontoclub WHERE person_id=? AND club_id=?";
    connection.query(query, [req.session.user_id, req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]);
    });
  });
});


// GET is joined
router.get('/isjoined', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM persontoclub WHERE person_id=? AND club_id=?";
    connection.query(query, [req.session.user_id, req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]);
    });
  });
});

// GET join club
router.get('/joinclub', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO persontoclub(person_id, club_id) VALUES (?, ?)";
    connection.query(query, [req.session.user_id, req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* GET users by person id */

router.get('/guestlist', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM personrsvptoevent INNER JOIN person ON personrsvptoevent.person_id = person.id";
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

/* POST email */
router.post('/email', function(req, res, next) {
  transporter.sendMail({
    from: "keven12@ethereal.email", // sender address
    to: req.body.recipient, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text, // plain text body
    html: "<h1>New Notification</h1><b>"+req.body.text.title+"</b><br><p>"+req.body.text.date+"</p><p>"+req.body.text.content+"</p>" // html body
  });
  res.send();
});

/* GET clubs by user id */

router.get('/memberships', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM persontoclub INNER JOIN clubs ON persontoclub.club_id = clubs.id WHERE person_id=?";
    connection.query(query, [req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* Delete club to person by person id */

router.delete('/memberships', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "DELETE FROM persontoclub WHERE person_id=? AND club_id=?";
    connection.query(query, [req.session.user_id, req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(req.session.clubID);
    });
  });
});

/* GET update email optins for updates */

router.get('/setupdatesoptin', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE persontoclub SET email_opt_in_updates = ? WHERE club_id=? AND person_id=?";
    connection.query(query,[req.query.updates_optin, req.session.clubID,
      req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(parseInt(req.session.clubID, 10));
    });
  });
});

/* GET update email optins for events */

router.get('/seteventsoptin', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE persontoclub SET email_opt_in_events = ? WHERE club_id=? AND person_id=?";
    connection.query(query,[req.query.updates_optin, req.session.clubID,
      req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(parseInt(req.session.clubID, 10));
    });
  });
});

/* POST profile */
router.post('/profile', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE person SET first_name = ?, last_name = ?, degree = ?, year_level = ? WHERE id=?";
    connection.query(query,[req.body.first_name,
      req.body.last_name, req.body.degree,
      req.body.year_level, req.session.user_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET add event
router.post('/addevent', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO posts(post_type_id, club_id, title, post_date, content, author_id, visibility_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [1, req.session.clubID, req.body.title,
      req.body.post_date, req.body.content, req.session.user_id, req.body.visibility_id
      ], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// GET add update
router.post('/addupdate', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    let date = new Date();
    var query = "INSERT INTO posts(post_type_id, club_id, title, post_date, content, author_id, visibility_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [2, req.session.clubID, req.body.title,
      date, req.body.content, req.session.user_id, req.body.visibility_id
      ], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

module.exports = router;
