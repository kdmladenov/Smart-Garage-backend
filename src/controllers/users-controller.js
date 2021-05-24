var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import express from "express";
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
const usersController = express.Router();
usersController
  // register
  .post(
    "/",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    validateBody("user", createUserSchema),
    errorHandler((req, res) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const { error, result } = yield usersService.createUser(usersData)(
          user
        );
        if (error === errors.DUPLICATE_RECORD) {
          res.status(409).send({
            message: "User with same email already exists.",
          });
        } else {
          res.status(201).send(result);
        }
      })
    )
  )
  // Delete user
  .delete(
    "/:userId/delete",
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.employee),
    errorHandler((req, res) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const { error, result } = yield usersService.deleteUser(usersData)(
          +userId
        );
        if (error === errors.RECORD_NOT_FOUND) {
          res.status(404).send({
            message: `User ${userId} is not found.`,
          });
        } else {
          res.status(200).send(result);
        }
      })
    )
  );
export default usersController;
