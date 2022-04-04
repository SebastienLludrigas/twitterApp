const mongoose = require('mongoose');

mongoose
   .connect("mongodb+srv://Sebastien:Skywalker@cluster0.eydly.mongodb.net/twitter?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('connection ok'))
   .catch((err) => console.log(err));