import express from "express";
import todolistController from "../controller/todolist-controller.js";
const todolistRouter = express.Router();

todolistRouter
  .route("/")
  .get(todolistController.getAllToDoLists)
  .post(todolistController.createToDoList);

todolistRouter
  .route("/:id")
  .get(todolistController.getToDoList)
  .put(todolistController.updateToDoLists)
  .delete(todolistController.deleteToDoLists);

export default todolistRouter;
