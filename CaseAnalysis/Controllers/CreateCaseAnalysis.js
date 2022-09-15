import multer from 'multer';
import createCaseAnalysis from '../Services/CreateCaseAnalysis.js';

const multerUpload = multer({ dest: '/tmp' });

export default function CreateCaseAnalysisController(app) {
  app.post('/caseAnalysis/create', multerUpload.array('files'), async (req, res) => {
    const { body } = req;
    const { files } = req;
    createCaseAnalysis().then((response) => {
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
