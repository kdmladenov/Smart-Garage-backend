import { user } from "../common/constants.js";
export default {
    currentPassword: function (value) { return typeof value === "string" && value.length <= user.MAX_PASSWORD_LENGTH && user.PASSWORD_REGEX.test(value); },
    password: function (value) { return typeof value === "string" && value.length <= user.MAX_PASSWORD_LENGTH && user.PASSWORD_REGEX.test(value); },
    reenteredPassword: function (value) { return typeof value === "string" && value.length <= user.MAX_PASSWORD_LENGTH && user.PASSWORD_REGEX.test(value); },
    userId: function (value) { return typeof value === "undefined" || (typeof value === "number" && value > 0); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0b3IvdXBkYXRlLXBhc3N3b3JkLXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFOUMsZUFBZTtJQUNiLGVBQWUsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBeEcsQ0FBd0c7SUFDNUksUUFBUSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF4RyxDQUF3RztJQUNySSxpQkFBaUIsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBeEcsQ0FBd0c7SUFDOUksTUFBTSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBeEUsQ0FBd0U7Q0FDcEcsQ0FBQyJ9