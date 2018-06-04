const app = require('./server/index.js');
const port = process.env.PORT || 3000;
const dbConnect = require('./database/connectDb.js');

app.listen(port, function() {
  console.log(`Listening on 3000`);
});
