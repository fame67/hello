const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   return cb(null,'./upload');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
})
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('homepage');
});
app.post('/uploads', upload.single('profileImage'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect('/');
});
// Global error handling
app.use((err, req, res, next) => {
  return res.status(400).send({
    error: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
