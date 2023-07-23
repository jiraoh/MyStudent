import { Request, Response } from "express";
import firebase from "../config/firebase";
import AccountResponse from "../models/response/accountResponse";

const accountCollection = firebase.collection("DB_STUDENT");

export const getAllMember = async (req: Request, res: Response) => {
  console.log(`getAllMember start time ${new Date().toISOString()}`);

  try {
    const data = await accountCollection.get();

    const response: AccountResponse[] = [];

    data.forEach((doc) => {
      response.push({
        ID_Std: doc.data().ID_Std,
        Name: doc.data().Name,
        Lastname: doc.data().Lastname,
        Address: doc.data().Address,
        PhoneNo: doc.data().PhoneNo,
        GPA: doc.data().GPA,
        Major: doc.data().Major,
      });
    });

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "get all account success",
      },
      data: response,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const createMember = async (req: Request, res: Response) => {
  console.log(`createMember start time ${new Date().toISOString()}`);

  try {
    const data = req.body;

    await accountCollection.doc().set(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "create Member success",
      },
      data: null,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  console.log(`updateMember start time ${new Date().toISOString()}`);

  try {
    const data = req.body;
    const id = req.params.id;

    await accountCollection.doc(id).update(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "update Member success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  console.log(`deleteMember start time ${new Date().toISOString()}`);

  try {
    const id = req.params.id;

    await accountCollection.doc(id).delete();

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "delete Member success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};
