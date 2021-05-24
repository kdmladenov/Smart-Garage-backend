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
import { user as USER, } from "./constants.js";
export var user = {
    firstName: "Expected string with length in the range [" + USER.MIN_FIRST_NAME_LENGTH + "-" + USER.MAX_FIRST_NAME_LENGTH + "]",
    lastName: "Expected string with length in the range [" + USER.MIN_FIRST_NAME_LENGTH + "-" + USER.MAX_LAST_NAME_LENGTH + "]",
    companyName: "Expected string with length in the range [" + USER.MIN_COMPANY_NAME_LENGTH + "-" + USER.MAX_COMPANY_NAME_LENGTH + "]",
    phone: "Expected valid phone number with 10 digits, beginning with 08",
    email: "Expected valid e-mail",
    city: "Expected string with length in the range [" + USER.MIN_CITY_LENGTH + "-" + USER.MAX_CITY_LENGTH + "]",
    country: "Expected string with length in the range [" + USER.MIN_COUNTRY_LENGTH + "-" + USER.MAX_COUNTRY_LENGTH + "]",
    postalCode: "Expected number in the range [" + USER.MIN_POSTAL_CODE_VALUE + "-" + USER.MAX_POSTAL_CODE_VALUE + "]",
    streetAddress: "Expected string with length in the range [" + USER.MIN_STREET_LENGTH + "-" + USER.MAX_STREET_LENGTH + "]",
    password: "Expected valid password containing letters, numbers and at least 1 uppercase",
    reenteredPassword: "Expected valid password containing letters, numbers and at least 1 uppercase",
    role: "Expected customer or employee role ",
};
export var service = {};
export default {
    user: user,
    service: service,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZXJyb3Itc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsSUFBSSxJQUFJLElBQUksR0FDYixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRztJQUNsQixTQUFTLEVBQUUsK0NBQTZDLElBQUksQ0FBQyxxQkFBcUIsU0FBSSxJQUFJLENBQUMscUJBQXFCLE1BQUc7SUFDbkgsUUFBUSxFQUFFLCtDQUE2QyxJQUFJLENBQUMscUJBQXFCLFNBQUksSUFBSSxDQUFDLG9CQUFvQixNQUFHO0lBQ2pILFdBQVcsRUFBRSwrQ0FBNkMsSUFBSSxDQUFDLHVCQUF1QixTQUFJLElBQUksQ0FBQyx1QkFBdUIsTUFBRztJQUN6SCxLQUFLLEVBQUUsK0RBQStEO0lBQ3RFLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsSUFBSSxFQUFFLCtDQUE2QyxJQUFJLENBQUMsZUFBZSxTQUFJLElBQUksQ0FBQyxlQUFlLE1BQUc7SUFDbEcsT0FBTyxFQUFFLCtDQUE2QyxJQUFJLENBQUMsa0JBQWtCLFNBQUksSUFBSSxDQUFDLGtCQUFrQixNQUFHO0lBQzNHLFVBQVUsRUFBRSxtQ0FBaUMsSUFBSSxDQUFDLHFCQUFxQixTQUFJLElBQUksQ0FBQyxxQkFBcUIsTUFBRztJQUN4RyxhQUFhLEVBQUUsK0NBQTZDLElBQUksQ0FBQyxpQkFBaUIsU0FBSSxJQUFJLENBQUMsaUJBQWlCLE1BQUc7SUFDL0csUUFBUSxFQUFFLDhFQUE4RTtJQUN4RixpQkFBaUIsRUFBRSw4RUFBOEU7SUFDakcsSUFBSSxFQUFFLHFDQUFxQztDQUM1QyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUUxQixlQUFlO0lBQ2IsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0NBQ1IsQ0FBQyJ9
