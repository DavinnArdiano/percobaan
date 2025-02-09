(function() {
  // === Fungsi‑fungsi encoding dasar ===

  // 1. Base64 Encoding
  function encodeBase64(str) {
      return btoa(str);
  }

  // 2. Character Encoding: mengubah setiap karakter menjadi kode angkanya
  function encodeCharCodes(str) {
      return str.split('').map(ch => ch.charCodeAt(0)).join(' ');
  }

  // 3. URL Encoding
  function encodeURL(str) {
      return encodeURIComponent(str);
  }

  // 4. Morse Code Encoding
  const morseMap = {
    'A': ".-", 'B': "-...", 'C': "-.-.", 'D': "-..",
    'E': ".", 'F': "..-.", 'G': "--.", 'H': "....",
    'I': "..", 'J': ".---", 'K': "-.-", 'L': ".-..",
    'M': "--", 'N': "-.", 'O': "---", 'P': ".--.",
    'Q': "--.-", 'R': ".-.", 'S': "...", 'T': "-",
    'U': "..-", 'V': "...-", 'W': ".--", 'X': "-..-",
    'Y': "-.--", 'Z': "--..",
    '0': "-----", '1': ".----", '2': "..---", '3': "...--",
    '4': "....-", '5': ".....", '6': "-....", '7': "--...",
    '8': "---..", '9': "----."
  };
  function encodeMorse(str) {
      return str.toUpperCase().split('').map(ch => {
          if (ch === ' ') return '/';
          return morseMap[ch] || ch;
      }).join(' ');
  }

  // 5. Binary Encoding: setiap karakter diubah ke representasi biner 8-bit
  function encodeBinary(str) {
      return str.split('').map(ch => {
          return ch.charCodeAt(0).toString(2).padStart(8, '0');
      }).join(' ');
  }

  // 6. Rot13 Encoding
  function encodeRot13(str) {
      return str.replace(/[a-zA-Z]/g, function(c) {
         return String.fromCharCode(
             (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
         );
      });
  }

  // 7. Hex Encoding
  function encodeHex(str) {
      return str.split('').map(ch => {
          return ch.charCodeAt(0).toString(16).padStart(2, '0');
      }).join(' ');
  }

  // 8. Cipher Encoding (menggunakan Atbash cipher)
  function encodeAtbash(str) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const reversed = alphabet.split('').reverse().join('');
      return str.split('').map(ch => {
          let upper = ch.toUpperCase();
          let idx = alphabet.indexOf(upper);
          if (idx !== -1) {
              let newChar = reversed[idx];
              return ch === ch.toUpperCase() ? newChar : newChar.toLowerCase();
          }
          return ch;
      }).join('');
  }

  // 9. Base85 Encoding (Ascii85)
  function encodeBase85(str) {
      let bytes = [];
      for (let i = 0; i < str.length; i++) {
          bytes.push(str.charCodeAt(i));
      }
      let padding = (4 - (bytes.length % 4)) % 4;
      for (let i = 0; i < padding; i++) {
          bytes.push(0);
      }
      let result = "";
      for (let i = 0; i < bytes.length; i += 4) {
          // Gunakan operasi bitwise untuk membentuk 32-bit integer
          let num = ((bytes[i] << 24) >>> 0) | (bytes[i+1] << 16) | (bytes[i+2] << 8) | (bytes[i+3]);
          if (num === 0) {
              result += 'z';
          } else {
              let block = "";
              let divisor = Math.pow(85, 4);
              for (let j = 0; j < 5; j++) {
                  let digit = Math.floor(num / divisor) % 85;
                  block += String.fromCharCode(digit + 33);
                  divisor /= 85;
              }
              result += block;
          }
      }
      return result;
  }

  // 10. Base91 Encoding
  function encodeBase91(str) {
      let b = 0, n = 0, out = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";
      for (let i = 0; i < str.length; i++) {
          b |= str.charCodeAt(i) << n;
          n += 8;
          if (n > 13) {
              let v = b & 8191;
              if (v > 88) {
                  b >>= 13;
                  n -= 13;
              } else {
                  v = b & 16383;
                  b >>= 14;
                  n -= 14;
              }
              out += alphabet[v % 91] + alphabet[Math.floor(v / 91)];
          }
      }
      if (n) {
          out += alphabet[b % 91];
          if (n > 7 || b > 90) {
              out += alphabet[Math.floor(b / 91)];
          }
      }
      return out;
  }

  // === Fungsi‑fungsi Obfuscated Encoding ===

  // a. JavaScript Obfuscation (sederhana: balik string lalu Base64)
  function encodeJSObfuscate(str) {
      return btoa(str.split("").reverse().join(""));
  }

  // b. Punycode (dummy: menambahkan awalan "xn--" pada hex encoding)
  function encodePunycode(str) {
      return "xn--" + encodeHex(str);
  }

  // c. Brainfuck Encoding
  // Membuat program Brainfuck yang bila dieksekusi akan mencetak input.
  // (Metode naive: untuk tiap karakter, tambahkan '+' sebanyak nilai ASCII dan kemudian '.')
  function encodeBrainfuck(str) {
      let bf = "";
      for (let i = 0; i < str.length; i++) {
          let code = str.charCodeAt(i);
          bf += "+".repeat(code) + ".";
      }
      return bf;
  }

  // d. Base4096 Encoding
  // Mengelompokkan string ke dalam potongan 12-bit dan memetakannya ke karakter Unicode.
  function encodeBase4096(str) {
      let bits = "";
      for (let i = 0; i < str.length; i++) {
          bits += str.charCodeAt(i).toString(2).padStart(8, '0');
      }
      let padding = (12 - (bits.length % 12)) % 12;
      bits = bits.padEnd(bits.length + padding, '0');
      let result = "";
      for (let i = 0; i < bits.length; i += 12) {
          let chunk = bits.substr(i, 12);
          let num = parseInt(chunk, 2);
          result += String.fromCharCode(num + 0x1000);
      }
      return result;
  }

  // e. DNA Encoding
  // Setiap 2-bit dikonversi menjadi nukleotida: 00→A, 01→C, 10→G, 11→T.
  function encodeDNA(str) {
      let mapping = {"00": "A", "01": "C", "10": "G", "11": "T"};
      let result = "";
      for (let i = 0; i < str.length; i++) {
          let bin = str.charCodeAt(i).toString(2).padStart(8, '0');
          for (let j = 0; j < 8; j += 2) {
              let pair = bin.substr(j, 2);
              result += mapping[pair];
          }
      }
      return result;
  }

  // === Fungsi Master untuk memproses semua encoding ===
  function processEncodings(input) {
      return {
          "Base64": encodeBase64(input),
          "CharCodes": encodeCharCodes(input),
          "URL": encodeURL(input),
          "Morse": encodeMorse(input),
          "Binary": encodeBinary(input),
          "Rot13": encodeRot13(input),
          "Hex": encodeHex(input),
          "Atbash": encodeAtbash(input),
          "Base85": encodeBase85(input),
          "Base91": encodeBase91(input),
          "Obfuscated": {
              "JSObfuscate": encodeJSObfuscate(input),
              "Punycode": encodePunycode(input),
              "Brainfuck": encodeBrainfuck(input),
              "Base4096": encodeBase4096(input),
              "DNA": encodeDNA(input)
          }
      };
  }

  // === Event Listener untuk tombol Encode ===
  document.getElementById("encodeButton").addEventListener("click", function() {
      let inputText = document.getElementById("inputText").value;
      let results = processEncodings(inputText);
      // Menampilkan output dalam format JSON yang terindentasi
      document.getElementById("outputText").textContent = JSON.stringify(results, null, 2);
  });
})();
