import getCaseAnalyses from '../Services/GetCaseAnalyses.js';

export default function GetCaseAnalysesController(app) {
  app.get('/caseAnalysis/getAll', async (req, res) => {
    getCaseAnalyses().then((response) => {
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
