import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// const API_KEY = process.env.VITE_RAPIDAPI_KEY;
// const API_HOST = process.env.VITE_RAPIDAPI_HOST;
const API_KEY = process.env.VITE_RAPIDAPI_KEY;
const API_HOST = process.env.VITE_RAPIDAPI_HOST;
const app = express();
app.use(cors());

app.get('/api/jobs', async (req, res) => {
  const { query, page, type, date_posted } = req.query;
  try {
  const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {query, page, num_pages: 1,date_posted},
      headers: {'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST},
    });

    res.json(response.data);
  } catch (err) {
    // console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(3001, () => console.log('✅ Server running on http://localhost:3001'));