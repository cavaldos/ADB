import sql, { ConnectionPool, config as SqlConfig, IResult } from "mssql";

const config: SqlConfig = {
  user: "sa",
  password: "password123@",
  server: "localhost",
  database: "Course",
  port: 1444,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

class DataConnect {
  private pool: ConnectionPool | null = null;

  async open(): Promise<void> {
    try {
      if (!this.pool) {
        this.pool = new sql.ConnectionPool(config);
      }
      if (!this.pool.connected) {
        await this.pool.connect();
        console.log("Connected to SQL Server");
      }
    } catch (error: any) {
      this.pool = null;
      throw new Error(`Error connecting to SQL Server:(36) ${error.message}`);
    }
  }

  async execute(query: string): Promise<any> {
    try {
      if (!this.pool) {
        throw new Error(
          "Connection pool is not initialized. Call open() first."
        );
      }
      if (!this.pool.connected) {
        await this.open();
      }
      const request = this.pool.request();
      const result: IResult<any> = await request.query(query);
      return result.recordset;
    } catch (error: any) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }

  async executeWithParams(
    query: string,
    params: { [key: string]: any }
  ): Promise<any> {
    try {
      if (!this.pool) {
        throw new Error(
          "Connection pool is not initialized. Call open() first."
        );
      }
      if (!this.pool.connected) {
        await this.open();
      }
      const request = this.pool.request();
      for (const [key, value] of Object.entries(params)) {
        request.input(key.replace("@", ""), value); // Remove '@' before adding to request
      }
      const result: IResult<any> = await request.query(query);
      return result.recordset;
    } catch (error: any) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }

  async close(): Promise<void> {
    try {
      if (this.pool && this.pool.connected) {
        await this.pool.close();
        console.log("Connection to SQL Server closed");
        this.pool = null;
      }
    } catch (error: any) {
      throw new Error(
        `Error closing connection to SQL Server: ${error.message}`
      );
    }
  }
}

export default new DataConnect();
