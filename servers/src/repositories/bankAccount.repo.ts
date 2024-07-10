import DataConnect from "../utils/DataConnect";

const BankAccountRepo = {
  // 1. Create bank account
  async createBankAccount(
    accountNumber: string,
    accountHolderName: string,
    accountBalance: number,
    bankName: string,
    userID: number
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
      const proc = "create_bank_account";
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
      const proc = "create_bank_account";
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
    userID: number,
    amount: number,
    transferDescription: string,
    bankBeneficiaryID: number,
    bankOrderingID: number
  ) {
    try {
      const proc = "create_transfer_course";
      const params = {
        UserID: userID,
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

  //
};

export default BankAccountRepo;
