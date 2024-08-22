import { Request, Response } from "express";
import { VW_Course } from "../../interfaces/view.interface";
import UserService from "../services/User.sv";
import CourseRepo from "../../repositories/course.repo";
import BankAccountRepo from "../../repositories/bankAccount.repo";
import ChatRepo from "../../repositories/chat.repo";
import ProfileRepo from "../../repositories/profile.repo";
import _ from "lodash";
const GlobalController = {
  //1. get all courses with pagination
  async getAllCourses(req: Request, res: Response) {
    try {
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;

      const result = await CourseRepo.getAllCourses(offset, pageSize);
      return res.status(200).json({
        message: "Get all courses public",
        status: 200,
        data: {
          ...result,
          page,
          pageSize,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 2. get courses by various filters with pagination
  async filterCourse(req: Request, res: Response) {
    try {
      const {
        categoryName,
        instructorName,
        language,
        status,
        minPrice,
        maxPrice,
        createTime,
      } = req.body;
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;
      const result: VW_Course = await CourseRepo.filterCourses(
        categoryName,
        instructorName,
        language,
        status,
        minPrice,
        maxPrice,
        createTime,
        offset,
        pageSize
      );
      return res.status(200).json({
        message: `Filtered courses`,
        status: 200,
        data: result,
        page,
        pageSize,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  // 3. search courses by various fields
  async searchCourses(req: Request, res: Response) {
    try {
      const { searchString } = req.body;
      const page = parseInt(req.body.page as string) || 1;
      const pageSize = parseInt(req.body.pageSize as string) || 10;
      const offset = (page - 1) * pageSize;

      const result = await CourseRepo.searchCourses(
        searchString,
        offset,
        pageSize
      );
      await CourseRepo.logSearch(searchString);
      return res.status(200).json({
        message: `Search results for: ${searchString}`,
        status: 200,
        data: {
          ...result,
          page,
          pageSize,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  // 4. auto compelete course
  async autoCompleteCourse(req: Request, res: Response) {
    try {
      const { searchString } = req.body;

      let topSearch = await CourseRepo.getTopSearchedCourses(searchString);
      topSearch = _.map(topSearch, (item) => {
        return _.mapKeys(item, (value, key) => {
          return key === "SearchString" ? "Phrase" : key;
        });
      });

      // Filter out items where Phrase is an empty string
      topSearch = _.filter(topSearch, (item) => item.Phrase !== "");

      if (!searchString) {
        return res.status(200).json({
          message: `Top search results`,
          status: 200,
          data: topSearch,
        });
      }

      const result = await CourseRepo.autoCompleteSearch(searchString);
      return res.status(200).json({
        message: `Auto complete results for: ${searchString}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  //4. get course by ID
  async getCourseById(req: Request, res: Response) {
    try {
      const { courseID } = req.body;
      const result: VW_Course = await CourseRepo.selectCourseById(courseID);
      return res.status(200).json({
        message: `Get course by ID: ${courseID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  //5. get Profile by UserID
  async getProfileByUserID(req: Request, res: Response) {
    try {
      const { userID, role } = req.body;
      var result;
      if (role !== "Instructor" && role !== "Student" && role !== "Admin") {
        console.log("role is not valid");
        return res.status(400).json({
          message: "Invalid role",
          status: 400,
          data: null,
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
        message: `Get profile by UserID: ${userID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 6.create bank account
  async createBankAccount(req: Request, res: Response) {
    try {
      const {
        userID,
        accountNumber,
        accountHolderName,
        accountBalance,
        bankName,
      } = req.body;

      const result = await BankAccountRepo.createBankAccount(
        userID,
        accountNumber,
        accountHolderName,
        accountBalance,
        bankName
      );

      return res.status(200).json({
        message: `Create bank account for UserID: ${userID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Errors: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 7. update bank account
  async updateBankAccount(req: Request, res: Response) {
    try {
      const {
        bankAccountID,
        accountNumber,
        accountHolderName,
        accountBalance,
        bankName,
        userID,
      } = req.body;
      const result = await BankAccountRepo.updateBankAccount(
        bankAccountID,
        accountNumber,
        accountHolderName,
        accountBalance,
        bankName,
        userID
      );
      return res.status(200).json({
        message: `Update bank account for UserID: ${userID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  // 8. transfer money
  async transferMoney(req: Request, res: Response) {
    try {
      const { bankAccountID, amount, type } = req.body;
      const result = await BankAccountRepo.transferMoney(
        bankAccountID,
        amount,
        type
      );
      return res.status(200).json({
        message: `Transfer money for bank account: ${bankAccountID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },
  // 9.  Create Transfer Course
  async createTransferCourse(req: Request, res: Response) {
    try {
      const { amount, transferDescription, bankBeneficiaryID, bankOrderingID } =
        req.body;
      await BankAccountRepo.createTransferCourse(
        amount,
        transferDescription,
        bankBeneficiaryID,
        bankOrderingID
      );
      return res.status(200).json({
        message: `Transfer course for UserID: ${bankOrderingID}`,
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  // 10. get bank account by userID
  async getBankAccountByUserID(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const result = await BankAccountRepo.getBankAccountByUserID(userID);
      return res.status(200).json({
        message: `Get bank account by UserID: ${userID}`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 11. get all get all transfer
  async getAllTransfer(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const result = await BankAccountRepo.getAllTransfer(userID);
      return res.status(200).json({
        message: `Get all transfer`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // 12.create chat
  async createChat(req: Request, res: Response) {
    try {
      const { chatContent, sendChatID, receiveChatID } = req.body;
      await ChatRepo.createChat(chatContent, sendChatID, receiveChatID);
      return res.status(200).json({
        message: `Create chat ${chatContent} from ${sendChatID} to ${receiveChatID}`,
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },
  // 13. get all chat
  async getAllChat(req: Request, res: Response) {
    try {
      const { sendChatID, receiveChatID } = req.body;
      const sendResult = await ChatRepo.getAllChat(sendChatID, receiveChatID);
      const receiveResult = await ChatRepo.getAllChat(
        receiveChatID,
        sendChatID
      );
      const result = _.unionBy(sendResult, receiveResult, "ChatID");
      const sortedResult = _.orderBy(result, ["ChatID"], ["asc"]);
      return res.status(200).json({
        message: `Get all chat`,
        status: 200,
        data: sortedResult,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  // get all user chat
  async getAllUserChat(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const result = await ChatRepo.getAllUserChat(userID);
      return res.status(200).json({
        message: `Get all user chat`,
        status: 200,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
        data: null,
      });
    }
  },

  async deleteChat(req: Request, res: Response) {
    try {
      const { chatID } = req.body;
      await ChatRepo.deleteChat(chatID);
      return res.status(200).json({
        message: `Delete chat ID: ${chatID}`,
        status: 200,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
        status: 500,
      });
    }
  },

  Profile: {
    // 1. Create Education
    async createEducation(req: Request, res: Response) {
      try {
        const { level, major, schoolName, userID } = req.body;
        const result = await ProfileRepo.createEducation(
          level,
          major,
          schoolName,
          userID
        );
        return res.status(200).json({
          message: `Created education for UserID: ${userID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 2. Update Education
    async updateEducation(req: Request, res: Response) {
      try {
        const { educationID, level, major, schoolName } = req.body;
        const result = await ProfileRepo.updateEducation(
          educationID,
          level,
          major,
          schoolName
        );
        return res.status(200).json({
          message: `Updated education ID: ${educationID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 3. Delete Education
    async deleteEducation(req: Request, res: Response) {
      try {
        const { educationID } = req.body;
        const result = await ProfileRepo.deleteEducation(Number(educationID));
        return res.status(200).json({
          message: `Deleted education ID: ${educationID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 4. Get Education by UserID
    async getEducationByUserID(req: Request, res: Response) {
      try {
        const { userID } = req.body;
        const result = await ProfileRepo.getEducationByUserID(Number(userID));
        return res.status(200).json({
          message: `Fetched education for UserID: ${userID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 5. Create Certificate
    async createCertificate(req: Request, res: Response) {
      try {
        const { certificateName, startDate, endDate, instructorID } = req.body;
        const result = await ProfileRepo.createCertificate(
          certificateName,
          startDate,
          endDate,
          instructorID
        );
        return res.status(200).json({
          message: `Created certificate for InstructorID: ${instructorID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 6. Update Certificate
    async updateCertificate(req: Request, res: Response) {
      try {
        const { certificateID, certificateName, startDate, endDate } = req.body;
        const result = await ProfileRepo.updateCertificate(
          certificateID,
          certificateName,
          startDate,
          endDate
        );
        return res.status(200).json({
          message: `Updated certificate ID: ${certificateID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 7. Delete Certificate
    async deleteCertificate(req: Request, res: Response) {
      try {
        const { certificateID } = req.body;
        const result = await ProfileRepo.deleteCertificate(
          Number(certificateID)
        );
        return res.status(200).json({
          message: `Deleted certificate ID: ${certificateID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 8. Get Certificate by InstructorID
    async getCertificateByInstructorID(req: Request, res: Response) {
      try {
        const { instructorID } = req.body;
        const result = await ProfileRepo.getCertificateByInstructorID(
          Number(instructorID)
        );
        return res.status(200).json({
          message: `Fetched certificate for InstructorID: ${instructorID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 9. Create Company
    async createCompany(req: Request, res: Response) {
      try {
        const { companyName, position, instructorID } = req.body;
        const result = await ProfileRepo.createCompany(
          companyName,
          position,
          instructorID
        );
        return res.status(200).json({
          message: `Created company for InstructorID: ${instructorID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 10. Update Company
    async updateCompany(req: Request, res: Response) {
      try {
        const { companyID, companyName, position } = req.body;
        const result = await ProfileRepo.updateCompany(
          companyID,
          companyName,
          position
        );
        return res.status(200).json({
          message: `Updated company ID: ${companyID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 11. Delete Company
    async deleteCompany(req: Request, res: Response) {
      try {
        const { companyID } = req.body;
        const result = await ProfileRepo.deleteCompany(Number(companyID));
        return res.status(200).json({
          message: `Deleted company ID: ${companyID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },

    // 12. Get Company by InstructorID
    async getCompanyByInstructorID(req: Request, res: Response) {
      try {
        const { instructorID } = req.body;
        const result = await ProfileRepo.getCompanyByInstructorID(
          Number(instructorID)
        );
        return res.status(200).json({
          message: `Fetched company for InstructorID: ${instructorID}`,
          status: 200,
          data: result,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: `Error: ${error.message}`,
          status: 500,
          data: null,
        });
      }
    },
  },
  //
};

export default GlobalController;
