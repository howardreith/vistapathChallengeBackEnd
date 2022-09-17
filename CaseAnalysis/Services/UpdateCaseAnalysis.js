import uploadFileToS3 from '../../utils/uploadFileToS3.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';

export default async function updateCaseAnalysis(data, files) {
  const {
    caseName, notes, id, filesToDelete, status,
  } = data;
  const caseAnalysisCurrentlyInDb = await CaseAnalysisModel.findById(id);
  let imagesInDb = [...caseAnalysisCurrentlyInDb.images];
  if (filesToDelete) {
    imagesInDb = imagesInDb.filter((image) => !filesToDelete.includes(image.key));
  }
  let s3Data = [];
  if (files) {
    s3Data = await Promise.all((files.map((file) => uploadFileToS3(file))));
  }
  const formattedS3Data = s3Data.map((datum) => ({
    eTag: datum.Etag,
    location: datum.Location,
    key: datum.key || datum.Key,
  }));
  const finalImagesData = [...imagesInDb, ...formattedS3Data];
  const dataToSave = {
    caseName: caseName || caseAnalysisCurrentlyInDb.caseName,
    notes: notes || caseAnalysisCurrentlyInDb.notes,
    status: status || caseAnalysisCurrentlyInDb.status,
    images: finalImagesData,
    updatedAt: new Date(),
  };
  await CaseAnalysisModel.findByIdAndUpdate(id, dataToSave);
  return CaseAnalysisModel.findById(id);
}
