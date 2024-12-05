const express = require("express");
const cors = require("cors");
const videos = require("./videos.json");

const app = express();
app.use(cors());

app.get("/videos", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedVideos = videos.slice(startIndex, endIndex);
  res.json({
    page,
    limit,
    total: videos.length,
    results: paginatedVideos,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
