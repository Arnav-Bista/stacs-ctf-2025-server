import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

let SQL: SqlJsStatic;
let initialized = false;

export async function initializeSqlJs(): Promise<SqlJsStatic> {
  if (initialized) return SQL;

  SQL = await initSqlJs({
    locateFile: (file: string) => `/sql-wasm.wasm`
  });

  initialized = true;
  return SQL;
}
