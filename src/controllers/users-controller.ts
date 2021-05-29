import express, { Request, Response } from "express";
import usersData from "../data/users-data.js";
import validateBody from "../middleware/validate-body.js";
import usersService from "../services/users-service.js";
import createUserSchema from "../validator/create-user-schema.js";
import authMiddleware from "../authentication/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rolesEnum from "../common/roles.enum.js";
import errors from "../common/service-errors.js";
import loggedUserGuard from "../middleware/loggedUserGuard.js";
import errorHandler from "../middleware/errorHandler.js";
import updateUserSchema from "../validator/update-user-schema.js";
import updatePasswordSchema from "../validator/update-password-schema.js";
import forgottenPasswordSchema from "../validator/forgotten-password-schema.js";
import resetPasswordSchema from "../validator/reset-password-schema.js";

const usersController = express.Router();

usersController

  // register
  .post(
    "/",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    validateBody("user", createUserSchema),
    errorHandler(async (req: Request, res: Response) => {
      const user = req.body;

      const { error, result } = await usersService.createUser(usersData)(user);

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: "User with same email already exists.",
        });
      } else {
        res.status(201).send(result);
      }
    }),
  )

  // Delete user
  .delete(
    "/:userId",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const { error, result } = await usersService.deleteUser(usersData)(
        +userId,
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`,
        });
      } else {
        res.status(200).send(result);
      }
    }),
  )
  // Get All users
  .get(
    "/",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler(async (req: Request, res: Response) => {
      // const { role } = req.user!;

      let {
        name = "",
        email = "",
        phone = "",
        model = "",
        make = "",
        visitRangeLow = "",
        visitRangeHigh = "",
        sort = "name",
        order = "ASC",
      } = req.query;
      email = typeof email === "string" ? email : "";
      name = typeof name === "string" ? name : "";
      phone = typeof phone === "string" ? phone : "";
      model = typeof model === "string" ? model : "";
      make = typeof make === "string" ? make : "";
      visitRangeLow = typeof visitRangeLow === "string" ? visitRangeLow : "";
      visitRangeHigh = typeof visitRangeHigh === "string" ? visitRangeHigh : "";
      sort = typeof sort === "string" ? sort : "";
      order = typeof order === "string" ? order : "";
      // name = name && name.replace("_", " ");

      const result = await usersService.getAllUsers(usersData)(
        name,
        email,
        phone,
        model,
        make,
        visitRangeLow,
        visitRangeHigh,
        sort,
        order,
      );
      res.status(200).send(result);
    }),
  )
  // )
  // Get a single user
  .get(
    "/:userId",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const { role } = req.user!;
      const { error, result } = await usersService.getUser(usersData)(
        +userId,
        role,
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`,
        });
      } else {
        res.status(200).send(result);
      }
    }),
  )
  // Update a single user
  .put(
    "/:userId",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    validateBody("user", updateUserSchema),
    errorHandler(async (req: Request, res: Response) => {
      const id = req.params.userId;
      const update = req.body;

      const { error, result } = await usersService.update(usersData)(
        update,
        +id,
      );

      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message:
            "The request was invalid. Emails are required or do not match.",
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`,
        });
      } else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: "User with same email already exists.",
        });
      } else {
        res.status(200).send(result);
      }
    }),
  )
  // Change password
  .patch(
    "/:userId/change-password",
    authMiddleware,
    loggedUserGuard,
    validateBody("user", updatePasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user!;
      const id = role === rolesEnum.employee ? req.params.userId : req.user!.userId;
      const passwordData = req.body;

      const { error, result } = await usersService.changePassword(usersData)(
        passwordData,
        +id,
        role,
      );

      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: "The request was invalid. Passwords do not match.",
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`,
        });
      } else {
        res.status(200).send(result);
      }
    }),
  )
  // Forgotten password with mail password reset
  .post(
    "/forgotten-password",
    validateBody("user", forgottenPasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { email }: { email: string } = req.body;
      console.log(email);

      const { error, result } = await usersService.forgottenPassword(usersData)(
        email,
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `A user with email ${email} is not found`,
        });
      } else {
        res
          .status(200)
          .send(result);
      }
    }),
  )
  // Reset password
  .post("/reset-password/:userId/:token",
    validateBody("user", resetPasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const {
        password,
        reenteredPassword,
      }: { password: string; reenteredPassword: string } = req.body;
      const { userId, token } = req.params;

      const { error, result } = await usersService.resetPassword(usersData)(
        password,
        reenteredPassword,
        +userId,
        token,
      );
      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message:
            "The link already has been used or expired.",
        });
      } else if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message:
            "Passwords do not match.",
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`,
        });
      } else {
        res.status(200).send(result);
      }
    }));

export default usersController;
