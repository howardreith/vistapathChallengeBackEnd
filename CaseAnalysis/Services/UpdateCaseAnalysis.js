import uploadFileToS3 from '../../utils/uploadFileToS3.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';
import { STATUSES } from '../../utils/constants.js';

export default async function updateCaseAnalysis(data, files) {
  const {
    caseName, notes, id, filesToDelete,
  } = data;
  const caseAnalysisCurrentlyInDb = await CaseAnalysisModel.findById(id);
  let imagesInDb = [...caseAnalysisCurrentlyInDb.images];
  if (filesToDelete) {
    imagesInDb = imagesInDb.filter((image) => !filesToDelete.includes(image.key));
  }
  const s3Data = await Promise.all((files.map((file) => uploadFileToS3(file))));
  const formattedS3Data = s3Data.map((datum) => ({
    eTag: datum.Etag,
    location: datum.Location,
    key: datum.key || datum.Key,
  }));
  const finalImagesData = [...imagesInDb, ...formattedS3Data];
  const dataToSave = {
    caseName,
    notes,
    images: finalImagesData,
    updatedAt: new Date(),
  };
  await CaseAnalysisModel.findByIdAndUpdate(id, dataToSave);
  return CaseAnalysisModel.findById(id);
  // const newCaseAnalysis = new CaseAnalysisModel(dataToSave);
  // return newCaseAnalysis.save();
}
