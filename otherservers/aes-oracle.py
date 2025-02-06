from flask import Flask, request, jsonify
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

app = Flask(__name__)

KEY = b'phew_it_isnt_cpp'
FLAG = 'flag_{seems_ecb_is_vry_insecure}'


def encrypt(plaintext):
    try:
        plaintext = bytes.fromhex(plaintext)
        padded = pad(plaintext + FLAG.encode(), 16)
        cipher = AES.new(KEY, AES.MODE_ECB)
        encrypted = cipher.encrypt(padded)
        return encrypted.hex()
    except Exception as e:
        return str(e)


@app.route('/aes-oracle', methods=['POST'])
def encrypt_handler():
    try:
        data = request.get_json(force=True)
        if 'data' not in data:
            return jsonify({"error": "Missing 'data' field"}), 400

        plaintext = data['data']
        result = encrypt(bytes.hex(plaintext.encode()))

        return jsonify({"data": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=2000)
