import sql, { ConnectionPool, config as SqlConfig, IResult } from "mssql";
import color from "ansi-colors";
import dotenv from "dotenv";
dotenv.config();
const config: SqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.HOSTING_DB || "localhost",
  // server: "localhost",
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "1433"),
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 150,
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

        console.log(
          `\n  🚀  ➜ Connected to SQL Server at  `,
          color.yellow(
            `${config.server} < ${config.database} > < ${config.port} > `
          )
        );
      }
    } catch (error: any) {
      this.pool = null;
      console.error(`Error: ${error.message} ❌`);
    }
  }

  async execute(query: string): Promise<any> {
    try {
      // Đảm bảo pool được khởi tạo
      if (!this.pool) {
        this.pool = new sql.ConnectionPool(config);
      }
      // Đảm bảo kết nối đã được mở
      if (!this.pool.connected) {
        await this.pool.connect();
      }
      // Tạo request
      const request = this.pool.request();
      const fullQuery = `USE ${config.database}; ${query}`;
      const result: IResult<any> = await request.query(fullQuery);
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
        this.pool = new sql.ConnectionPool(config);
      }
      if (!this.pool.connected) {
        await this.pool.connect();
      }
      const request = this.pool.request();
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value); // Directly use the key
      }
      const fullQuery = `USE ${config.database}; ${query}`;
      const result: IResult<any> = await request.query(fullQuery);
      return result.recordset;
    } catch (error: any) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }
  //executeProcedure
  async executeProcedure(
    procedureName: string,
    params: { [key: string]: any }
  ): Promise<any> {
    try {
      if (!this.pool) {
        this.pool = new sql.ConnectionPool(config);
      }
      if (!this.pool.connected) {
        await this.pool.connect();
      }
      const request = this.pool.request();
      for (const paramName in params) {
        if (params.hasOwnProperty(paramName)) {
          request.input(paramName, params[paramName]);
        }
      }
      try {
        const result: IResult<any> = await request.execute(procedureName);
        return result.recordset;
      } catch (error) {
        throw error;
      }
    } catch (error: any) {
      throw new Error(`Procedure failed: ${error.message}`);
    } finally {
      if (this.pool && this.pool.connected) {
        await this.pool.close();
        this.pool = null;
      }
    }
  }
  async executeProcedureMulti(
    procedureName: string,
    params: { [key: string]: any }
  ): Promise<any> {
    try {
      if (!this.pool) {
        this.pool = new sql.ConnectionPool(config);
      }
      if (!this.pool.connected) {
        await this.pool.connect();
      }
      const request = this.pool.request();
      for (const paramName in params) {
        if (params.hasOwnProperty(paramName)) {
          request.input(paramName, params[paramName]);
        }
      }
      try {
        const result: IResult<any> = await request.execute(procedureName);
        return result.recordsets;
      } catch (error) {
        throw error;
      }
    } catch (error: any) {
      throw new Error(`Procedure failed: ${error.message}`);
    } finally {
      if (this.pool && this.pool.connected) {
        await this.pool.close();
        this.pool = null;
      }
    }
  }

  async close(): Promise<void> {
    try {
      if (this.pool && this.pool.connected) {
        await this.pool.close();
        console.log("Connection to SQL Server closed ✅");
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
