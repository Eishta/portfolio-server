const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
var data = require('./data/userInfo.json');
const blogs = require('./data/blogs.json');

const axios = require('axios');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//***************** get Blogs *********************** 
const getBlogsData = (data) => {
  let { link , image} = data.feed;
  let { items } = data;
  return { link,image,  items }
}
const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@eishta';

app.get("/api/getBlogs", (req, res) => {
  axios({ method: 'get', url }).then(response => {
    console.log('Success')
    res.send(getBlogsData(response.data))
  })
    .catch((err) => {
      console.log('Fail')
      res.send(getBlogsData(blogs));
    });
})

// **************************************************

app.get("/api/getUserDetails", (req, res) => {
  res.json({ detail: data });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});