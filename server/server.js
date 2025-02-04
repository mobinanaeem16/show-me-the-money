const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3002;

app.get("/backend/balance-sheet", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api.xro/2.0/Reports/BalanceSheet"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
