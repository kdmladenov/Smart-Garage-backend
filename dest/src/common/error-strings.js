import { user as USER, visit as visitErrors, service as serviceConstants } from './constants.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itc3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZXJyb3Itc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxLQUFLLElBQUksV0FBVyxFQUFFLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpHLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRztJQUNsQixTQUFTLEVBQUUsK0NBQTZDLElBQUksQ0FBQyxxQkFBcUIsU0FBSSxJQUFJLENBQUMscUJBQXFCLE1BQUc7SUFDbkgsUUFBUSxFQUFFLCtDQUE2QyxJQUFJLENBQUMscUJBQXFCLFNBQUksSUFBSSxDQUFDLG9CQUFvQixNQUFHO0lBQ2pILFdBQVcsRUFBRSwrQ0FBNkMsSUFBSSxDQUFDLHVCQUF1QixTQUFJLElBQUksQ0FBQyx1QkFBdUIsTUFBRztJQUN6SCxLQUFLLEVBQUUsK0RBQStEO0lBQ3RFLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsSUFBSSxFQUFFLCtDQUE2QyxJQUFJLENBQUMsZUFBZSxTQUFJLElBQUksQ0FBQyxlQUFlLE1BQUc7SUFDbEcsT0FBTyxFQUFFLCtDQUE2QyxJQUFJLENBQUMsa0JBQWtCLFNBQUksSUFBSSxDQUFDLGtCQUFrQixNQUFHO0lBQzNHLFVBQVUsRUFBRSxtQ0FBaUMsSUFBSSxDQUFDLHFCQUFxQixTQUFJLElBQUksQ0FBQyxxQkFBcUIsTUFBRztJQUN4RyxhQUFhLEVBQUUsK0NBQTZDLElBQUksQ0FBQyxpQkFBaUIsU0FBSSxJQUFJLENBQUMsaUJBQWlCLE1BQUc7SUFDL0csUUFBUSxFQUFFLDhFQUE4RTtJQUN4RixpQkFBaUIsRUFBRSw4RUFBOEU7SUFDakcsSUFBSSxFQUFFLHFDQUFxQztDQUM1QyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHO0lBQ3JCLElBQUksRUFBRSxpREFBK0MsZ0JBQWdCLENBQUMsdUJBQXVCLFNBQUksZ0JBQWdCLENBQUMsdUJBQXVCLE1BQUc7SUFDNUksS0FBSyxFQUFFLGdEQUE4QyxnQkFBZ0IsQ0FBQyx1QkFBdUIsU0FBSSxnQkFBZ0IsQ0FBQyx1QkFBdUIsTUFBRztJQUM1SSxZQUFZLEVBQUUsNEJBQTRCO0NBQzNDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUc7SUFDckIsR0FBRyxFQUFFLHdCQUF3QjtJQUM3QixZQUFZLEVBQUUsa0NBQWtDO0lBQ2hELE1BQU0sRUFBRSxxQkFBcUI7SUFDN0IsZ0JBQWdCLEVBQUUsa0NBQWtDO0lBQ3BELFVBQVUsRUFBRSw0REFBNEQ7SUFDeEUsWUFBWSxFQUFFLHVDQUF1QztJQUNyRCxTQUFTLEVBQUUsbUJBQW1CO0lBQzlCLFlBQVksRUFBRSxtQkFBbUI7SUFDakMsVUFBVSxFQUFFLG1CQUFtQjtDQUNoQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHO0lBQ25CLEtBQUssRUFBRSxnQ0FBOEIsV0FBVyxDQUFDLGdCQUFnQixhQUFRLFdBQVcsQ0FBQyxnQkFBZ0IsZ0JBQWE7SUFDbEgsU0FBUyxFQUFFLG9CQUFvQjtJQUMvQixTQUFTLEVBQUUsZ0ZBQWdGO0lBQzNGLGlCQUFpQixFQUFFLGdGQUFnRjtJQUNuRyxNQUFNLEVBQUUsdURBQXVEO0lBQy9ELFVBQVUsRUFBRSxxQkFBcUI7SUFDakMsUUFBUSxFQUFFLHFCQUFxQjtDQUNoQyxDQUFDO0FBRUYsZUFBZTtJQUNiLElBQUksTUFBQTtJQUNKLE9BQU8sU0FBQTtJQUNQLE9BQU8sU0FBQTtJQUNQLEtBQUssT0FBQTtDQUNOLENBQUMifQ==