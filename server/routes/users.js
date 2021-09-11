var express = require('express');
var router = express.Router();

// const marlin = { name: "Marlin", email: "marlin@gmail.com", id: 1 };
// const nemo = { name: "Nemo", email: "nemo@gmail.com", id: 2 };
// const dory = { name: "Dory", email: "dory@gmail.com", id: 3 };

// let users = [marlin, nemo, dory]
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://localhost:5432/eventonica')

async function addUser(data) {
  // note: this returns a Promise
  try{
    const newUser = await db.one('INSERT INTO users (name, email) values (\$1, \$2) RETURNING id, name, email', [data.name, data.email]);
    console.log("New User:", newUser)
    return newUser
  }catch (error) {
    console.log(error)
  }
  
}


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await db.any('SELECT * FROM users')
  try {
    res.json(users);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async function(req, res, next) {
  // save request data to a variable in routes/users.js
  return await addUser(req.body).then( async () => {
    try {
      const users = await db.any('SELECT * FROM users')
      console.log('users:', users)
      return res.json(users)
    } catch (error) {
      console.log(error)
    }
  });
});

// Delete user
router.delete('/:userId', function (req, res) {
  // save request data to a variable in routes/users.js
  const userId = req.params.userId;
  
  users = users.filter(i => {
    if(i.id != userId){
      return true; 
    } else {
      return false;
    } 
  });
  console.log(users);
  res.json(users);
});



module.exports = router;
