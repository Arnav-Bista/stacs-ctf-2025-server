
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
  api?: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    description: string;
    requestFormat?: {
      type: 'json' | 'text' | 'binary';
      example?: string;
    };
  };
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
    title: "SQLi V1.0",
    category: Category.ENGINEERING,
    description: "This is my first time learning SQL, checkout this simple auth page I made!\nBut it'll be of no use to you since you dont know my credentials 😎",
    link: "/problems/sqli/basic-auth",
    points: 300,
  },
  {
    title: "SQLi V1.1",
    category: Category.ENGINEERING,
    description: "So can login and bypass the authentication system... but can you find the flag?",
    hints: ["It's a Sqlite database"],
    link: "/problems/sqli/tables",
    points: 500,
  },
  {
    title: "SQLi V2.0",
    category: Category.ENGINEERING,
    description: "You've just gotten news that someone else is changing their password...",
    hints: ["🔫"],
    link: "/problems/sqli/stealer",
    points: 800,
  },
  {
    title: "Buffers v1",
    category: Category.ENGINEERING,
    description: "Nothing is impossible in C\n\n Compiled using the following:\n gcc -o buffers1 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 200,
    api: {
      endpoint: "/api/problems/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers1", "payload": "Yes, I happen to actually like them!" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer1.c"
      }
    ]
  },
  {
    title: "Buffers v2",
    category: Category.ENGINEERING,
    description: "Wait I can rewrite variables with overflow??\n\n Compiled using the following:\n gcc -o buffers2 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 200,
    api: {
      endpoint: "/api/problems/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers2", "payload": "Yes! I love cats!" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer2.c"
      }
    ]
  },
  {
    title: "Buffers v3",
    category: Category.ENGINEERING,
    description: "The win function is never called, what are you going to do about it?\n\n Compiled using the following:\n gcc -o buffers3 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 200,
    api: {
      endpoint: "/api/problems/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers3", "payload": "Slim Shady" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer3.c"
      }
    ]
  },
  {
    title: "Gaussian Reduction",
    category: Category.MATH,
    description: "=======================================================================\nLattice cryptography is the foundation for almost all new cryptosystems\nwhich are designed to be Quantum-Safe.\n The 'Learning with Errors' problem upon which its security is based involves \n finding the closest lattice point in an N-dimensional space to a given target point.\n\n Read more online at - https://cims.nyu.edu/~regev/papers/lwesurvey.pdf \n & https://www.youtube.com/watch?v=QDdOoYdb748\n =======================================================================\n\n Recommended to attempt the 'Gram-Schmidt' question before this one.\n\n When attempting to solve the Learning with Errors problem in a lattice, a lot of the difficulty comes from an 'inoptimal basis'.\n Other than the communicating parties using this cryptosystem, no-one will have access to an optimal (not necessarily orthogonal/orthonormal) basis \n for the lattice which will reduce the complexity of solving the problem.\n\n A way of computing an near-optimal basis from an arbitrary basis is the process of 'Lattice Reduction'.\n 'Gaussian Reduction' is a process to find an optimal basis for a 2-dimensional lattice.\n\n Research Gaussian Reduction, and find the optimal basis for these two basis vectors:\n [8468127585,983815398552]\n [875020913,123094942980]\n\n The flag for this question is the inner product of the two new basis vectors.\n",
    points: 500
  }
];
