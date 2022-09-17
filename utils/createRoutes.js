import CreateCaseAnalysis from '../CaseAnalysis/Controllers/CreateCaseAnalysis.js';
import GetCaseAnalyses from '../CaseAnalysis/Controllers/GetCaseAnalyses.js';
import UpdateCaseAnalysis from '../CaseAnalysis/Controllers/UpdateCaseAnalysis.js';

export default function createRoutes(app) {
  CreateCaseAnalysis(app);
  GetCaseAnalyses(app);
  UpdateCaseAnalysis(app);
}
