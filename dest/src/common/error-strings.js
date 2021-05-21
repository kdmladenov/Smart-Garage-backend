import { visit as visitErrors } from './constants.js';
export var user = {
    email: '',
    password: '',
};
export var service = {};
export var vehicle = {
    vin: 'Enter valid VIN number',
    licensePlate: 'Enter valid license plate number',
    userId: 'Enter valid user ID',
    manufacturedYear: 'Enter valid year later than 1900',
    engineType: 'Expected one of "gasoline", "diesel", "electric", "hybrid"',
    transmission: 'Expected one of "manual", "automatic"',
    modelName: 'Expected a string',
    manufacturer: 'Expected a string',
    carSegment: 'Expected a string',
};
export var visit = {
    notes: "Expected a string in range " + visitErrors.NOTES_MIN_LENGTH + " and " + visitErrors.NOTES_MAX_LENGTH + " characters",
    vehicleId: 'Expected a number.',
    usedParts: 'Expected an array of objects with values of type number and greater than zero.',
    performedServices: 'Expected an array of objects with values of type number and greater than zero.',
};
export default {
    user: user,
    service: service,
    vehicle: vehicle,
    visit: visit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZXJyb3Itc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRztJQUNsQixLQUFLLEVBQUUsRUFBRTtJQUNULFFBQVEsRUFBRSxFQUFFO0NBQ2IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxFQUV0QixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHO0lBQ3JCLEdBQUcsRUFBRSx3QkFBd0I7SUFDN0IsWUFBWSxFQUFFLGtDQUFrQztJQUNoRCxNQUFNLEVBQUUscUJBQXFCO0lBQzdCLGdCQUFnQixFQUFFLGtDQUFrQztJQUNwRCxVQUFVLEVBQUUsNERBQTREO0lBQ3hFLFlBQVksRUFBRSx1Q0FBdUM7SUFDckQsU0FBUyxFQUFFLG1CQUFtQjtJQUM5QixZQUFZLEVBQUUsbUJBQW1CO0lBQ2pDLFVBQVUsRUFBRSxtQkFBbUI7Q0FDaEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRztJQUNuQixLQUFLLEVBQUUsZ0NBQThCLFdBQVcsQ0FBQyxnQkFBZ0IsYUFBUSxXQUFXLENBQUMsZ0JBQWdCLGdCQUFhO0lBQ2xILFNBQVMsRUFBRSxvQkFBb0I7SUFDL0IsU0FBUyxFQUFFLGdGQUFnRjtJQUMzRixpQkFBaUIsRUFBRSxnRkFBZ0Y7Q0FDcEcsQ0FBQztBQUVGLGVBQWU7SUFDYixJQUFJLE1BQUE7SUFDSixPQUFPLFNBQUE7SUFDUCxPQUFPLFNBQUE7SUFDUCxLQUFLLE9BQUE7Q0FDTixDQUFDIn0=