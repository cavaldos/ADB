import DataConnect from "../utils/DataConnect";

const UserRepo = {
  // 1. Create Admin
  async createAdmin(
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string
  ) {
    try {
      const proc = "create_admin";
      const params = {
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating admin: ${error.message}`);
    }
  },

  // 2. Update Admin
  async updateAdmin(
    userID: number,
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string
  ) {
    try {
      const proc = "update_admin";
      const params = {
        UserID: userID,
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating admin: ${error.message}`);
    }
  },

  // 3. Create Student
  async createStudent(
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string
  ) {
    try {
      const proc = "create_student";
      const params = {
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating student: ${error.message}`);
    }
  },

  // 4. Update Student
  async updateStudent(
    userID: number,
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string
  ) {
    try {
      const proc = "update_student";
      const params = {
        UserID: userID,
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  },

  // 5. Create Instructor
  async createInstructor(
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string,
    level: string = "Beginner",
    status: string = "Pending"
  ) {
    try {
      const proc = "create_instructor";
      const params = {
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
        Level: level,
        Status: status,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating instructor: ${error.message}`);
    }
  },

  // 6. Update Instructor
  async updateInstructor(
    userID: number,
    userName: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string,
    level: string,
    status: string
  ) {
    try {
      const proc = "update_instructor";
      const params = {
        UserID: userID,
        UserName: userName,
        Password: password,
        Email: email,
        FullName: fullName,
        Phone: phone,
        Address: address,
        Level: level,
        Status: status,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating instructor: ${error.message}`);
    }
  },
  //7 login
  async login(userName: string, password: string) {
    try {
      const proc = "check_user_login";
      const params = {
        UserName: userName,
        Password: password,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error login: ${error.message}`);
    }
  },

  async getAllInstructor() {
    try {
      const query = `SELECT u.*,i.InstructorID, i.[Level],i.[Status]
                    FROM [User] u
                    JOIN Instructor i ON u.UserID = i.UserID;
                    `;
      const params = {};
      return await DataConnect.executeWithParams(query, params);
    } catch (error: any) {
      throw new Error(`Error getting all instructors: ${error.message}`);
    }
  },




  async upDateInstructorByAdmin(instructorID: number, level: string, status: string) {
    try {
      const query = `
                  UPDATE [Instructor]
                  SET [Level] = @level,
                      [Status] = @status
                  WHERE [InstructorID] = @instructorID;`;
      const params = {
        InstructorID: instructorID,
        Level: level,
        Status: status,
      };
      return await DataConnect.executeWithParams(query, params);
    } catch (error: any) {
      throw new Error(`Error updating instructor: ${error.message}`);
    }
  }
};

export default UserRepo;
