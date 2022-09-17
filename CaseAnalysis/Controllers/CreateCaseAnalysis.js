import createCaseAnalysis from '../Services/CreateCaseAnalysis.js';

export default function CreateCaseAnalysisController(app) {
  app.post('/caseAnalysis/create', async (req, res) => {
    createCaseAnalysis().then((response) => {
      res.status(201).send({
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
