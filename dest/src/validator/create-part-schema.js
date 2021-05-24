import { part } from "../common/constants.js";
export default {
    name: function (value) {
        return typeof value === "string" &&
            value.length > part.PART_NAME_MIN_LENGTH &&
            value.length < part.PART_NAME_MAX_LENGTH;
    },
    price: function (value) {
        return typeof +value === "number" &&
            value > part.PART_PRICE_MIN_VALUE &&
            value < part.PART1_PRICE_MAX_VALUE;
    },
    carSegmentId: function (value) {
        return typeof +value === "number" && value > part.CAR_SEGMENT_ID_MIN_VALUE;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBhcnQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci9jcmVhdGUtcGFydC1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBQyxLQUFhO1FBQ2xCLE9BQUEsT0FBTyxLQUFLLEtBQUssUUFBUTtZQUN6QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0I7WUFDeEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CO0lBRnhDLENBRXdDO0lBQzFDLEtBQUssRUFBRSxVQUFDLEtBQWE7UUFDbkIsT0FBQSxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0I7WUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUI7SUFGbEMsQ0FFa0M7SUFDcEMsWUFBWSxFQUFFLFVBQUMsS0FBYTtRQUMxQixPQUFBLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsd0JBQXdCO0lBQW5FLENBQW1FO0NBQ3RFLENBQUMifQ==