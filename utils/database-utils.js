const dbConnection = (err) => {
  if (err) {
    console.log('db not connected ❌')
  } else {
    console.log('db connected ✅')
  }
}

const db = 'mongodb://localhost:27017/gentech-users-database-tues'
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = {
  db,
  dbOptions,
  dbConnection
}
