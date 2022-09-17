import { clearDatabase, connectToInMemoryDb, disconnectFromInMemoryDb } from '../../utils/testHelpers.js';
import createCaseAnalysis from './CreateCaseAnalysis.js';
import { STATUSES } from '../../utils/constants.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';

describe('CreateCaseAnalysis', () => {
  beforeAll(async () => {
    await connectToInMemoryDb();
  });

  afterAll(async () => {
    await disconnectFromInMemoryDb();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should create a case analysis', async () => {
    const result = await createCaseAnalysis();
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
    expect(result.status).toEqual(STATUSES.INITIATED);
    expect(result.caseName).toEqual('');
    expect(result.notes).toEqual('');
    expect(result.images).toEqual([]);
    const resultInDb = CaseAnalysisModel.findById(result._id.toString());
    expect(resultInDb).toBeTruthy();
  });
});
