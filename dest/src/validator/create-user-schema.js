import { user } from "../common/constants.js";
export default {
    firstName: function (value) { return typeof value === "undefined"
        || (value.length >= user.MIN_FIRST_NAME_LENGTH
            && value.length <= user.MAX_FIRST_NAME_LENGTH); },
    lastName: function (value) { return typeof value === "undefined"
        || (value.length >= user.MIN_FIRST_NAME_LENGTH
            && value.length <= user.MAX_LAST_NAME_LENGTH); },
    companyName: function (value) { return typeof value === "undefined"
        || (value.length >= user.MIN_COMPANY_NAME_LENGTH
            && value.length <= user.MAX_COMPANY_NAME_LENGTH); },
    phone: function (value) { return user.PHONE_REGEX.test(value); },
    email: function (value) { return user.EMAIL_REGEX.test(value); },
    city: function (value) { return value.length >= user.MIN_CITY_LENGTH
        && value.length <= user.MAX_CITY_LENGTH; },
    country: function (value) { return value.length >= user.MIN_COUNTRY_LENGTH
        && value.length <= user.MAX_COUNTRY_LENGTH; },
    postalCode: function (value) { return value >= user.MIN_POSTAL_CODE_VALUE
        && value <= user.MAX_POSTAL_CODE_VALUE; },
    streetAddress: function (value) { return value.length >= user.MIN_STREET_LENGTH
        && value.length <= user.MAX_STREET_LENGTH; },
    role: function (value) { return user.ROLES.includes(value); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVzZXItc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci9jcmVhdGUtdXNlci1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLGVBQWU7SUFDYixTQUFTLEVBQUUsVUFBQyxLQUFjLElBQWMsT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1dBQ2pFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCO2VBQzNDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBRk4sQ0FFTTtJQUM5QyxRQUFRLEVBQUUsVUFBQyxLQUFjLElBQWMsT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1dBQ2hFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCO2VBQzNDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBRk4sQ0FFTTtJQUM3QyxXQUFXLEVBQUUsVUFBQyxLQUFjLElBQWMsT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1dBQ25FLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsdUJBQXVCO2VBQzdDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBRk4sQ0FFTTtJQUNoRCxLQUFLLEVBQUUsVUFBQyxLQUFhLElBQWMsT0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEI7SUFDL0QsS0FBSyxFQUFFLFVBQUMsS0FBYSxJQUFjLE9BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCO0lBQy9ELElBQUksRUFBRSxVQUFDLEtBQWEsSUFBYyxPQUFBLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWU7V0FDbkUsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxFQURMLENBQ0s7SUFDdkMsT0FBTyxFQUFFLFVBQUMsS0FBYSxJQUFjLE9BQUEsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCO1dBQ3pFLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQURMLENBQ0s7SUFDMUMsVUFBVSxFQUFFLFVBQUMsS0FBYSxJQUFjLE9BQUEsS0FBSyxJQUFJLElBQUksQ0FBQyxxQkFBcUI7V0FDeEUsS0FBSyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFERSxDQUNGO0lBQ3RDLGFBQWEsRUFBRSxVQUFDLEtBQWEsSUFBYyxPQUFBLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQjtXQUM5RSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFERSxDQUNGO0lBQ3pDLElBQUksRUFBRSxVQUFDLEtBQWEsSUFBYyxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUExQixDQUEwQjtDQUM3RCxDQUFDIn0=