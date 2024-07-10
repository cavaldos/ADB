import DataConnect from "../../utils/DataConnect";
import {
  VW_Student,
  VW_Admin,
  VW_Instructor,
  VW_Certificate,
  VW_Education,
  VW_Company,
} from "../../interfaces/view.interface";
import ProfileRepo from "../../repositories/profile.repo";
const UserService = {
  // 1. Get instructor by ID
  async getInstructorByID(userID: number) {
    try {
      const proc = `select u.UserID,u.UserName,u.FullName,u.[Password],u.Email,u.Phone,u.Address,u.Role,u.CreatedTime,u.UpdateTime,
                    i.InstructorID,i.[Level],i.[Status]
                    from [User] u 
                    join [Instructor] i on u.UserID = i.UserID
                    where u.UserID = @UserID;`;
      const params = {
        UserID: userID,
      };
      let instructor: VW_Instructor[] = await DataConnect.executeWithParams(
        proc,
        params
      );
      const instructorID = instructor[0].InstructorID;
      const userIDQuery = instructor[0].UserID;

      const certificates:VW_Certificate = await ProfileRepo.getCertificateByInstructorID(
        instructorID
      );
      const education :VW_Education = await ProfileRepo.getEducationByUserID(userIDQuery);
      const company:VW_Company = await ProfileRepo.getCompanyByInstructorID(instructorID);
      let newInstructor = {
        ...instructor[0],
        Certificates: certificates,
        Education: education,
        Company: company,
      };

      return newInstructor;
    } catch (error: any) {
      throw new Error(`Error getting student by ID: ${error.message}`);
    }
  },

  // 2. Get student by ID
    async getStudentByID(userID: number) {
        try {
        const proc = `select u.UserID,u.UserName,u.FullName,u.[Password],u.Email,u.Phone,u.Address,u.Role,u.CreatedTime,u.UpdateTime,
                        s.StudentID,s.SchoolYear
                        from [User] u 
                        join [Student] s on u.UserID = s.UserID
                        where u.UserID = @UserID;`;
        const params = {
            UserID: userID,
        };
        let student: VW_Student[] = await DataConnect.executeWithParams(
            proc,
            params
        );
        const userIDQuery = student[0].UserID;
    
        const education :VW_Education = await ProfileRepo.getEducationByUserID(userIDQuery);
        let newStudent = {
            ...student[0],
            Education: education,
        };
    
        return newStudent;
        } catch (error: any) {
        throw new Error(`Error getting student by ID: ${error.message}`);
        }
    },
    // 3. Get admin by ID
    async getAdminByID(userID: number) {
        try {
        const proc = `select u.UserID,u.UserName,u.FullName,u.[Password],u.Email,u.Phone,u.Address,u.Role,u.CreatedTime,u.UpdateTime
                        from [User] u 
                        where u.UserID = @UserID;`;
        const params = {
            UserID: userID,
        };
        let admin: VW_Admin[] = await DataConnect.executeWithParams(
            proc,
            params
        );
        return admin[0];
        } catch (error: any) {
        throw new Error(`Error getting admin by ID: ${error.message}`);
        }
    },
};
export default UserService;
