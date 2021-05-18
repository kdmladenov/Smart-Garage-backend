import { Request, Response, NextFunction } from 'express';

// extend interface
// interface AuthenticatedRequest extends Request {
//   user: { role: string, email: string, userId: string }
// }
const roleMiddleware = (roleName: String) => (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === roleName) {
    next();
  } else {
    res.status(403).send({
      message: 'Resource is forbidden.',
    });
  }
};

export default roleMiddleware;
