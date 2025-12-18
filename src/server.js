import app from "./app.js";
import { connectToMongo } from "./configs/db.js";
import { envConfig } from "./configs/env.js";

connectToMongo()
  .then(() => {
    app.listen(envConfig.port, () => {
      console.info(`Server started at port ${envConfig.port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.listen(3000);
