import { user } from "../common/constants.js";
export default {
    password: function (value) { return user.PASSWORD_REGEX.test(value); },
    reenteredPassword: function (value) { return user.PASSWORD_REGEX.test(value); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRvci9yZXNldC1wYXNzd29yZC1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLGVBQWU7SUFDYixRQUFRLEVBQUUsVUFBQyxLQUFhLElBQWMsT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBL0IsQ0FBK0I7SUFDckUsaUJBQWlCLEVBQUUsVUFBQyxLQUFhLElBQWMsT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBL0IsQ0FBK0I7Q0FDL0UsQ0FBQyJ9