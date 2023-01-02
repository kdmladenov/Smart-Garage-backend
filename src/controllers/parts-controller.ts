/* eslint-disable complexity */
import express, { Request, Response } from "express";
import partsData from "../data/parts-data.js";
import validateBody from "../middleware/validate-body.js";
import errors from "../common/service-errors.js";
import createPartSchema from "../validator/create-part-schema.js";
import { part as PART, paging } from "../common/constants.js";
import partsServices from "../services/parts-service.js";
import authMiddleware from "../authentication/authMiddleware.js";
import loggedUserGuard from "../middleware/loggedUserGuard.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rolesEnum from "../common/roles.enum.js";
import updatePartSchema from "../validator/update-part-schema.js";
import errorHandler from "../middleware/errorHandler.js";

const partsController = express.Router();

partsController.use(authMiddleware, loggedUserGuard);

partsController
  // create part
  .post(
    "/",
    roleMiddleware(rolesEnum.employee),
    validateBody("part", createPartSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { name, price, carSegment } = req.body;

      const { error, part } = await partsServices.createPart(partsData)(
        name,
        price,
        carSegment,
      );

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: "A part with name already exists.",
        });
      } else {
        res.status(201).send(part);
      }
    }),
  )
  // get all parts - search, paging
  .get("/", errorHandler(async (req: Request, res: Response) => {
    const { pageSize } = req.query;
    let {
      page = 1,
      priceLow = PART.PART_PRICE_MIN_VALUE,
      priceHigh = PART.PART_PRICE_MAX_VALUE,
      partName,
      carSegment,
    } = req.query;

    let validatedPageSize = 0;
    if (pageSize && typeof +pageSize !== 'number') {
      validatedPageSize = 0;
    } else if (pageSize && +pageSize <= paging.parts.MIN_PAGE_SIZE) {
      validatedPageSize = paging.parts.MIN_PAGE_SIZE;
    } else if (pageSize && +pageSize >= paging.parts.MIN_PAGE_SIZE) {
      validatedPageSize = pageSize ? +pageSize : paging.parts.MIN_PAGE_SIZE;
    }
    page = page || 1;

    partName = typeof partName === "string" ? partName : "";
    carSegment = typeof carSegment === "string" ? carSegment : "";
    priceLow = typeof priceLow === "number" ? priceLow : +priceLow || PART.PART_PRICE_MIN_VALUE;
    priceHigh = typeof priceHigh === "number" ? priceHigh : +priceHigh || PART.PART_PRICE_MAX_VALUE;

    const part = await partsServices.getAllParts(partsData)(
      +page,
      validatedPageSize,
      +priceLow,
      +priceHigh,
      partName,
      carSegment,
    );

    res.status(200).send(part);
  }))

  // get by id
  .get("/:partId", errorHandler(async (req: Request, res: Response) => {
    const { partId } = req.params;

    const { error, part } = await partsServices.getPartById(partsData)(
      +partId,
    );

    if (error === errors.RECORD_NOT_FOUND) {
      res.status(404).send({
        message: `A part with number ${partId} is not found!`,
      });
    } else {
      res.status(200).send(part);
    }
  }))
  // update
  .put(
    "/:partId",
    roleMiddleware(rolesEnum.employee),
    validateBody("part", updatePartSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { partId } = req.params;
      const updatedPartData = req.body;

      const { error, part } = await partsServices.updatePart(partsData)(
        updatedPartData,
        +partId,
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: "The part is not found.",
        });
      } else {
        res.status(200).send(part);
      }
    }),
  )
  // delete part
  .delete("/:partId", roleMiddleware(rolesEnum.employee), errorHandler(async (req: Request, res: Response) => {
    const { partId } = req.params;

    const { error, part } = await partsServices.deletePart(partsData)(
      +partId,
    );

    if (error === errors.RECORD_NOT_FOUND) {
      res.status(404).send({
        message: `A part with id ${part} is not found!`,
      });
    } else {
      res.status(200).send(part);
    }
  }));

export default partsController;
