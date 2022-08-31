const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const app = express();
const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key')
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt')
const db = require('./database');
const { pool } = require('./database');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static')); //gia prospelash tou css
app.set('view engine', 'ejs');




app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 100000000 },
  resave: false,
  saveUninitialized: false
}));
app.use(flash());


//flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})




app.get('/', (req, res) => {
  res.render('login', { message: flash('success', 'error') });
});
app.get('/signup.ejs', (req, res) => {
  res.render('signup')
});
app.get('/login.ejs', (req, res) => {
  res.render('login')
});

app.get('/camera', (req, res) => {
  res.render('camera');
});



//registration handler
app.post("/register", async (req, res) => {
  let { email, username, password, secpassword } = req.body;

  let errors = [];

  console.log({
    email,
    username,
    password,
    secpassword
  });

  if (!email || !username || !password || !secpassword) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long." });
  }
  if (password.match(/[a-z]+/) == null) {
    errors.push({ message: "Passwords must contain at least a small letter." });
  }
  if (password.match(/[A-Z]+/) == null) {
    errors.push({ message: "Passwords must contain at least one capital letter." });
  }
  if (password.match(/[0-9]+/) == null) {
    errors.push({ message: "Passwords must contain at least one number." });
  }
  if (password.match(/[$@#&!]+/) == null) {
    errors.push({ message: "Passwords must contain at least one symbol ($@#&!)" });
  }

  if (password !== secpassword) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("signup", { errors, email, username, password, secpassword });
  } else {
    // Validation passed
    pool.query(
      `SELECT * FROM people
          WHERE email = $1 OR username = $2`,
      [email, username],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          req.flash('error', 'Email or username already in use');
          return res.render('signup');

        } else {
          pool.query(
            `INSERT INTO people (username, password, email)
                  VALUES ($2, $3, $1)`,
            //RETURNING user_ID, password`,
            [email, username, password],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success", "You are now registered. Please log in");
              res.render('login');
            }
          );
        }
      }
    );
  }
});

//login handler
app.post("/login/home", async (req, res) => {
  let { username, password } = req.body;

  const sql = "SELECT username FROM people WHERE username = $1 and password = $2"
  const result = await pool.query(sql,
    [req.body.username, req.body.password]);


  //fail
  if (result.rowCount === 0) {
    req.flash('error', 'Your username or password is wrong. ');
    res.redirect('/');
  }
  else {
    req.flash('success', 'You are now logged in. ')
    req.session.username = req.body.username;
    req.session.password = req.body.password;

    pool.query(
      `SELECT status FROM people
          WHERE username = $1`,
      [req.session.username],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        //Ayto einai ena test gia to pos mporei na vlepei poio einai to status toy kata to login
        //console.log(results.rows[0].status);
        console.log(results.rows[0].status)
        console.log(req.session.username)
      }
    );


    //console.log(req.session.username, req.session.password,req.session.status)
    res.render('home');
  }
});






app.get("/get/info", (req, res) => {
  
  pool.query(`SELECT status FROM people WHERE username = $1`,
        [req.session.username],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(req.session.username)
          console.log(results.rows[0].status)
          var data = results.rows[0].status
          res.send(data.toString())
        }
      )

      
  //kapos edo tha paiksei mpala ayto stelnei ta dedomena mprosta sto ajax apo ekei kai pera 
  //edo pera tha kano query kai tha pairno apo to username to status toy tupoy kai apo to statoys 
  //tha koitao to allo table kai tha paizo me oti exei kai epitrepei ekeino to table
})


//----------------------------- lamp handlers ----------------------------------------------------|

