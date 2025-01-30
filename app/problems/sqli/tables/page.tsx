"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Database } from "sql.js";
import { initializeSqlJs } from "@/utils/initSqlJs";
import { Label } from "@/components/ui/label";

export default function SQLiTables() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ error: boolean, message: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function init() {
      const SQL = await initializeSqlJs();
      const db = new SQL.Database();

      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          name TEXT,
          password TEXT
        )
      `);

      db.run(`
        CREATE TABLE data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          flag TEXT
        )
      `);

      // Not expected to crack this
      db.run(`
        INSERT INTO users (username, name, password)
        VALUES ('noobysqlinjection', 'ha! the flag isnt here!', 'cracking_this_password_is_not_the_intended_challenge')
      `);

      db.run(`
        INSERT INTO users (username, name, password)
        VALUES ('tester', 'TestMaxer 900', 'password')
      `);

      db.run(`
        INSERT INTO data (flag)
        VALUES ('flag_{information-schemas-are-useful}')
      `);

      setDb(db);
      setIsLoading(false);
    }
    init();
  }, []);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    try {
      // SQL Injection Vulnerability 
      const query = `
      SELECT * FROM users 
        WHERE username = '${username}' 
        AND password = '${password}'
      `;
      const result = db.exec(query);
      console.log(result);
      if (result.length > 0 && result[0].values.length > 0) {
        setMessage({
          error: false,
          message: `Welcome ${result[0].values[0][2]}`
        });
      } else {
        setMessage({
          error: true,
          message: "Invalid username or password"
        });
      }
    } catch (error) {
      setMessage({
        error: true,
        message: String(error)
      });
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the new system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                </Button>
              </div>
            </div>
            {message && (
              <div className={`text-sm font-medium ${message.error ? 'text-destructive' : 'text-green-500'}`}>
                {message.message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Initializing..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
