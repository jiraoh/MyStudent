import exports from "express";
import {
  createMember,
  deleteMember,
  getAllMember,
  updateMember,
} from "../services/accountsService";

const Controller = exports.Router();

Controller.get("/regisMember", getAllMember);
Controller.post("/regisMember", createMember);
Controller.patch("/regisMember/:id", updateMember);
Controller.delete("/regisMember/:id", deleteMember);



export default Controller;
