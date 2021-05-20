// extend interface
// interface AuthenticatedRequest extends Request {
//   user: { role: string, email: string, userId: string }
// }
var roleMiddleware = function (roleName) { return function (req, res, next) {
    if (req.user && req.user.role === roleName) {
        next();
    }
    else {
        res.status(403).send({
            message: 'Resource is forbidden.',
        });
    }
}; };
export default roleMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZU1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZS9yb2xlTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxtQkFBbUI7QUFDbkIsbURBQW1EO0FBQ25ELDBEQUEwRDtBQUMxRCxJQUFJO0FBQ0osSUFBTSxjQUFjLEdBQUcsVUFBQyxRQUFnQixJQUFLLE9BQUEsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQzNGLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUMsSUFBSSxFQUFFLENBQUM7S0FDUjtTQUFNO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLHdCQUF3QjtTQUNsQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsRUFSNEMsQ0FRNUMsQ0FBQztBQUVGLGVBQWUsY0FBYyxDQUFDIn0=