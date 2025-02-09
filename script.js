(function() {
  // ===========================================================
  // Bagian 1: Array Label Obfuscated (Internal, tidak ditampilkan)
  // ===========================================================
  const _0xlabels = [
    "\x42\x61\x73\x65\x36\x34",              // "Base64"
    "\x43\x68\x61\x72\x43\x6f\x64\x65\x73",    // "CharCodes"
    "\x55\x52\x4c",                          // "URL"
    "\x4d\x6f\x72\x73\x65",                    // "Morse"
    "\x42\x69\x6e\x61\x72\x79",                // "Binary"
    "\x52\x6f\x74\x31\x33",                   // "Rot13"
    "\x48\x65\x78",                          // "Hex"
    "\x41\x74\x62\x61\x73\x68",                // "Atbash"
    "\x42\x61\x73\x65\x38\x35",                // "Base85"
    "\x42\x61\x73\x65\x39\x31",                // "Base91"
    "\x4a\x53\x4f\x62\x66\x75\x73\x63\x61\x74\x65", // "JSObfuscate"
    "\x50\x75\x6e\x79\x63\x6f\x64\x65",        // "Punycode"
    "\x42\x72\x61\x69\x6e\x66\x75\x63\x6b",    // "Brainfuck"
    "\x42\x61\x73\x65\x34\x30\x39\x36",        // "Base4096"
    "\x44\x4e\x41"                           // "DNA"
  ];
  
  // Lakukan shifting internal pada array label (menambah kerumitan, tidak ditampilkan)
  (function(_0xarr, _0xshift) {
    const _0xinner = function(_0xnum) {
      while (--_0xnum) {
        _0xarr.push(_0xarr.shift());
      }
    };
    _0xinner(++_0xshift);
  }(_0xlabels, 0x3));
  
  function _0xgetLabel(_0xindex) {
    _0xindex = _0xindex - 0x0;
    return _0xlabels[_0xindex];
  }
  
  // ===========================================================
  // Bagian 2: Fungsi-Fungsi Multi Encoding
  // ===========================================================
  
  function encodeBase64(str) {
      return btoa(str);
  }
  
  function encodeCharCodes(str) {
      return str.split('').map(ch => ch.charCodeAt(0)).join(' ');
  }
  
  function encodeURL(str) {
      return encodeURIComponent(str);
  }
  
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
  
  function encodeBinary(str) {
      return str.split('').map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  }
  
  function encodeRot13(str) {
      return str.replace(/[a-zA-Z]/g, function(c) {
         return String.fromCharCode(
             (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
         );
      });
  }
  
  function encodeHex(str) {
      return str.split('').map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  }
  
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
  
  function encodeBase85(str) {
      let bytes = [];
      for (let i = 0; i < str.length; i++) {
          bytes.push(str.charCodeAt(i));
      }
      let padding = (4 - (bytes.length % 4)) % 4;
      for (let i = 0; i < padding; i++) { bytes.push(0); }
      let result = "";
      for (let i = 0; i < bytes.length; i += 4) {
          let num = ((bytes[i] << 24) >>> 0) | (bytes[i+1] << 16) | (bytes[i+2] << 8) | (bytes[i+3]);
          if (num === 0) { result += 'z'; }
          else {
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
  
  function encodeBase91(str) {
      let b = 0, n = 0, out = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";
      for (let i = 0; i < str.length; i++) {
          b |= str.charCodeAt(i) << n;
          n += 8;
          if (n > 13) {
              let v = b & 8191;
              if (v > 88) { b >>= 13; n -= 13; }
              else { v = b & 16383; b >>= 14; n -= 14; }
              out += alphabet[v % 91] + alphabet[Math.floor(v / 91)];
          }
      }
      if (n) {
          out += alphabet[b % 91];
          if (n > 7 || b > 90) { out += alphabet[Math.floor(b / 91)]; }
      }
      return out;
  }
  
  function encodeJSObfuscate(str) {
      return btoa(str.split("").reverse().join(""));
  }
  
  function encodePunycode(str) {
      return "xn--" + encodeHex(str);
  }
  
  function encodeBrainfuck(str) {
      let bf = "";
      for (let i = 0; i < str.length; i++) {
          let code = str.charCodeAt(i);
          bf += "+".repeat(code) + ".";
      }
      return bf;
  }
  
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
  
  // ===========================================================
  // Bagian 3: Penggabungan Hasil Secara Ringkas
  // ===========================================================
  
  function processEncodings(input) {
      let results = [];
      try { results.push(encodeBase64(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeCharCodes(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeURL(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeMorse(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeBinary(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeRot13(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeHex(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeAtbash(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeBase85(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeBase91(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeJSObfuscate(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodePunycode(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeBrainfuck(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeBase4096(input)); } catch(e) { results.push("Error: " + e.message); }
      try { results.push(encodeDNA(input)); } catch(e) { results.push("Error: " + e.message); }
      return results;
  }
  
  // Fungsi combineEncodings(): ambil (misalnya) 4 karakter dari tiap hasil
  function combineEncodings(results) {
      const takeChars = 4;
      return results.map(r => r.substr(0, takeChars)).join("");
  }
  
  // ===========================================================
  // Bagian 4: Advanced Combine dengan Teknik String Array yang Sulit
  // ===========================================================
  function advancedCombineEncodings(results) {
      let basicCombined = combineEncodings(results);
      let charArray = basicCombined.split("");
      // Acak array karakter dengan algoritma Fisher–Yates
      for (let i = charArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
      }
      let obfuscatedArray = charArray.map(function(ch) {
          let hex = ch.charCodeAt(0).toString(16);
          let reversedHex = hex.split("").reverse().join("");
          let randomChar = ["x", "y", "z"][Math.floor(Math.random() * 3)];
          return reversedHex + randomChar;
      });
      let delimiters = ["\x7C", "\x2A", "\x23"]; // |, *, #
      for (let i = delimiters.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [delimiters[i], delimiters[j]] = [delimiters[j], delimiters[i]];
      }
      let delimiter = delimiters.join("");
      return obfuscatedArray.join(delimiter);
  }
  
  // ===========================================================
  // Bagian 5: Event Listener dan Fungsi Clipboard
  // ===========================================================
  
  // Tombol Encode: proses input dan tampilkan output advanced combine
  document.getElementById("encodeButton").addEventListener("click", function() {
      try {
          let inputText = document.getElementById("inputText").value;
          let results = processEncodings(inputText);
          let finalOutput = advancedCombineEncodings(results);
          document.getElementById("outputText").textContent = finalOutput;
      } catch (e) {
          document.getElementById("outputText").textContent = "Error processing encoding: " + e.message;
          console.error(e);
      }
  });
  
  // Tombol Paste: ambil teks dari clipboard dan tempel ke textarea input
  document.getElementById("pasteButton").addEventListener("click", async function() {
      try {
          if (navigator.clipboard && navigator.clipboard.readText) {
              let text = await navigator.clipboard.readText();
              document.getElementById("inputText").value = text;
          } else {
              alert("Clipboard API tidak didukung di browser ini.");
          }
      } catch (e) {
          alert("Gagal menempel teks: " + e.message);
      }
  });
  
  // Tombol Copy: salin teks output ke clipboard
  document.getElementById("copyButton").addEventListener("click", async function() {
      try {
          let outputText = document.getElementById("outputText").textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(outputText);
              alert("Output telah disalin ke clipboard!");
          } else {
              // Fallback: gunakan metode execCommand jika Clipboard API tidak tersedia
              let tempInput = document.createElement("textarea");
              tempInput.value = outputText;
              document.body.appendChild(tempInput);
              tempInput.select();
              if (document.execCommand("copy")) {
                  alert("Output telah disalin ke clipboard!");
              } else {
                  alert("Gagal menyalin teks.");
              }
              document.body.removeChild(tempInput);
          }
      } catch (e) {
          alert("Gagal menyalin teks: " + e.message);
      }
  });
})();
