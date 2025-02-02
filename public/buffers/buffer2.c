
#include <stdio.h>
#include <string.h>

int main() {
  printf("Good luck bypassing an impossible if statement!\n");
  printf("Btw I do need your opinion on cats, do you like them?\n");

  int hackerman = 0;
  char buffer[100];
  // Haha! Im using fgets to prevent buffer overflow!
  fgets(buffer, 0x100, stdin);
  printf("%d\n", hackerman);

  if (strcmp(buffer, "yes") == 0) {
    printf("I like cats too! They are so cute!\n");
  } else {
    printf("I'm sorry, I don't think we can be friends anymore.\n");
  }

  if (hackerman == 0xDEADBEEF) {
    printf("You are a master hacker, hacker of all hackers!\n");
    printf("level 500 overlord!\n");
    printf("Here is your flag: XXXXXXXXXXXXXXXXXXXXXXXXXXXX\n");
  }
}
