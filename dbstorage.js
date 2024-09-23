// include the packages for levelDB
const levelup = require('levelup');
const leveldown = require('leveldown');
const db = levelup(leveldown('./mydb'))


// to create and update data on the database
exports.setItem = function(key, value) {
      db.put(key, value, function (err) {
         if (err) return console.log('Ooops!', err) // err contains the actual error message on the database operation
         // some kind of I/O error
         console.log(`saved: ${key} - ${value}`);
      })
 }

// to read data from the database based on a given key
exports.getItem = (key, callback) => {
  db.get(key, function (err, value) {
    if (err) {
      console.log('Key not found', err) // err contains the actual error message on the database operation
    } // likely the key was not found
    callback(value);
  })
}

// to delete data from the database based on a given key
exports.deleteItem = function(key) {
  db.del(key, function (err) {
    if (err) return console.log('Ooops!', err) // err contains the actual error message on the database operation
    // some kind of I/O error
    console.log(`deleted: ${key}`);
  })
}

// to read all the data from the database
exports.getAllData = function(callback) {
    db.createReadStream()
    .on('data', function (data) {
      console.log(data.key + ' -> ' + data.value);
      callback(data.key); // pass on the key/title to the callback function in index.js
    })
    .on('error', function (err) {
      console.log('Oh my!', err)
    })
    .on('close', function () {
      console.log('Stream closed')
    })
    .on('end', function () {
      console.log('Stream ended')
    })
}
