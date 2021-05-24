import { visit as visitErrors, service as serviceConstants } from './constants.js';
export var user = {
    email: '',
    password: '',
};
export var service = {
    name: "Expected a string with length in the range [" + serviceConstants.SERVICE_NAME_MIN_LENGTH + ":" + serviceConstants.SERVICE_NAME_MAX_LENGTH + "]",
    price: "Expected a number with value in the range [" + serviceConstants.SERVICE_PRICE_MIN_VALUE + ":" + serviceConstants.SERVICE_PRICE_MAX_VALUE + "]",
    carSegmentId: 'Expected a positive number',
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZXJyb3Itc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsRUFBRSxPQUFPLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRixNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUc7SUFDbEIsS0FBSyxFQUFFLEVBQUU7SUFDVCxRQUFRLEVBQUUsRUFBRTtDQUNiLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUc7SUFDckIsSUFBSSxFQUFFLGlEQUErQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsU0FBSSxnQkFBZ0IsQ0FBQyx1QkFBdUIsTUFBRztJQUM1SSxLQUFLLEVBQUUsZ0RBQThDLGdCQUFnQixDQUFDLHVCQUF1QixTQUFJLGdCQUFnQixDQUFDLHVCQUF1QixNQUFHO0lBQzVJLFlBQVksRUFBRSw0QkFBNEI7Q0FDM0MsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRztJQUNyQixHQUFHLEVBQUUsd0JBQXdCO0lBQzdCLFlBQVksRUFBRSxrQ0FBa0M7SUFDaEQsTUFBTSxFQUFFLHFCQUFxQjtJQUM3QixnQkFBZ0IsRUFBRSxrQ0FBa0M7SUFDcEQsVUFBVSxFQUFFLDREQUE0RDtJQUN4RSxZQUFZLEVBQUUsdUNBQXVDO0lBQ3JELFNBQVMsRUFBRSxtQkFBbUI7SUFDOUIsWUFBWSxFQUFFLG1CQUFtQjtJQUNqQyxVQUFVLEVBQUUsbUJBQW1CO0NBQ2hDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxLQUFLLEdBQUc7SUFDbkIsS0FBSyxFQUFFLGdDQUE4QixXQUFXLENBQUMsZ0JBQWdCLGFBQVEsV0FBVyxDQUFDLGdCQUFnQixnQkFBYTtJQUNsSCxTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLFNBQVMsRUFBRSxnRkFBZ0Y7SUFDM0YsaUJBQWlCLEVBQUUsZ0ZBQWdGO0NBQ3BHLENBQUM7QUFFRixlQUFlO0lBQ2IsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0lBQ1AsT0FBTyxTQUFBO0lBQ1AsS0FBSyxPQUFBO0NBQ04sQ0FBQyJ9