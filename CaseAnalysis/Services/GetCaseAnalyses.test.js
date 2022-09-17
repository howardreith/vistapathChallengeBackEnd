import { clearDatabase, connectToInMemoryDb, disconnectFromInMemoryDb } from '../../utils/testHelpers.js';
import createCaseAnalysis from './CreateCaseAnalysis.js';
import { STATUSES } from '../../utils/constants.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';
import getCaseAnalyses from './GetCaseAnalyses.js';

describe('GetCaseAnalyses', () => {
  beforeAll(async () => {
    await connectToInMemoryDb();
  });

  afterAll(async () => {
    await disconnectFromInMemoryDb();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  let savedData1;
  let savedData2;

  beforeEach(async () => {
    const validData1 = {
      caseName: 'Bananas',
      notes: 'in pajamas',
      status: STATUSES.INITIATED,
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const validDataToSave1 = new CaseAnalysisModel(validData1);
    savedData1 = await validDataToSave1.save();

    const validData2 = {
      caseName: 'Pineapple',
      notes: 'is sweet',
      status: STATUSES.APPROVED,
      images: [{
        eTag: '32sd98f89s8f',
        location: 'https://howiereith.com',
        key: '1337key',
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const validDataToSave2 = new CaseAnalysisModel(validData2);
    savedData2 = await validDataToSave2.save();
  });

  it('should fetch all case analyses', async () => {
    const result = await getCaseAnalyses();
    expect(result[0]._id.toString()).toEqual(savedData1._id.toString());
    expect(result[1]._id.toString()).toEqual(savedData2._id.toString());
    expect(result.length).toEqual(2);
    expect(result[1].images.length).toEqual(1);
    ['createdAt', 'updatedAt', 'status', 'caseName', 'notes'].forEach((prop) => {
      expect(result[0][prop]).toBeTruthy();
      expect(result[1][prop]).toBeTruthy();
    });
  });
});
