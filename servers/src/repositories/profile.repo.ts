import DataConnect from "../utils/DataConnect";

const ProfileRepo = {
  // 1. create certificate
  async createCertificate(
    certificateName: string,
    startDate: string,
    endDate: string,
    instructorID: number
  ) {
    try {
      const proc = "create_certificate";
      const params = {
        CertificateName: certificateName,
        CertificateDate: startDate,
        CertificateUrl: endDate,
        InstructorID: instructorID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 2. update certificate
  async updateCertificate(
    certificateID: number,
    certificateName: string,
    startDate: string,
    endDate: string
  ) {
    try {
      const proc = "update_certificate";
      const params = {
        CertificateID: certificateID,
        CertificateName: certificateName,
        CertificateDate: startDate,
        CertificateUrl: endDate,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 3. delete certificate
  async deleteCertificate(certificateID: number) {
    try {
      const proc =
        "delete from Certificate where CertificateID = @CertificateID";
      const params = {
        CertificateID: certificateID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 4. get certificate by instructorID
  async getCertificateByInstructorID(instructorID: number) {
    try {
      const proc = `select * from certificate where InstructorID = @InstructorID`;
      const params = {
        InstructorID: instructorID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 5. create Education
  async createEducation(
    level: string,
    major: string,
    schoolName: string,
    userID: number
  ) {
    try {
      const proc = "create_education";
      const params = {
        Level: level,
        Major: major,
        SchoolName: schoolName,
        UserID: userID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 6. update Education
  async updateEducation(
    educationID: number,
    level: string,
    major: string,
    schoolName: string
  ) {
    try {
      const proc = "update_education";
      const params = {
        EducationID: educationID,
        Level: level,
        Major: major,
        SchoolName: schoolName,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 7. delete Education
  async deleteEducation(educationID: number) {
    try {
      const proc = "delete from Education where EducationID = @EducationID";
      const params = {
        EducationID: educationID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 8. get Education by userID
  async getEducationByUserID(userID: number) {
    try {
      const proc = `select * from Education where UserID = @UserID;`;
      const params = {
        UserID: userID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 9. create Company
  async createCompany(
    companyName: string,
    position: string,
    instructorID: number
  ) {
    try {
      const proc =
        "insert  into [Company] (CompanyName,Position,InstructorID) values (@CompanyName,@Position,@InstructorID);";
      const params = {
        CompanyName: companyName,
        Position: position,
        InstructorID: instructorID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 10. update Company
  async updateCompany(
    companyID: number,
    companyName: string,
    position: string
  ) {
    try {
      const proc =
        ` update Company set CompanyName = @CompanyName, Position = @Position where CompanyID = @CompanyID;`;
      const params = {
        CompanyID: companyID,
        CompanyName: companyName,
        Position: position,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 11. delete Company
  async deleteCompany(companyID: number) {
    try {
      const proc = "delete from company where CompanyID = @CompanyID;";
      const params = {
        CompanyID: companyID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 12. get Company by userID
  async getCompanyByInstructorID(instructorID: number) {
    try {
      const proc = `select * from Company where InstructorID = @InstructorID;`;
      const params = {
        InstructorID: instructorID,
      };
      return await DataConnect.executeWithParams(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
};

export default ProfileRepo;
