import { part } from "../common/constants.js";
export default {
    name: function (value) {
        return typeof value === "undefined" ||
            (typeof value === "string" &&
                value.length > part.PART_NAME_MIN_LENGTH &&
                value.length < part.PART_NAME_MAX_LENGTH);
    },
    price: function (value) {
        return typeof value === "undefined" ||
            (typeof +value === "number" &&
                value > part.PART_PRICE_MIN_VALUE &&
                value < part.PART_PRICE_MAX_VALUE);
    },
    carSegmentId: function (value) {
        return typeof value === "undefined" ||
            (typeof +value === "number" && value > part.CAR_SEGMENT_ID_MIN_VALUE);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhcnQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci91cGRhdGUtcGFydC1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBQyxLQUFhO1FBQ2xCLE9BQUEsT0FBTyxLQUFLLEtBQUssV0FBVztZQUM1QixDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7Z0JBQ3hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQjtnQkFDeEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFIM0MsQ0FHMkM7SUFDN0MsS0FBSyxFQUFFLFVBQUMsS0FBYTtRQUNuQixPQUFBLE9BQU8sS0FBSyxLQUFLLFdBQVc7WUFDNUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVE7Z0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CO2dCQUNqQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBSHBDLENBR29DO0lBQ3RDLFlBQVksRUFBRSxVQUFDLEtBQWE7UUFDMUIsT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXO1lBQzVCLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQURyRSxDQUNxRTtDQUN4RSxDQUFDIn0=