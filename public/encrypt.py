import sys
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


KEY = "????????????????????"
FLAG = "?????????????????????"


def encrypt(plaintext):
    plaintext = bytes.fromhex(plaintext)

    padded = pad(plaintext + FLAG.encode(), 16)
    cipher = AES.new(KEY, AES.MODE_ECB)

    encrypted = cipher.encrypt(padded)

    return encrypted.hex()


if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Usage: py encrypt.py <plaintext>")
        sys.exit(1)

    encrypted = encrypt(bytes.hex(sys.argv[1].encode()))

    print(encrypted)
