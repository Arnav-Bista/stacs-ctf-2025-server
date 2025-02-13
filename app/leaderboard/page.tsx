'use client';


import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DataPoint = {
  name: string;
  points: number;
  found_at: number;
};

interface TransormedData {
  name: string,
  data: Omit<DataPoint, "name">[]
}

// Call me shameless but I made this one using Claude 
function transformData(rawData: DataPoint[]): TransormedData[] {
  // Get all unique timestamps and sort them
  const timestamps = [...new Set([
    ...rawData.map(entry => new Date(entry.found_at).getTime()),
  ])].sort((a, b) => a - b);

  // Initialize teams with their data arrays
  const teams = [...new Set(rawData.map(entry => entry.name))];
  const data: TransormedData[] = teams.map(name => ({
    name,
    data: timestamps.map(timestamp => ({
      points: 0,
      found_at: timestamp
    }))
  }));

  // Create a map for easy team data access
  const teamMap = new Map(data.map(team => [team.name, team]));

  // Accumulate points for each team
  let currentPoints: { [key: string]: number } = {};
  timestamps.forEach(timestamp => {
    // Get all entries for this timestamp
    const entries = rawData.filter(
      entry => new Date(entry.found_at).getTime() <= timestamp
    );

    // Calculate cumulative points for each team up to this timestamp
    teams.forEach(teamName => {
      currentPoints[teamName] = entries
        .filter(entry => entry.name === teamName)
        .reduce((sum, entry) => sum + entry.points, 0);

      // Find the data point for this timestamp and update it
      const teamData = teamMap.get(teamName)!;
      const dataPoint = teamData.data.find(d => d.found_at === timestamp);
      if (dataPoint) {
        dataPoint.points = currentPoints[teamName];
      }
    });
  });

  return data;
}

export default function Leaderboard() {
  const [rawData, setRawData] = useState<DataPoint[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch data');
        const newData = await response.json();

        const hasDataChanged = JSON.stringify(newData) !== JSON.stringify(rawData);

        if (hasDataChanged) {
          console.log('Leaderboard data updated');
          setRawData(newData);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();
    // Every 15 seconds
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, [rawData]);

  const transformedData = transformData(rawData);

  // Calculate current standings
  const currentStandings = transformedData.map(team => ({
    name: team.name,
    points: team.data[team.data.length - 1].points
  })).sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 lg:p-6 gap-4 lg:gap-6">
      <div>
        <Link href="/"><Button>&lt;</Button></Link>
      </div>
      <Card className="w-full lg:w-[70%] p-4 lg:p-6">
        {isLoading ? (
          <div className="h-[calc(100vh-120px)] flex items-center justify-center">
            <div className="text-lg text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <div className="h-[300px] lg:h-[calc(100vh-120px)]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="found_at"
                  className="text-sm text-muted-foreground"
                  type="number"
                  domain={[
                    new Date("2025-02-15T15:00:00").getTime(),
                  ]}
                  scale="time"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  }}
                  label={{
                    value: 'Time',
                  }}
                />
                <YAxis
                  className="text-sm text-muted-foreground"
                  label={{
                    value: 'Points',
                    angle: -90,
                    position: 'insideLeft',
                    className: "text-muted-foreground"
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--foreground))'
                  }}
                  labelClassName="text-muted-foreground"
                  itemStyle={{
                    color: 'hsl(var(--foreground))'
                  }}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });
                  }}
                  itemSorter={(a) => (typeof a.value === 'number' ? -a.value : 0)}
                  formatter={(value, name) => [`${value} pts`, name]}
                />
                {currentStandings.map((standing) => {
                  const team = transformedData.find(t => t.name === standing.name)!;
                  return (
                    <Line
                      key={team.name}
                      type="linear"
                      data={team.data}
                      dataKey="points"
                      name={team.name}
                      stroke={selectedTeam === team.name ? '#ffa07a' : 'hsl(var(--chart-1))'}
                      strokeWidth={selectedTeam === team.name ? 3 : 1.5}
                      dot={selectedTeam === team.name}
                      activeDot={{ r: 8 }}
                      opacity={selectedTeam ? (selectedTeam === team.name ? 1 : 0.3) : 1}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      {/* Leaderboard section (30%) */}
      <Card className="w-full lg:w-[30%] p-4 lg:p-6">
        <h2 className="text-xl font-semibold mb-6">Leaderboard</h2>
        <div className="space-y-2">
          {currentStandings.map((team, index) => (
            <div
              key={team.name}
              className={`p-2 lg:p-3 rounded-md cursor-pointer transition-all
                ${selectedTeam === team.name
                  ? 'bg-muted scale-105'
                  : 'hover:bg-muted/50'
                }`}
              onClick={() => setSelectedTeam(team.name === selectedTeam ? null : team.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 lg:gap-2">
                  <span className="font-semibold">{index + 1}.</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: selectedTeam === team.name ? '#ffa07a' : 'hsl(var(--chart-1))'
                    }}
                  />
                  <span>{team.name}</span>
                </div>
                <span className="font-bold">
                  {team.points} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
