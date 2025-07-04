import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true,
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan('dev'));

//Routes
import userRoutes from './routes/user.routes.js';
import customerRoutes from './routes/customer.routes.js'
import milkEntryRoutes from './routes/milkentry.routes.js';

//http://localhost:8000/api/v1/users/register
app.use('/api/v1/users', userRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/milkentry", milkEntryRoutes);

//Error Handling middleware
app.use((err, req, res, next) => {
  console.error(" 🥺 Error:", err.message); // Logs the error for debug

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export {app};