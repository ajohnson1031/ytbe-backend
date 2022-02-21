const router = require("express").Router();
const ytdl = require("ytdl-core");

router.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

router.get("/search", async (req, res) => {
  const { URL } = req.query;
  try {
    const vidInfo = await ytdl.getInfo(URL);
    vidInfo.formats = vidInfo.formats.filter(
      (vid) =>
        vid.mimeType.includes("video/mp4") &&
        vid.hasAudio &&
        Number(vid.height) <= 1080 &&
        Number(vid.height) >= 360
    );
    res
      .status(200)
      .json({ formats: vidInfo.formats, details: vidInfo.videoDetails });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
});

router.get("/download", (req, res) => {
  const { title, url, mp3 } = req.query;
  try {
    if (mp3 === "false") {
      res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
      ytdl(url, {
        format: "mp4",
      }).pipe(res);
    }

    if (mp3 === "true") {
      res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);
      ytdl(url, {
        filter: "audioonly",
      }).pipe(res);
    }
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
