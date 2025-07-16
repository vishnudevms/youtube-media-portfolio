const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Connect to MongoDB (local)
mongoose.connect('mongodb+srv://vishnudev0970:u6sLOWO2i1XWS89l@angel.5wd1mdd.mongodb.net/?retryWrites=true&w=majority&appName=Angel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const episodeSchema = new mongoose.Schema({
  title: String,
  youtubeUrl: String,
}, { timestamps: true });
const Episode = mongoose.model('Episode', episodeSchema);

app.use(cors());
app.use(express.json());

app.post('/api/episodes', async (req, res) => {
  const { title, youtubeUrl } = req.body;
  try {
    const episode = new Episode({ title, youtubeUrl });
    await episode.save();
    res.json({ success: true, episode });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


app.get('/api/episodes', async (req, res) => {
  try {
    const episodes = await Episode.find().sort({ _id: -1 });
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/episodes/:id', async (req, res) => {
  try {
    await Episode.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});