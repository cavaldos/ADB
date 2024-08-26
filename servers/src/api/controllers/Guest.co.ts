import { Request, Response } from "express";
import UserRepo from "../../repositories/user.repo";
import UserService from "../services/User.sv";

const GuestController = {
  async login(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      const data = await UserRepo.login(userName, password);
      const userID = data[0]?.UserID;
      const role = data[0]?.Role;
      let result: any;
      if(data.length === 0){
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }


      console.log("Result:", userID, role);
      if (!userID || !role) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }
      if (role === "Instructor") {
        result = await UserService.getInstructorByID(userID);
      } else if (role === "Student") {
        result = await UserService.getStudentByID(userID);
      } else if (role === "Admin") {
        result = await UserService.getAdminByID(userID);
      }
      return res.status(200).json({
        message: "Login successfully",
        status: 200,
        data: {
          profile : result,
          role: role,
        }
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  async register(req: Request, res: Response) {
    try {
      const { userName, password, fullName, email, phone, address, role } =
        req.body;
      if (!userName || !password || !fullName || !email || !phone || !address) {
        return res.status(400).json({
          message: "Please fill all fields",
          status: 400,
        });
      }
      if (role !== "Instructor" && role !== "Student" && role !== "Admin") {
        return res.status(400).json({
          message: "Role must be Instructor or Student",
          status: 400,
        });
      }

      if (role === "Instructor") {
        await UserRepo.createInstructor(
          userName,
          password,
          email,
          fullName,
          phone,
          address
        );
      } else if (role === "Student") {
        await UserRepo.createStudent(
          userName,
          password,
          email,
          fullName,
          phone,
          address
        );
      } else if (role === "Admin") {
        await UserRepo.createAdmin(
          userName,
          password,
          email,
          fullName,
          phone,
          address
        );
      }

      return res.status(200).json({
        message: "Register successfully",
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
};

export default GuestController;
