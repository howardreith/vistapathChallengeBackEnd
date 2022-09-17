import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';

export default async function getCaseAnalyses() {
  return CaseAnalysisModel.find();
}
