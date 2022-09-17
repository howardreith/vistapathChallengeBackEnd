import uploadFileToS3 from '../../utils/uploadFileToS3.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';
import { STATUSES } from '../../utils/constants.js';

export default async function createCaseAnalysis(data, files) {
  const s3Data = await Promise.all((files.map((file) => uploadFileToS3(file))));
  const { caseName, notes } = data;
  const dataToSave = {
    caseName,
    notes,
    status: STATUSES.INITIATED,
    images: s3Data.map((datum) => ({
      eTag: datum.Etag,
      location: datum.Location,
      key: datum.key || datum.Key,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newCaseAnalysis = new CaseAnalysisModel(dataToSave);
  return newCaseAnalysis.save();
}
