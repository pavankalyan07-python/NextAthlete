import express from "express";
import recordingRouter from "./routes/recording.js";

const app = express();
app.use(express.json());

app.use('/api/recording', recordingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
