import { user as USER, visit as visitErrors, service as serviceConstants } from './constants.js';
export var user = {
    firstName: "Expected string with length in the range [".concat(USER.MIN_FIRST_NAME_LENGTH, "-").concat(USER.MAX_FIRST_NAME_LENGTH, "]"),
    lastName: "Expected string with length in the range [".concat(USER.MIN_FIRST_NAME_LENGTH, "-").concat(USER.MAX_LAST_NAME_LENGTH, "]"),
    companyName: "Expected string with length in the range [".concat(USER.MIN_COMPANY_NAME_LENGTH, "-").concat(USER.MAX_COMPANY_NAME_LENGTH, "]"),
    phone: "Expected valid phone number with 10 digits, beginning with 08",
    email: "Expected valid e-mail",
    city: "Expected string with length in the range [".concat(USER.MIN_CITY_LENGTH, "-").concat(USER.MAX_CITY_LENGTH, "]"),
    country: "Expected string with length in the range [".concat(USER.MIN_COUNTRY_LENGTH, "-").concat(USER.MAX_COUNTRY_LENGTH, "]"),
    postalCode: "Expected number in the range [".concat(USER.MIN_POSTAL_CODE_VALUE, "-").concat(USER.MAX_POSTAL_CODE_VALUE, "]"),
    streetAddress: "Expected string with length in the range [".concat(USER.MIN_STREET_LENGTH, "-").concat(USER.MAX_STREET_LENGTH, "]"),
    password: "Expected valid password containing letters, numbers and at least 1 uppercase",
    reenteredPassword: "Expected valid password containing letters, numbers and at least 1 uppercase",
    role: "Expected customer or employee role ",
};
export var service = {
    name: "Expected a string with length in the range [".concat(serviceConstants.SERVICE_NAME_MIN_LENGTH, ":").concat(serviceConstants.SERVICE_NAME_MAX_LENGTH, "]"),
    price: "Expected a number with value in the range [".concat(serviceConstants.SERVICE_PRICE_MIN_VALUE, ":").concat(serviceConstants.SERVICE_PRICE_MAX_VALUE, "]"),
    carSegment: 'Expected a string (e.g. "A - mini cars")',
    carSegmentId: 'Expected a number.',
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
    carSegmentId: 'Expected a number.',
    carSegment: 'Expected a string (e.g. "A - mini cars")',
};
export var visit = {
    notes: "Expected a string in range ".concat(visitErrors.NOTES_MIN_LENGTH, " and ").concat(visitErrors.NOTES_MAX_LENGTH, " characters"),
    vehicleId: 'Expected a number.',
    usedParts: 'Expected an array of objects with values of type number and greater than zero.',
    performedServices: 'Expected an array of objects with values of type number and greater than zero.',
    status: 'Expected one of "not started", "in progress", "ready"',
    visitStart: 'Expected valid date',
    visitEnd: 'Expected valid date',
};
export default {
    user: user,
    service: service,
    vehicle: vehicle,
    visit: visit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZXJyb3Itc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxLQUFLLElBQUksV0FBVyxFQUFFLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpHLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRztJQUNsQixTQUFTLEVBQUUsb0RBQTZDLElBQUksQ0FBQyxxQkFBcUIsY0FBSSxJQUFJLENBQUMscUJBQXFCLE1BQUc7SUFDbkgsUUFBUSxFQUFFLG9EQUE2QyxJQUFJLENBQUMscUJBQXFCLGNBQUksSUFBSSxDQUFDLG9CQUFvQixNQUFHO0lBQ2pILFdBQVcsRUFBRSxvREFBNkMsSUFBSSxDQUFDLHVCQUF1QixjQUFJLElBQUksQ0FBQyx1QkFBdUIsTUFBRztJQUN6SCxLQUFLLEVBQUUsK0RBQStEO0lBQ3RFLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsSUFBSSxFQUFFLG9EQUE2QyxJQUFJLENBQUMsZUFBZSxjQUFJLElBQUksQ0FBQyxlQUFlLE1BQUc7SUFDbEcsT0FBTyxFQUFFLG9EQUE2QyxJQUFJLENBQUMsa0JBQWtCLGNBQUksSUFBSSxDQUFDLGtCQUFrQixNQUFHO0lBQzNHLFVBQVUsRUFBRSx3Q0FBaUMsSUFBSSxDQUFDLHFCQUFxQixjQUFJLElBQUksQ0FBQyxxQkFBcUIsTUFBRztJQUN4RyxhQUFhLEVBQUUsb0RBQTZDLElBQUksQ0FBQyxpQkFBaUIsY0FBSSxJQUFJLENBQUMsaUJBQWlCLE1BQUc7SUFDL0csUUFBUSxFQUFFLDhFQUE4RTtJQUN4RixpQkFBaUIsRUFBRSw4RUFBOEU7SUFDakcsSUFBSSxFQUFFLHFDQUFxQztDQUM1QyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHO0lBQ3JCLElBQUksRUFBRSxzREFBK0MsZ0JBQWdCLENBQUMsdUJBQXVCLGNBQUksZ0JBQWdCLENBQUMsdUJBQXVCLE1BQUc7SUFDNUksS0FBSyxFQUFFLHFEQUE4QyxnQkFBZ0IsQ0FBQyx1QkFBdUIsY0FBSSxnQkFBZ0IsQ0FBQyx1QkFBdUIsTUFBRztJQUM1SSxVQUFVLEVBQUUsMENBQTBDO0lBQ3RELFlBQVksRUFBRSxvQkFBb0I7Q0FDbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRztJQUNyQixHQUFHLEVBQUUsd0JBQXdCO0lBQzdCLFlBQVksRUFBRSxrQ0FBa0M7SUFDaEQsTUFBTSxFQUFFLHFCQUFxQjtJQUM3QixnQkFBZ0IsRUFBRSxrQ0FBa0M7SUFDcEQsVUFBVSxFQUFFLDREQUE0RDtJQUN4RSxZQUFZLEVBQUUsdUNBQXVDO0lBQ3JELFNBQVMsRUFBRSxtQkFBbUI7SUFDOUIsWUFBWSxFQUFFLG1CQUFtQjtJQUNqQyxZQUFZLEVBQUUsb0JBQW9CO0lBQ2xDLFVBQVUsRUFBRSwwQ0FBMEM7Q0FDdkQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRztJQUNuQixLQUFLLEVBQUUscUNBQThCLFdBQVcsQ0FBQyxnQkFBZ0Isa0JBQVEsV0FBVyxDQUFDLGdCQUFnQixnQkFBYTtJQUNsSCxTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLFNBQVMsRUFBRSxnRkFBZ0Y7SUFDM0YsaUJBQWlCLEVBQUUsZ0ZBQWdGO0lBQ25HLE1BQU0sRUFBRSx1REFBdUQ7SUFDL0QsVUFBVSxFQUFFLHFCQUFxQjtJQUNqQyxRQUFRLEVBQUUscUJBQXFCO0NBQ2hDLENBQUM7QUFFRixlQUFlO0lBQ2IsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0lBQ1AsT0FBTyxTQUFBO0lBQ1AsS0FBSyxPQUFBO0NBQ04sQ0FBQyJ9