import app from "./app";

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

export default app;
