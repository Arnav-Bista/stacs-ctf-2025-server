'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Message {
  isError: boolean,
  message: string
}

export default function TeamRegistration() {
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState<Message>({ isError: false, message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage({ isError: false, message: '' });

    if (!teamName.trim()) {
      setMessage({ isError: true, message: 'Team name is required.' });
      return;
    }

    if (teamName.length < 3) {
      setMessage({ isError: true, message: 'Team name must be at least 3 characters long.' });
      return;
    }

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create team');
      }

      setMessage({
        isError: false,
        message: 'Team registered successfully!'
      });

    } catch (e) {
      setMessage({
        isError: true,
        message: e instanceof Error ? e.message : 'Something went wrong'
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Register Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <form autoComplete='off'  className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                type="text"
                required
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />

            </div>

            {message.message && (
              <div className={`text-sm mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                {message.message}
              </div>
            )}

            <div>
              <Button className="w-full" type="submit">Register Team</Button>
            </div>
            <div className="flex justify-center">
              <Link href="/"><Button>Back</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