//allagh state tis lampas
app.get("/get/on/off", (req, res) => {

  pool.query(`SELECT power FROM device_values WHERE id=1`,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      var value = results.rows[0].power;
      //console.log(results.rows[0].power);
      res.send(results.rows[0].power)


      if (value == "#FF5252") {
        // State before change was OFF 
        var lamp_status = 0;
      }
      else {
        // State before change was ON 
        var lamp_status = 1;
      }

      if (lamp_status == 0) {
        pool.query(`UPDATE device_values SET power = '#00FF00' WHERE id = 1`),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        console.log('Change power succesful from OFF to ON \n')
      }
      else
        pool.query(`UPDATE device_values SET power = '#FF5252' WHERE id = 1`),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
      console.log('Change power succesful from ON to OFF \n')

    }

  )

  //εδω τωρα πρεπει να μπει να εχουμε μηνυμα επιτυχιας η αποτυχιας 
  //και την νεα τιμη
})

//allagh state tis lampas
app.post("/get/diming", (req, res) => {

  const percent = JSON.parse(JSON.stringify(req.body));
  console.log(percent.value)

  pool.query(`UPDATE device_values SET intensity = $1 WHERE id=1`,
    [percent.value],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send("Update of slider in db ...DONE")
    }

  )
})

//allagh rgb color lights
app.post("/change/color", (req, res) => {

  //genika pairnoyme tin thesi ston pinaka tis uparxousas timis kai tinpame mprosta
  //oste na kserei poia eixame kai na valei tin epomeni

  var colors = ['#E0E0E0', '#FF0000', '#FF8000', '#00CC00', '#0000FF']

  pool.query(`SELECT color FROM device_values WHERE id=1`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      var current = results.rows[0].color
      var num = colors.indexOf(current)

      //console.log(num)

      if (num == colors.length - 1) {
        num = -1
        var next_col = 0
      }
      else {
        var next_col = num + 1
        //console.log(next_col)
      }

     
      console.log(num + "\n")
      res.send(next_col.toString())


      pool.query(`UPDATE device_values SET color = $1 WHERE id=1`,
        [colors[next_col]],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log("database update ok")
        }

      )
    }
  )


})

//allagh state tis lampas
app.get("/smode/on/off", (req, res) => {

  pool.query(`SELECT smode FROM device_values WHERE id=1`,
    (err, results) => {
      if (err) {
        console.log(err);
      }

      var value = results.rows[0].smode;
      console.log(results.rows[0].smode);
      res.send(results.rows[0].smode)


      if (value == "#FF5252") {
        // State before change was OFF 
        var smode_status = 0;
      }
      else {
        // State before change was ON 
        var smode_status = 1;
      }

      if (smode_status == 0) {
        pool.query(`UPDATE device_values SET smode = '#00FF00' WHERE id = 1`),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        console.log('Change smode succesful from OFF to ON \n')
      }
      else
        pool.query(`UPDATE device_values SET smode = '#FF5252' WHERE id = 1`),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
      console.log('Change smode succesful from ON to OFF \n')

    }

  )

  //εδω τωρα πρεπει να μπει να εχουμε μηνυμα επιτυχιας η αποτυχιας 
  //και την νεα τιμη
})

//----------------------------- lamp handlers ----------------------------------------------------|





app.get("/create/panel", (req, res) => {
  pool.query(`SELECT * FROM device_permissions WHERE ID=1; 
  SELECT * FROM device_attributes WHERE ID=1; SELECT * FROM device_values WHERE ID=1;
  SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'device_values'; 
  SELECT * FROM device_functions WHERE ID=1;`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      //console.log(results[0].rows) //permissions
      //console.log(results[1].rows) //attributes 
      //console.log(results[2].rows) //values
      //console.log(results[3].rows) //column names
      //console.log(results[4].rows) //functions 

      var first_res = results;


      //Apo edw pairnoyme to status tou user kai to stelno mazi me ta dedomena tou panel
      pool.query(`SELECT status FROM people WHERE username = $1`,
        [req.session.username],
        (err, results) => {
          if (err) {
            console.log(err);
          }
    
          var status = results.rows[0].status

          var data = [first_res, status]
          
          res.send(data)
        }
        
      )
    
    })

})










const https = require('https');
const server = https.createServer({ key, cert }, app);



const port = 3000;

//bazo to proto otan thelo na douleuei se https kai gia kinita
/*
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});
*/
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

