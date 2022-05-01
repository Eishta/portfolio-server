const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
var data = require("./data/userInfo.json");
const blogs = require("./data/blogs.json");

const axios = require("axios");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//***************** get Blogs ***********************
const getBlogsData = (data) => {
  let { link, image } = data.feed;
  let { items } = data;
  return { link, image, items };
};
const url =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@eishta";

app.get("/api/getBlogs", (req, res) => {
  axios({ method: "get", url })
    .then((response) => {
      console.log("Success");
      res.send(getBlogsData(response.data));
    })
    .catch((err) => {
      console.log("Fail");
      res.send(getBlogsData(blogs));
    });
});

// **************************************************

app.get("/api/getUserDetails", (req, res) => {
  res.json({ userInfo: data });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
