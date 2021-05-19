import express from 'express';

const app = express();
// const port = 5000;

app.get('/api/credentials', (_request, response) => {
  response.end('All credentials requested');
});
