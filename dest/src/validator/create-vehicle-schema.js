import { vehicle } from '../common/constants.js';
export default {
    vin: function (value) { return vehicle.VIN_REGEX.test(value); },
    licensePlate: function (value) { return vehicle.LICENSE_PLATE_REGEX.test(value); },
    userId: function (value) { return typeof +value === 'number'; },
    manufacturedYear: function (value) { return value > vehicle.MIN_MANUFACTURED_YEAR && value <= new Date().getFullYear(); },
    engineType: function (value) { return vehicle.ENGINE_TYPE.includes(value); },
    transmission: function (value) { return vehicle.TRANSMISSION.includes(value); },
    modelName: function (value) { return typeof value === 'string'; },
    manufacturer: function (value) { return typeof value === 'string'; },
    carSegment: function (value) { return typeof value === 'string'; },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZlaGljbGUtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci9jcmVhdGUtdmVoaWNsZS1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpELGVBQWU7SUFDYixHQUFHLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBN0IsQ0FBNkI7SUFDckQsWUFBWSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBdkMsQ0FBdUM7SUFDeEUsTUFBTSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQTFCLENBQTBCO0lBQ3JELGdCQUFnQixFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsS0FBSyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBMUUsQ0FBMEU7SUFDL0csVUFBVSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQW5DLENBQW1DO0lBQ2xFLFlBQVksRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFwQyxDQUFvQztJQUNyRSxTQUFTLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQXpCLENBQXlCO0lBQ3ZELFlBQVksRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBekIsQ0FBeUI7SUFDMUQsVUFBVSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUF6QixDQUF5QjtDQUN6RCxDQUFDIn0=