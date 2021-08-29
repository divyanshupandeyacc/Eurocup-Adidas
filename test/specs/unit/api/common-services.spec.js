import { fakeApiService, axiosMock } from '../../../libs/utils/axios';
import mockDataAreas from '../../../mocks/COMMON-SERVICE/GETAREAS.mock';
import mockDataSubArea from '../../../mocks/COMMON-SERVICE/GETSUBAREAS.mock';
import mockPlayersListData from '../../../mocks/COMMON-SERVICE/GETPLAYERSLIST.mock';
import mockCompetitionsData from '../../../mocks/COMMON-SERVICE/GETCOMPETITIONS.mock';

// Test suit for common-services all methods
describe('API validations', () => {
	// Test suit for getAreas - start
	describe('make getAreas request', () => {
		let responseObj;
		beforeAll(async () => {
			jest.clearAllMocks();

			//work
			axiosMock(mockDataAreas).get.mockResolvedValue(mockDataAreas);
			const { data } = await fakeApiService.get(`/areas/`);
			responseObj = data;
		});

		it('should return data', () => {
			//assertions
			expect(Object.keys(responseObj).length).toBeGreaterThan(1);
			expect(responseObj.areas.length).toBeGreaterThanOrEqual(0);
		});
	});
	// end

	// Test suit for getSubArea - start
	describe('make getSubAreas request', () => {
		let responseObj;
		beforeAll(async () => {
			jest.clearAllMocks();

			//work
			axiosMock(mockDataAreas).get.mockResolvedValue(mockDataAreas);
			const { data } = await fakeApiService.get(`/areas/2000`);
			responseObj = data;
		});
		it('should return data', () => {
			jest.clearAllMocks();
			axiosMock(mockDataAreas).get.mockResolvedValue(mockDataAreas);

			//assertions
			expect(Object.keys(responseObj).indexOf('childAreas')).toBeGreaterThan(1);
			expect(responseObj.childAreas.length).toBeGreaterThanOrEqual(0);
		});
		it('should get() called', async () => {
			axiosMock().get.mockImplementationOnce(() => {
				Promise.resolve(mockDataSubArea);
			});
			const { data } = await fakeApiService.get(`/areas/2001`);
			responseObj = data;

			//assertion
			expect(responseObj.childAreas.length).toBeGreaterThanOrEqual(0);
		});
	});
	// end

	// Test suit for getCompetitions - start
	describe('make getCompetitions request', () => {
		let responseObj;
		beforeAll(async () => {
			jest.clearAllMocks();

			//work
			const { data } = await fakeApiService.get(`/competitions`);
			responseObj = data;
		});
		it('should return data', () => {
			jest.clearAllMocks();
			axiosMock(mockCompetitionsData).get.mockResolvedValue(mockCompetitionsData);

			//assertions
			expect(Object.keys(responseObj).indexOf('competitions')).toBeGreaterThan(1);
			expect(responseObj.competitions.length).toBeGreaterThanOrEqual(0);
		});
	});
	// end

	// Test suit for getMatches API - start
	describe('make getMatches request', () => {
		let responseObj;
		beforeAll(async () => {
			jest.clearAllMocks();

			//work
			const { data } = await fakeApiService.get(`/matches`);
			responseObj = data;
		});
		it('should return data with attribute "mathces"', () => {
			//assertions
			expect(Object.keys(responseObj).indexOf('matches')).toBeGreaterThan(1);
		});
		it('should return array as []', () => {
			//assertions
			expect(responseObj.matches.length).toBeGreaterThanOrEqual(0);
		});
		it('should return count same as data length ', () => {
			//assertions
			expect(responseObj.matches.length === responseObj.count).toBeTruthy();
		});
	});
	// end

	// Test suit for getPlayersList - start
	describe('make getPlayersList request', () => {
		let responseObj;
		beforeAll(async () => {
			jest.clearAllMocks();
			//work
			axiosMock(mockPlayersListData).get.mockResolvedValue(mockPlayersListData);
			const { data } = await fakeApiService.get(`/teams/17`);
			responseObj = data;
		});
		it('should return data with attribute "mathces"', () => {
			//assertions
			expect(Object.keys(responseObj).indexOf('squad')).toBeGreaterThan(1);
		});
		it('should return array as []', () => {
			//assertions
			expect(responseObj.squad.length).toBeGreaterThanOrEqual(0);
		});
		it('should return all attribute with values', () => {
			//work
			let squadData = Object.keys(responseObj.squad);
			let status = false;
			responseObj &&
				responseObj.squad &&
				responseObj.squad.forEach((item, value) => {
					if (
						item.name &&
						item.position &&
						item.nationality &&
						item.dateOfBirth &&
						item.id &&
						item.role
					) {
						status = true;
					}
				});

			//assertions
			expect(squadData.length).toBeGreaterThanOrEqual(0);
			expect(status).toEqual(true);
		});
	});
	// end
});
