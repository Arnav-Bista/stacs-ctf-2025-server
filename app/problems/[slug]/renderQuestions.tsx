"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "../questions";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FlagSubmission } from "@/app/submit/flag-submission";

export default function RenderQuestions({ slug }: { slug: string }) {
  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-8 text-center">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
      <div className="flex items-center justify-center mb-8">
        <FlagSubmission />
      </div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          question.category === slug &&
          <Card key={`forensics-${index}`} className="max-w-screen-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{question.title}</CardTitle>
                <span className="rounded-full text-sm bg-secondary px-3 py-1">
                  {question.points} points
                </span>
              </div>
              <CardDescription className="whitespace-pre-line">
                {question.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.hints && question.hints.length > 0 && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                      <span className="text-sm font-medium">Need hints?</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      {question.hints.map((hint, index) => (
                        <p key={index} className="text-sm">
                          <span className="font-semibold">Hint {index + 1}:</span> {hint}
                        </p>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {question.attachments && question.attachments.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attachments:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.attachments.map((attachment, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        {attachment.type === 'image' ? (
                          <div className="relative group">
                            <Image
                              src={attachment.url}
                              alt={attachment.name}
                              width={400}
                              height={192}
                              className="rounded-lg w-full object-cover max-h-48 cursor-pointer hover:opacity-90 transition-opacity outline outline-2 outline-black"
                              onClick={() => window.open(attachment.url, '_blank')}
                            />
                            <span className="text-sm mt-2 text-muted-foreground">{attachment.name}</span>
                          </div>
                        ) : (
                          <Button
                            variant="secondary"
                            className="w-full justify-start"
                            asChild
                          >
                            <a href={attachment.url} download>
                              <Download className="mr-2 h-4 w-4" />
                              {attachment.name}
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  );
}
