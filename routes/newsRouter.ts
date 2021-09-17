import express from "express";
import NewsController from "../controller/newsController";

const newsRouter = express.Router();



newsRouter.route("/news").get(NewsController.get);
newsRouter.route("/news/:id").get(NewsController.getById);
newsRouter.route("/news").post(NewsController.create);
newsRouter.route("/news/:id").put(NewsController.update);
newsRouter.route("/news/:id").delete(NewsController.delete);

export default newsRouter;