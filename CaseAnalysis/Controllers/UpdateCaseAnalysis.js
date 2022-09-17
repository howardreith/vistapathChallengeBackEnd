import multer from 'multer';
import updateCaseAnalysis from '../Services/UpdateCaseAnalysis.js';

const multerUpload = multer({ dest: '/tmp' });

export default function UpdateCaseAnalysisController(app) {
  app.post('/caseAnalysis/update', multerUpload.array('files'), async (req, res) => {
    const { body } = req;
    const { files } = req;
    updateCaseAnalysis(body, files).then((response) => {
      res.status(200).send({
        status: 'OK',
        data: response,
      });
    }).catch((err) => {
      res.status(400).send({
        status: 'Bad Request',
        data: err,
      });
    });
  });
}
