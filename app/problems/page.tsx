import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


import { Category, questions } from "./questions";

const categoryInfo = [
  {
    id: Category.FORENSICS,
    name: 'Forensics',
    description: 'Analyze digital evidence and extract hidden information.',
    link: '/problems/forensics',
    
  },
  {
    id: Category.ENGINEERING,
    name: "Engineering",
    description: "Understanding exploits, vulnerabilities, and reverse engineering.",
    link: '/problems/engineering',
    
  },
  {
    id: Category.MATH,
    name: "Math and Cryptography",
    description: "Tackle mathematical backbones of cryptography.",
    link: '/problems/math-and-cryptography',
    
  },
  {
    id: Category.MISC,
    name: "Misc",
    description: "Anything that doesn't fit in the other categories.",
    link: '/problems/misc',
    
  }
];

const categories = categoryInfo.map(category => {
  const categoryQuestions = questions.filter(q => q.category === category.id);
  const totalPoints = categoryQuestions.reduce((sum, q) => sum + q.points, 0);
  
  return {
    ...category,
    totalPoints,
    questionCount: categoryQuestions.length
  };
});
export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">PROBLEM CATEGORIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full">
        {
          categories.map((category, i) => (
            <Card key={`category-${i}`} className="w-full max-w-lg" >
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span>{category.questionCount} Questions</span>
                  <span>{category.totalPoints} Points</span>
                </div>
                <Link href={category.link} className="w-full">
                  <Button className="w-full">View</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        }
      </div>
      <div>
          <Link href="/">
              <Button>Back</Button>
          </Link>
      </div>
    </>
  );
}
