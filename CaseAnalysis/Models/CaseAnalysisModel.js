import mongoose from 'mongoose';
import { STATUSES } from '../../utils/constants.js';

const imageSchema = new mongoose.Schema({
  eTag: String,
  location: String,
  key: String,
});

const caseAnalysisSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  status: { type: String, enum: Object.values(STATUSES), required: true },
  caseName: { type: String, required: true },
  notes: { type: String, required: false },
  images: [{ type: imageSchema, required: false }],
});

// Mongoose does not follow JS conventions with its model constructor. Naughty mongoose!
// eslint-disable-next-line new-cap
const CaseAnalysisModel = new mongoose.model('CaseAnalysis', caseAnalysisSchema);
export default CaseAnalysisModel;
