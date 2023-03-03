const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.post("/url/shorten", urlController.urlShortener);
router.get("/:urlCode", urlController.getUrl);

router.all("*", function (req, res) {
  return res.status(404).send({
    status: false,
    message: `${req.originalUrl} URL not found on server !!!`,
  });
});

module.exports = router;
