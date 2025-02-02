"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

enum MessageType {
  INFO,
  ERROR,
  SUCCESS
}

interface Message {
  messageType: MessageType,
  message: string
}


export default function FlagSubmissionPage() {
  const [teamName, setTeamName] = useState('');
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState<Message>({ messageType: MessageType.INFO, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, flag }),
      });

      if (!response.ok) {
        const res = await response.json();
        if (response.status === 409) {
          setMessage({ messageType: MessageType.INFO, message: 'Flag already submitted.' });
          return
        }
        setMessage({ messageType: MessageType.ERROR, message: res.error || 'Failed to submit flag. Please try again.' });
        return;
      }

      setMessage({ messageType: MessageType.SUCCESS, message: 'Flag submitted successfully!' });
      setFlag('');
    } catch (error) {
      setMessage({ messageType: MessageType.ERROR, message: 'Failed to submit flag. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Flag</CardTitle>
        </CardHeader>
        <CardContent>
          <form autoComplete='off' onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="flag">Flag</Label>
              <Input
                id="flag"
                name="flag"
                type="text"
                required
                placeholder="Enter the flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
              />
            </div>
            <div>
            <Button type="submit" className="w-full">
              Submit Flag
            </Button>
            </div>
            <div className="flex justify-center">
            <Link href="/">
              <Button>Back</Button>
            </Link>
            </div>
          </form>
          {message.message && (
            <div className={`mt-4 text-sm ${message.messageType === MessageType.ERROR ? 'text-destructive' :
                message.messageType === MessageType.SUCCESS ? 'text-green-600' :
                  'text-orange-500'
              }`}>
              {message.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
