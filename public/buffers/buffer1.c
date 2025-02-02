#include <stdio.h>
#include <string.h>

int main() {
  printf("Good luck bypassing an impossible if statement!\n");
  printf("Btw, do you like pineapples on pizza?\n");

  int hackerman = 0;
  char buffer[100];
  // Haha! Im using fgets to prevent buffer overflow!
  fgets(buffer, 0x100, stdin);
  printf("%d\n", hackerman);

  if (strcmp(buffer, "yes") == 0) {
    printf("I've let the italian mafia know.\n");
  } else {
    printf("You're safe for now...\n");
  }

  if (hackerman) {
    printf("You've leveled up to a level 2 crook!");
    printf("Here is your flag: XXXXXXXXXXXXXXXXXXXXXX\n");
  }
}

