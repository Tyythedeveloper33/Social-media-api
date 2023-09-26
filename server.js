const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// creates the connection
 db.once('open', () =>{
     app.listen(PORT, () => {
         console.log(`API server running on port ${PORT}!`);
     });
 });

// app.get('/allUsers', async (req, res) => {
//   try {
//     const result = await Users.find({}).populate('friends').populate('thoughts');
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get('/sum-price', async (req, res) => {
//   try {
//     const result = await Book
//       .aggregate([
//         { $match: { inStock: true } },
//         {
//           $group: {
//             _id: null,
//             sum_price: { $sum: '$price' },
//             avg_price: { $avg: '$price' },
//             max_price: { $max: '$price' },
//             min_price: { $min: '$price' },
//           },
//         },
//       ]);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


