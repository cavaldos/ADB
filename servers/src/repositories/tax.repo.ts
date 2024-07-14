import DataConnect from "../utils/DataConnect";

const TaxRepo = {
  //1. crete taxsetting
  async createTaxSetting(taxPercentage: number, effectiveDate: Date) {
    try {
      const proc = "create_tax_setting";
      const params = {
        EffectiveDate: effectiveDate,
        TaxPercentage: taxPercentage,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating tax setting: ${error.message}`);
    }
  },
  // update tax setting
  async updateTaxSetting(
    taxSettingID: number,
    taxPercentage: number,
    effectiveDate: Date
  ) {
    try {
      const proc = "update_tax_setting";
      const params = {
        TaxSettingID: taxSettingID,
        EffectiveDate: effectiveDate,
        TaxPercentage: taxPercentage,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating tax setting: ${error.message}`);
    }
  },
  // 4. gat all tax setting
  async getAllTaxSetting() {
    try {
      const query = `SELECT * FROM TaxSetting;`;
      return await DataConnect.execute(query);
    } catch (error: any) {
      throw new Error(`Error fetching tax settings: ${error.message}`);
    }
  },
  //2. crete tax report
  async createTaxReport(instructorID: number) {
    try {
      const proc = "create_tax_report";
      const params = {
        InstructorID: instructorID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating tax report: ${error.message}`);
    }
  },

  //5. get tax report by instructorID
  async getTaxReport(instructorID: number) {
    try {
      const query = `select i.InstructorID, u.FullName, u.Role, u.UserName ,trp.TaxCode, ts.TaxPercentage, trp.CreateDate 
                    from TaxReport trp
                    join TaxSetting ts on trp.TaxSettingID = ts.TaxSettingID
                    join Instructor i on trp.InstructorID = i.InstructorID
                    join [User] u on i.UserID = u.UserID WHERE InstructorID = @instructorID;`;
      return await DataConnect.executeWithParams(query, { instructorID });
    } catch (error: any) {
      throw new Error(`Error fetching tax report: ${error.message}`);
    }
  },
};
export default TaxRepo;
