import { Express } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
export default function(app: Express) {
  app.post('/user',validateResource(createUserSchema), createUserHandler);
}