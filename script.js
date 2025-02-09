(function(){
  // ===========================================================
  // Bagian 1: Array Label Obfuscated
  // ===========================================================
  var _0x3df1 = [
    "Base64", "CharCodes", "URL", "Morse", "Binary", "Rot13", 
    "Hex", "Atbash", "Base85", "Base91", "JSObfuscate", 
    "Punycode", "Brainfuck", "Base4096", "DNA", "Netcyzen"
  ];

  // ===========================================================
  // Bagian 2: Fungsi Encoding Standar
  // ===========================================================
  function encodeBase64(str) {
    return btoa(str);
  }

  function encodeCharCodes(str) {
    return str.split("").map(ch => ch.charCodeAt(0)).join("-");
  }

  function encodeURL(str) {
    return encodeURIComponent(str);
  }

  function encodeMorse(str) {
    const morseMap = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
      'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
      'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
      'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
      'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
      'Z': '--..', ' ': '/'
    };
    return str.toUpperCase().split("").map(ch => morseMap[ch] || ch).join(" ");
  }

  function encodeBinary(str) {
    return str.split("").map(ch => ch.charCodeAt(0).toString(2)).join(" ");
  }

  function encodeRot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      );
    });
  }

  function encodeHex(str) {
    return str.split('').map(ch => ch.charCodeAt(0).toString(16)).join('');
  }

  function encodeAtbash(str) {
    return str.replace(/[a-zA-Z]/g, function(c){
      var start = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + (25 - (c.charCodeAt(0) - start)));
    });
  }

  // ===========================================================
  // Metode Netcyzen (AES-256, RSA-4096, Quantum Cryptography)
  // ===========================================================
  async function encodeAES256(str, key) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw", enc.encode(key), { name: "PBKDF2" }, false, ["deriveKey"]
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: enc.encode("s@lt"), iterations: 100000, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      derivedKey,
      enc.encode(str)
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted))) + '.' + 
           btoa(String.fromCharCode(...iv));
  }

  async function encodeRSA4096(str) {
    const keyPair = await window.crypto.subtle.generateKey(
      { name: "RSA-OAEP", modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true,
      ["encrypt", "decrypt"]
    );

    const enc = new TextEncoder();
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      keyPair.publicKey,
      enc.encode(str)
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }

  function encodeQuantumCrypto(str) {
    return str.split('').map(char => {
      let quantumCode = char.charCodeAt(0) * Math.random() * 1000;
      return quantumCode.toString(16);
    }).join('-');
  }

  // ===========================================================
  // Bagian 3: Penggabungan Hasil Secara Async
  // ===========================================================
  async function processEncodings(input){
    var results = [];
    try { results.push(encodeBase64(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeCharCodes(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeURL(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeMorse(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBinary(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeRot13(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeHex(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeAtbash(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(await encodeAES256(input, "secure-key")); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(await encodeRSA4096(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeQuantumCrypto(input)); } catch(e){ results.push("Err:" + e.message); }
    return results;
  }

  // ===========================================================
  // Event Listener untuk Tombol Encode
  // ===========================================================
  document.getElementById("encodeButton").addEventListener("click", async function(){
    try {
      var inp = document.getElementById("inputText").value;
      var res = await processEncodings(inp);
      document.getElementById("outputText").textContent = res.join("\n");
    } catch(e) {
      document.getElementById("outputText").textContent = "Err processing: " + e.message;
      console.error(e);
    }
  });

})();
