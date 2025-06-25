const express = require("express");
const aiRoutes = require("./routes/ai.routes")
const app = express()
const cors = require('cors')

app.use(cors())

// const allowedOrigins = ['http://localhost:5173', 'https://code-reviewer-ltx4wm9fw-tiwari786s-projects.vercel.app/'];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(cors({
  origin: ['http://localhost:5173', 'https://code-reviewer-ltx4wm9fw-tiwari786s-projects.vercel.app/'], // add both local + deployed frontend
  credentials: true,
}));

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/ai", aiRoutes)

module.exports = app;