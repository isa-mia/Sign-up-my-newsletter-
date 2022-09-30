const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { response } = require('express');
const { json } = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    member: [
      {
        email_address: email,
        status: 'subscribed',
        marge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us14.api.mailchimp.com/3.0/lists/e80c437d17';

  const options = {
    method: 'POST',
    auth: 'unimappp:69545bf390264a37b2f35a4a3f2f9f57-us14',
  };

  const request = https.request(url, options, (response) => {
    response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// e80c437d17
// 69545bf390264a37b2f35a4a3f2f9f57-us14
// https://us6.api.mailchimp.com/3.0/.
// https://us6.api.mailchimp.com/3.0/lists/57afe96172/members/62eeb292278cc15f5817cb78f7790b