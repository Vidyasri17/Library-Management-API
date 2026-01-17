import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import fineRoutes from './routes/fineRoutes.js';

const app = express();

app.use(express.json());

// routes

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/transactions', transactionRoutes);
app.use('/fines', fineRoutes);

// test route
app.get('/', (req, res) => {
  res.send("Library Management API is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
