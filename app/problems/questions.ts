
export enum Category {
  FORENSICS = "forensics",
  MISC = "misc",
  ENGINEERING = "engineering",
  MATH = "math-and-cryptography",
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
  link?: string;
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
        url: "/how-hungry.png"
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
        url: "/lsd.png"
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
        url: "/encrypted_flag.png"
      },
      {
        name: "Obfuscation Image",
        type: "image",
        url: "/obfuscation_image.png"
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
        url: "/sky.jpg"
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
        url: "/vineboom.mp3"
      }
    ]
  },
  {
    title: "Basic Authentication",
    description: "Checkout this basic authentication system I made in C! It's super secure, I promise!\n\n Checksum for nerds (not part of the problem): \n915516d7d0c5b3b13093d3130d56db3889617d0ece655ff40e1080bc6d49e2d1  basic-auth",
    points: 100,
    category: Category.ENGINEERING,
    attachments: [
      {
        name: "basic-auth",
        type: "file",
        url: "/basic-auth"
      }
    ]
  },
  {
    title: "One Time Pads Twice",
    description: "I've just learnt that One Time Pads are mathematically secure!\nGood luck decrypting the following message 😎. \n\n You know what? I'll even encrypt your flag here!\n",
    points: 500,
    category: Category.MATH,
  },
  {
    title: "gcvc'z i sypt pizxi",
    description: "",
    points: 400,
    category: Category.MATH,
    attachments: [
      {
        name: "syptpizxi.txt",
        type: "file",
        url: "/syptpizxi.txt"
      }
    ]
  },
  {
    title: "Chinese Remainder Theorem",
    description: "The Chinese Remainder Theorem gives a unique solution to a system of linear congruences, provided that the moduli of said congruences are coprime.\n\n\nI.e. Given a set of arbitrary integers a_i, and a set of pairwise coprime integers p_i, given the following linear congruences hold:\n\n    x = a_1 mod p_1\n    x = a_2 mod p_2\n    x = a_3 mod p_3\n        ...\n    x = a_n mod p_n\n\nWe can get a solution: x = a mod N, where N is p_1 * p_2 * p_3 * ... * p_n.\n\n\nGiven the following congruences:\n\n    x = 4 mod 5\n    x = 5 mod 17\n    x = 34 mod 37\n\nFind the values of x & a such that: x = a mod 3145, and x satisfies the given congruences",
    points: 300,
    category: Category.MATH
  },
  {
    title: "\"Encryption\"",
    description: "I've just encrypted the flag!!1!!1 I bet you can't do anything with the cipher text!\n\nYou know what, here it is: ZmxhZ197YmFzZTY0LWlzLW5vdC1lbmNyeXB0aW9ufQ== ",
    points: 200,
    category: Category.MATH,
    attachments: [
      {
        name: "Hint",
        type: "file",
        url: "/hint.png"
      }
    ]
  },
  {
    title: "SQLi V1",
    category: Category.ENGINEERING,
    description: "This is my first time learning SQL, checkout this simple auth page I made!\nBut it'll be of no use to you since you dont know my credentials 😎",
    // hints: ["its a WHERE username = ...  AND password = ... query"],
    link: "/problems/sqli/basic-auth",
    points: 300,
  },
  {
    title: "SQLi V1.1",
    category: Category.ENGINEERING,
    description: "You can login and bypass the authentication system... but can you find the flag?",
    link: "/problems/sqli/tables",
    points: 300,
  }
];
