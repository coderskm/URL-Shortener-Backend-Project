const urlModel = require("../models/urlModel");
const shortid = require("shortid");
const axios = require("axios");

const isValidBody = function (x) {
  return Object.keys(x).length > 0;
};

const isvalid = function (x) {
  if (typeof x === "undefined" || x === null) return false;
  if (typeof x === "string" && x.trim().length === 0) return false;
  return true;
};

const urlShortener = async function (req, res) {
  try {
    if (!isValidBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "Provide the longUrl in the body." });

    let longUrl = req.body.longUrl;
    if (!isvalid(longUrl))
      return res
        .status(400)
        .send({ status: false, message: "Provide the longUrl in the body." });

    let found = false;
    await axios
      .get(longUrl)
      .then((response) => {
        if (response.status == 200 || response.status == 201) found = true;
      })
      .catch((error) => {
        console.log(error);
      });
    if (found == false)
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid URL." });

    let urlPresent = await urlModel
      .findOne({ longUrl })
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 });
    if (urlPresent)
      return res.status(200).send({
        status: true,
        message: "urlCode is already generated for this URL.",
        data: urlPresent,
      });

    let urlCode = shortid.generate(longUrl);
    let shortUrl = "http://localhost:3000/" + urlCode;
    let data = { longUrl, shortUrl, urlCode };

    let urlGenerated = await urlModel.create(data);
    let result = {
      longUrl: urlGenerated.longUrl,
      shortUrl: urlGenerated.shortUrl,
      urlCode: urlGenerated.urlCode,
    };
    return res.status(201).send({ status: true, data: result });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getUrl = async function (req, res) {
  try {
    let urlCode = req.params.urlCode;
    let urlDoc = await urlModel.findOne({ urlCode });
    if (!urlDoc)
      return res.status(404).send({
        status: false,
        message: "URL doesn't exist. Please provide a valid URL code.",
      });

    return res.status(200).redirect(urlDoc.longUrl);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { urlShortener, getUrl };
