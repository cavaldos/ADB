import Database from "./DataConnect";

class DatabaseService {
  constructor() {}
  async execute(query: string): Promise<any> {
    try {
      await Database.open();
      const result = await Database.execute(query);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await Database.close();
    }
  }
  async executeParams(query: string, values: any[]): Promise<any> {
    try {
      await Database.open();
      const result = await Database.executeWithParams(query, values);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await Database.close();
    }
  }
}

export default new DatabaseService();
