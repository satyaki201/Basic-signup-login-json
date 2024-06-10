const express = require('express');
const app = express();
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(function (req, res, next) {
  next();
});
app.use(express.static('./public'));

// route
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/ejs', function (req, res) {
  res.render("index");
});

app.get('/contact', function (req, res) {
  res.send('Contact Kar BC');
});

// Dynamic URL
app.get('/profile', function (req, res) {
  const user = req.query.user;
  console.log(user);
  if (user) {
    res.render('profile', { user: JSON.parse(user) });
  } else {
    res.send('No user data found.');
  }
});

app.get('/success-login', function (req, res) {
  res.send('Login successful!');
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Form Data:', formData);

  fs.readFile('my-file.json', 'utf8', function (err, data) {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
    }

    let existingData = [];
    if (data) {
      try {
        existingData = JSON.parse(data);
      } catch (parseErr) {
        console.error(parseErr);
      }
    }

    existingData.push(formData);

    fs.writeFile('my-file.json', JSON.stringify(existingData, null, 4), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing JSON file');
      }
      res.send('Form submitted successfully!');
    });
  });
});

app.post('/check-existence', (req, res) => {
  const formData = req.body;
  console.log('Form Data:', formData);

  fs.readFile('my-file.json', 'utf8', function (err, data) {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    let existingData = [];
    if (data) {
      try {
        existingData = JSON.parse(data);
      } catch (parseErr) {
        console.error(parseErr);
        return res.status(500).send('Error parsing JSON file');
      }
    }

    let isUserFound = false;
    let user = null;

    for (const item of existingData) {
      if (item.mail === formData.mail && item.pass === formData.password) {
        user = item;
        isUserFound = true;
        break;
      }
    }

    if (isUserFound) {
      console.log('Login successful');
      res.redirect(`/profile?user=${encodeURIComponent(JSON.stringify(user))}`);
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
