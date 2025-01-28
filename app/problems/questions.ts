
export enum Category {
  FORENSICS = "forensics",
  MISC = "misc",
  ENGINEERING = "engineering",
  MATH = "math",
}

export interface Question {
  category: Category;
  title: string;
  description: string;
  hints?: string[];
  points: number;
  attachments?: {
    name: string;
    type: 'image' | 'file';
    url: string;
  }[];
}


export const questions: Question[] = [
  {
    title: "My Password V1",
    description: "I saw how this dude hid his password inside an image and showed it on stream!\nWell, all I've got is a text editor with me...\n\n\nNote to my future self: I love cats!",
    hints: ["Text Editor?"],
    points: 100,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "How Hungry...",
        type: "image",
        url: "/forensics/how-hungry.png"
      },
    ]
  },
  {
    title: "My Password V2",
    description: "Time for a little more security!",
    points: 500,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "lsd? is that allowed?",
        type: "image",
        url: "/forensics/lsd.png"
      }
    ]
  },
  {
    title: "My Password V3",
    description: "You might think you're smart for solving the previous puzzle, but try this!\nI've mixed my orignal password with the obfuscation_img provided, and now my password is completely invisible!!\nNot so easy now, huh?",
    hints: [
      "Use the python Pillow library for image processing."
    ],
    points: 500,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "Encrypted Flag",
        type: "image",
        url: "/forensics/encrypted_flag.png"
      },
      {
        name: "Obfuscation Image",
        type: "image",
        url: "/forensics/obfuscation_image.png"
      }
    ]
  },
  {
    title: "Rainbolt, I challenge you!",
    description: "Dear Rainbolt,\n\n I bet you can't guess where I am just given this picture of a sky.\n\n Sincerely,\n STACS Devs",
    points: 200,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "Sky",
        type: "image",
        url: "/forensics/sky.jpg"
      }
    ]
  },
  {
    title: "Weird Audio?",
    description: "This vine boom sound effect I downloaded got some weird sounding bits...",
    points: 150,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "vineboom.mp3",
        type: "file",
        url: "/forensics/vineboom.mp3"
      }
    ]
  }
];
