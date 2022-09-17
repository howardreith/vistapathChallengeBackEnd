import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';
import { STATUSES } from '../../utils/constants.js';

export default async function createCaseAnalysis() {
  const dataToSave = {
    caseName: '',
    notes: '',
    status: STATUSES.INITIATED,
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newCaseAnalysis = new CaseAnalysisModel(dataToSave);
  return newCaseAnalysis.save();
}
