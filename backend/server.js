import express from "express";
import router from "./routes/todo.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json())
app.use('/todoAPI', router);

app.get('/', (req, res) => {
  console.log('I am here');
  res.send('Hi there!')
})

const port =  4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
