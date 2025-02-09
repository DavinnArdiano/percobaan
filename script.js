(function(){
  // ===========================================================
  // Bagian 1: Array Label Obfuscated (Internal, tidak ditampilkan)
  // ===========================================================
  var _0x3df1 = [
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
    "\x44\x4e\x41",                           // "DNA"
    "\x4e\x65\x74\x63\x79\x7a\x65\x6e"       // "Netcyzen"
  ];

  // ===========================================================
  // Metode Encoding Tambahan
  // ===========================================================
  function encodeBase64(str) {
    return btoa(str);
  }
  
  function encodeCharCodes(str) {
    return str.split('').map(char => char.charCodeAt(0)).join('-');
  }
  
  function encodeURL(str) {
    return encodeURIComponent(str);
  }
  
  function encodeMorse(str) {
    const morseMap = { "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--.." };
    return str.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
  }

  // ===========================================================
  // Metode Netcyzen (AES-256, RSA-4096, Quantum Cryptography)
  // ===========================================================
  async function encodeAES256(str, key) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey("raw", enc.encode(key), { name: "PBKDF2" }, false, ["deriveKey"]);
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
    return btoa(String.fromCharCode(...new Uint8Array(encrypted))) + '.' + btoa(String.fromCharCode(...iv));
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
  // Event Listener untuk Encode Button
  // ===========================================================
  document.getElementById("encodeButton").addEventListener("click", async function(){
    var inputText = document.getElementById("inputText").value;
    var encodedResults = await processEncodings(inputText);
    document.getElementById("outputText").textContent = encodedResults.join("\n\n");
  });

  // ===========================================================
  // Fungsi untuk Memproses Semua Encoding
  // ===========================================================
  async function processEncodings(input){
    var results = [];
    try { results.push(await encodeAES256(input, "secure-key")); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(await encodeRSA4096(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeQuantumCrypto(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBase64(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeCharCodes(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeURL(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeMorse(input)); } catch(e){ results.push("Err:" + e.message); }
    return results;
  }
})();
