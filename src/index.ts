import app from "./app";

import morgan from "morgan"

app.use(morgan("tiny"))

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
