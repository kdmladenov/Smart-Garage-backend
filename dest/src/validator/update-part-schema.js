import { part } from "../common/constants.js";
export default {
    name: function (value) { return typeof value === "undefined"
        || (typeof value === "string" && value.length > part.PART_NAME_MIN_LENGTH
            && value.length < part.PART_NAME_MAX_LENGTH); },
    price: function (value) { return typeof value === "undefined"
        || (typeof +value === "number" && value > part.PART_PRICE_MIN_VALUE && value < part.PART_PRICE_MAX_VALUE); },
    carSegmentId: function (value) { return typeof value === "undefined" || (typeof +value === "number" && value > part.CAR_SEGMENT_ID_MIN_VALUE); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhcnQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci91cGRhdGUtcGFydC1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1dBQ2hELENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQjtlQUN0RSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUZyQixDQUVxQjtJQUM5QyxLQUFLLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1dBQ2pELENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBRGpGLENBQ2lGO0lBQzNHLFlBQVksRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBckcsQ0FBcUc7Q0FDdkksQ0FBQyJ9