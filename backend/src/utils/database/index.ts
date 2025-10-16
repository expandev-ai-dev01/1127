import sql from 'mssql';
import { config } from '@/config';

/**
 * @summary Database connection pool
 */
let pool: sql.ConnectionPool | null = null;

/**
 * @summary Expected return types for database operations
 */
export enum ExpectedReturn {
  Single = 'single',
  Multi = 'multi',
  None = 'none',
}

/**
 * @summary Get database connection pool
 * @description Creates or returns existing connection pool
 *
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    const dbConfig: sql.config = {
      server: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    };
    pool = await sql.connect(dbConfig);
  }
  return pool;
}

/**
 * @summary Execute database request
 * @description Executes stored procedure with parameters
 *
 * @param routine Stored procedure name
 * @param parameters Procedure parameters
 * @param expectedReturn Expected return type
 * @param transaction Optional transaction object
 * @param resultSetNames Optional result set names
 *
 * @returns {Promise<any>} Query results
 */
export async function dbRequest(
  routine: string,
  parameters: any,
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  try {
    const currentPool = await getPool();
    const request = transaction ? new sql.Request(transaction) : new sql.Request(currentPool);

    Object.keys(parameters).forEach((key) => {
      request.input(key, parameters[key]);
    });

    const result = await request.execute(routine);

    switch (expectedReturn) {
      case ExpectedReturn.Single:
        return result.recordset[0] || null;
      case ExpectedReturn.Multi:
        if (resultSetNames && resultSetNames.length > 0) {
          const namedResults: Record<string, any[]> = {};
          resultSetNames.forEach((name, index) => {
            if (Array.isArray(result.recordsets)) {
              namedResults[name] = result.recordsets[index] || [];
            }
          });
          return namedResults;
        }
        return result.recordsets;
      case ExpectedReturn.None:
        return result.rowsAffected;
      default:
        return result.recordset;
    }
  } catch (error: any) {
    console.error('Database error:', error);
    throw error;
  }
}

/**
 * @summary Begin database transaction
 * @description Starts a new database transaction
 *
 * @returns {Promise<sql.Transaction>} Transaction object
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  const currentPool = await getPool();
  const transaction = new sql.Transaction(currentPool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary Commit database transaction
 * @description Commits the current transaction
 *
 * @param transaction Transaction object to commit
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary Rollback database transaction
 * @description Rolls back the current transaction
 *
 * @param transaction Transaction object to rollback
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}

/**
 * @summary Close database connection
 * @description Closes the database connection pool
 */
export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
