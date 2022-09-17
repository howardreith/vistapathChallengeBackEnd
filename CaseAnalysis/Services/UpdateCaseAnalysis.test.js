import { clearDatabase, connectToInMemoryDb, disconnectFromInMemoryDb } from '../../utils/testHelpers.js';
import { STATUSES } from '../../utils/constants.js';
import CaseAnalysisModel from '../Models/CaseAnalysisModel.js';
import updateCaseAnalysis from './UpdateCaseAnalysis.js';

describe('UpdateCaseAnalysis', () => {
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
    await validDataToSave2.save();
  });

  it('should update a case analysis with incoming data', async () => {
    // TODO Implement tests for adding images
    // Difficult to do presently due to current version of Jest not
    // playing well with mocking modules.
    const data = {
      caseName: 'New Case', notes: 'very new', id: savedData1._id, filesToDelete: [],
    };
    const files = [];
    const result = await updateCaseAnalysis(data, files);
    expect(result._id).toEqual(savedData1._id);
    expect(result.updatedAt).not.toEqual(savedData1.createdAt);
    expect(result.status).toEqual(STATUSES.INITIATED);
    expect(result.caseName).toEqual(data.caseName);
    expect(result.notes).toEqual(data.notes);

    const updatedDatabaseEntry = await CaseAnalysisModel.findById(savedData1._id.toString());
    expect(updatedDatabaseEntry.updatedAt).toEqual(result.updatedAt);
    expect(updatedDatabaseEntry.caseName).toEqual(data.caseName);
    expect(updatedDatabaseEntry.notes).toEqual(data.notes);
  });

  it('should update a case analysis with just a status change', async () => {
    const data = {
      id: savedData1._id, status: STATUSES.REJECTED,
    };
    const result = await updateCaseAnalysis(data);
    expect(result._id).toEqual(savedData1._id);
    expect(result.updatedAt).not.toEqual(savedData1.createdAt);
    expect(result.status).toEqual(STATUSES.REJECTED);

    const updatedDatabaseEntry = await CaseAnalysisModel.findById(savedData1._id.toString());
    expect(updatedDatabaseEntry.status).toEqual(STATUSES.REJECTED);
  });
});
