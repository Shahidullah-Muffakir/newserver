// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/download', async (req, res) => {
  try {
    const response = await axios.get(
      'https://stagewww.utrgv.edu/it/_files/documents/iasg-gposourcedata-apr2025.xlsx',
      {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://stagewww.utrgv.edu/'
        }
      }
    );

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=data.xlsx'
    });

    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Error fetching Excel file:', error.message);
    res.status(500).json({ error: 'Failed to fetch Excel file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
