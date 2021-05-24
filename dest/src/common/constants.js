export var user = {
    MIN_FIRSTNAME_LENGTH: 2,
    MAX_FIRSTNAME_LENGTH: 20,
    MIN_LASTNAME_LENGTH: 2,
    MAX_LASTNAME_LENGTH: 20,
    MIN_COMPANYNAME_LENGTH: 2,
    MAX_COMPANYNAME_LENGTH: 40,
    MIN_EMAIL_LENGTH: 4,
    MAX_EMAIL_LENGTH: 50,
    EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    PHONE_REGEX: /^(0[0-9]{9})$/,
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // letters, numbers and at least 1 uppercase
};
export var paging = {
    vehicles: {
        MAX_PAGE_SIZE: 20,
        MIN_PAGE_SIZE: 10,
    },
    services: {
        MAX_PAGE_SIZE: 20,
        MIN_PAGE_SIZE: 10,
    },
    spareParts: {
        MAX_PAGE_SIZE: 20,
        MIN_PAGE_SIZE: 10,
    },
};
export var vehicle = {
    VIN_REGEX: /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/,
    LICENSE_PLATE_REGEX: /^[A-Z0-9]{7,8}/,
    MIN_MANUFACTURED_YEAR: 1900,
    ENGINE_TYPE: ['gasoline', 'diesel', 'electric', 'hybrid'],
    TRANSMISSION: ['manual', 'automatic'],
};
export var service = {
    SERVICE_NAME_MIN_LENGTH: 2,
    SERVICE_NAME_MAX_LENGTH: 100,
    SERVICE_PRICE_MIN_VALUE: 0.1,
    SERVICE_PRICE_MAX_VALUE: 100000,
    CAR_SEGMENT_ID_MIN_VALUE: 0,
};
export var visit = {
    NOTES_MIN_LENGTH: 10,
    NOTES_MAX_LENGTH: 255,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFHO0lBQ2xCLG9CQUFvQixFQUFFLENBQUM7SUFDdkIsb0JBQW9CLEVBQUUsRUFBRTtJQUN4QixtQkFBbUIsRUFBRSxDQUFDO0lBQ3RCLG1CQUFtQixFQUFFLEVBQUU7SUFDdkIsc0JBQXNCLEVBQUUsQ0FBQztJQUN6QixzQkFBc0IsRUFBRSxFQUFFO0lBQzFCLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixXQUFXLEVBQUUsMERBQTBEO0lBQ3ZFLFdBQVcsRUFBRSxlQUFlO0lBQzVCLGNBQWMsRUFBRSxxREFBcUQsRUFBRSw0Q0FBNEM7Q0FDcEgsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRztJQUNwQixRQUFRLEVBQUU7UUFDUixhQUFhLEVBQUUsRUFBRTtRQUNqQixhQUFhLEVBQUUsRUFBRTtLQUNsQjtJQUNELFFBQVEsRUFBRTtRQUNSLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO0tBQ2xCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsYUFBYSxFQUFFLEVBQUU7UUFDakIsYUFBYSxFQUFFLEVBQUU7S0FDbEI7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHO0lBQ3JCLFNBQVMsRUFBRSxxSkFBcUo7SUFDaEssbUJBQW1CLEVBQUUsZ0JBQWdCO0lBQ3JDLHFCQUFxQixFQUFFLElBQUk7SUFDM0IsV0FBVyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDO0lBQ3pELFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUM7Q0FDdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRztJQUNyQix1QkFBdUIsRUFBRSxDQUFDO0lBQzFCLHVCQUF1QixFQUFFLEdBQUc7SUFDNUIsdUJBQXVCLEVBQUUsR0FBRztJQUM1Qix1QkFBdUIsRUFBRSxNQUFNO0lBQy9CLHdCQUF3QixFQUFFLENBQUM7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRztJQUNuQixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGdCQUFnQixFQUFFLEdBQUc7Q0FDdEIsQ0FBQyJ9