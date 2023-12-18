var express = require('express');
var router = express.Router();

// everything under is gated by admin

router.use('/', function(req, res, next){
  if((req.session.user_permissions === 2 || req.session.user_permissions === 3 || !('user_permissions' in req.session))){
    res.sendStatus(403);
    return;
  }
  next();
});

/* GET users */

router.get('/allusers', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM person";
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

/* DELETE club by club id */

router.delete('/deleteclub', function(req, res, next) {
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    let clubid = req.session.clubID;
    var query = "DELETE FROM clubs WHERE id=?";
    connection.query(query, [req.session.clubID], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(parseInt(clubid,10));
    });
  });
});


/* DELETE user by user id */

router.delete('/deleteuser', function(req, res, next) {

  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "DELETE FROM person WHERE id=?";
    connection.query(query, [req.query.person_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(parseInt(req.query.person_id,10));
    });
  });
});

/* GET users by person id */

router.get('/setpermissions', function(req, res, next) {

  if(parseInt(req.query.permissions,10) === 2){
    req.session.user_permissions = 2;
  } if (parseInt(req.query.permissions,10) === 1){
    req.session.user_permissions = 1;
  }
  req.pool.getConnection(function(err, connection){
    if(err){
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE person SET permissions = ? WHERE id=?";
    connection.query(query,[req.query.permissions,
      req.query.person_id], function(err2, rows, fields){
      connection.release();
      if(err2){
        res.sendStatus(500);
        return;
      }
      res.json(parseInt(req.query.person_id, 10));
    });
  });
});

module.exports = router;
