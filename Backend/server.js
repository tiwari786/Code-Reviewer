require("dotenv").config();
const app = require("./src/app");

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
