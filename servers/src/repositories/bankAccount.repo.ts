import DataConnect from "../utils/DataConnect";

const BankAccountRepo = {
  // 1. Create bank account
  async createBankAccount(
    userID: number,
    accountNumber: string,
    accountHolderName: string,
    accountBalance: number,
    bankName: string
  ) {
    try {
      const proc = "create_bank_account";
      const params = {
        AccountNumber: accountNumber,
        AccountHolderName: accountHolderName,
        AccountBalance: accountBalance,
        BankName: bankName,
        UserID: userID,
      };

      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 2. update bank account
  async updateBankAccount(
    bankAccountID: number,
    accountNumber: string,
    accountHolderName: string,
    accountBalance: number,
    bankName: string,
    userID: number
  ) {
    try {
      const proc = "update_bank_account";
      const params = {
        BankAccountID: bankAccountID,
        AccountNumber: accountNumber,
        AccountHolderName: accountHolderName,
        AccountBalance: accountBalance,
        BankName: bankName,
        UserID: userID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },

  // 3. Transfer Money
  async transferMoney(bankAccountID: number, amount: number, type: string) {
    try {
      const proc = "transfer_money";
      const params = {
        BankAccountID: bankAccountID,
        Amount: amount,
        Type: type,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 4. Create Transfer Course
  async createTransferCourse(
    amount: number,
    transferDescription: string,
    bankBeneficiaryID: number,
    bankOrderingID: number
  ) {
    try {
      const proc = "create_transfer_course";
      const params = {
        Amount: amount,
        TransferDescription: transferDescription,
        BankBeneficiaryID: bankBeneficiaryID,
        BankOrderingID: bankOrderingID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // get bank account by userID
  async getBankAccountByUserID(userID: number) {
    try {
      const query = `SELECT ba.BankAccountID,ba.AccountHolderName,ba.AccountBalance,ba.BankName,u.UserName,u.FullName,u.Role 
                      from BankAccount  ba
                      JOIN [User] u ON ba.UserID = [u].UserID
                      WHERE u.UserID = @userID;`;
      const result = await DataConnect.executeWithParams(query, { userID });
      return result;
    } catch (error: any) {
      throw new Error(`Error fetching bank account: ${error.message}`);
    }
  },
  // get all transfer 
  async getAllTransfer() {
    try {
      const query = `SELECT * FROM Transfer;`;
      return await DataConnect.execute(query);
    } catch (error: any) {
      throw new Error(`Error fetching transfer: ${error.message}`);
    }
  },
};

export default BankAccountRepo;
