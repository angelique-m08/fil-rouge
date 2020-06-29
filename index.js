const express = require('express');
const app = require('./app');
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    throw new Error(`An error ocurred: ${err.message}`);
  }
  console.log(`Server is listening on ${port}`);
});
