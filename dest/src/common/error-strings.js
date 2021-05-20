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