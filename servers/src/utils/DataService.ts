import Database from "./DataConnect";

class DatabaseService {
  constructor() {
  }
  // check connection
  async checkConnection(): Promise<any> {
    try {
      await Database.open();
    } catch (error: any) {}
  }

}

export default new DatabaseService();
