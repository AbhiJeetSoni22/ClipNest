import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Image', imageSchema);