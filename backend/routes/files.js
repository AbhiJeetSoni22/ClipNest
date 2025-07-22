import express from 'express';
import multer from 'multer';
import path from 'path';
import Folder from '../models/Folder.js';
import Image from '../models/Image.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create folder
router.post('/folders', auth, async (req, res) => {
  const { name, parentId } = req.body;
  const numberOfFiles =  0;

  try {
    const folder = new Folder({
      name,
      userId: req.user.userId,
      parentId: parentId || null,
      numberOfFiles,
    });
    await folder.save();
  
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get folders
router.get('/folders', auth, async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.userId });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// update folder
router.put('/folders/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const folder = await Folder.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    )
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// detete folder 
router.delete('/folders/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Folder.findByIdAndDelete(id);
    await Image.deleteMany({ folderId: id });
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Upload image
router.post('/images', auth, upload.single('image'), async (req, res) => {
  const { name, folderId } = req.body;
  try {
    const image = new Image({
      name,
      path: req.file.path,
      userId: req.user.userId,
      folderId: folderId || null,
    });
    await image.save();
     await Folder.findByIdAndUpdate(
      folderId,
      { $inc: { numberOfFiles: 1 } },
      { new: true }
    );

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get images
router.get('/images', auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.userId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search images
router.get('/images/search', auth, async (req, res) => {
  const { query } = req.query;
  try {
    const images = await Image.find({
      userId: req.user.userId,
      name: { $regex: query, $options: 'i' },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;