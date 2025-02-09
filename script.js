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
    "\x44\x4e\x41"                           // "DNA"
  ];
  (function(_0xarr, _0xshift){
    var _0xinner = function(_0xnum){
      while(--_0xnum){ _0xarr.push(_0xarr.shift()); }
    };
    _0xinner(++_0xshift);
  }(_0x3df1,0x3));
  function _0x37b7(_0xindex){
    _0xindex = _0xindex - 0x0;
    return _0x3df1[_0xindex];
  }
  
  // ===========================================================
  // Bagian 2: Fungsi-Fungsi Multi Encoding dengan Teknik Array
  // ===========================================================
  
  function encodeBase64(str){
    var _0xkey = ["b","t","o","a"].join("");
    return window[_0xkey](str);
  }
  
  function encodeCharCodes(str){
    var _0xsplit = ["s","p","l","i","t"].join("");
    var _0xmap   = ["m","a","p"].join("");
    var _0xjoin  = ["j","o","i","n"].join("");
    return str[_0xsplit]("")[_0xmap](function(ch){
      return ch.charCodeAt(0);
    })[_0xjoin](" ");
  }
  
  function encodeURL(str){
    var _0xfn = ["e","n","c","o","d","e","U","R","I","C","O","M","P","O","N","E","N","T"].join("");
    return window[_0xfn](str);
  }
  
  var morseMap = {
    'A':".-",'B':"-...",'C':"-.-.",'D':"-..",
    'E':".",'F':"..-.",'G':"--.",'H':"....",
    'I':"..",'J':".---",'K':"-.-",'L':".-..",
    'M':"--",'N':"-.",'O':"---",'P':".--.",
    'Q':"--.-",'R':".-.",'S':"...",'T':"-",
    'U':"..-",'V':"...-",'W':".--",'X':"-..-",
    'Y':"-.--",'Z':"--..",
    '0':"-----",'1':".----",'2':"..---",'3':"...--",
    '4':"....-",'5':".....",'6':"-....",'7':"--...",
    '8':"---..",'9':"----."
  };
  function encodeMorse(str){
    var _0xsplit = ["s","p","l","i","t"].join("");
    var _0xmap   = ["m","a","p"].join("");
    var _0xjoin  = ["j","o","i","n"].join("");
    return str.toUpperCase()[_0xsplit]("")[_0xmap](function(ch){
      return (ch===" ") ? "/" : (morseMap[ch] || ch);
    })[_0xjoin](" ");
  }
  
  function encodeBinary(str){
    var _0xsplit = ["s","p","l","i","t"].join("");
    var _0xmap   = ["m","a","p"].join("");
    var _0xjoin  = ["j","o","i","n"].join("");
    return str[_0xsplit]("")[_0xmap](function(ch){
      return ch.charCodeAt(0).toString(2).padStart(8,"0");
    })[_0xjoin](" ");
  }
  
  function encodeRot13(str){
    return str.replace(/[a-zA-Z]/g,function(c){
      var _0xcode = c.charCodeAt(0)+13;
      return String.fromCharCode((c<="Z" ? 90 : 122)>=_0xcode ? _0xcode : _0xcode-26);
    });
  }
  
  function encodeHex(str){
    var _0xsplit = ["s","p","l","i","t"].join("");
    var _0xmap   = ["m","a","p"].join("");
    var _0xjoin  = ["j","o","i","n"].join("");
    return str[_0xsplit]("")[_0xmap](function(ch){
      return ch.charCodeAt(0).toString(16).padStart(2,"0");
    })[_0xjoin](" ");
  }
  
  function encodeAtbash(str){
    var _0xalphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var _0xreversed = _0xalphabet.split("").reverse().join("");
    var _0xsplit = ["s","p","l","i","t"].join("");
    var _0xmap   = ["m","a","p"].join("");
    var _0xjoin  = ["j","o","i","n"].join("");
    return str[_0xsplit]("")[_0xmap](function(ch){
      var _0xupper = ch.toUpperCase();
      var _0xidx = _0xalphabet.indexOf(_0xupper);
      if(_0xidx!==-1){
        var _0xnew = _0xreversed[_0xidx];
        return ch===ch.toUpperCase() ? _0xnew : _0xnew.toLowerCase();
      }
      return ch;
    })[_0xjoin]("");
  }
  
  function encodeBase85(str){
    var bytes = [];
    for(var i=0; i<str.length; i++){
      bytes.push(str.charCodeAt(i));
    }
    var padding = (4 - (bytes.length % 4)) % 4;
    for(var i=0; i<padding; i++){
      bytes.push(0);
    }
    var result = "";
    for(var i=0; i<bytes.length; i+=4){
      var num = ((bytes[i] << 24) >>> 0) | (bytes[i+1] << 16) | (bytes[i+2] << 8) | (bytes[i+3]);
      if(num===0){
        result += "z";
      } else {
        var block = "";
        var divisor = Math.pow(85,4);
        for(var j=0; j<5; j++){
          var digit = Math.floor(num/divisor) % 85;
          block += String.fromCharCode(digit+33);
          divisor /= 85;
        }
        result += block;
      }
    }
    return result;
  }
  
  function encodeBase91(str){
    var b = 0, n = 0, out = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";
    for(var i=0; i<str.length; i++){
      b |= str.charCodeAt(i) << n;
      n += 8;
      if(n > 13){
        var v = b & 8191;
        if(v > 88){ b >>= 13; n -= 13; }
        else { v = b & 16383; b >>= 14; n -= 14; }
        out += alphabet[v % 91] + alphabet[Math.floor(v/91)];
      }
    }
    if(n){
      out += alphabet[b % 91];
      if(n > 7 || b > 90){ out += alphabet[Math.floor(b/91)]; }
    }
    return out;
  }
  
  function encodeJSObfuscate(str){
    var _0xkey = ["b","t","o","a"].join("");
    return window[_0xkey](str.split("").reverse().join(""));
  }
  
  function encodePunycode(str){
    return "xn--" + encodeHex(str);
  }
  
  function encodeBrainfuck(str){
    var bf = "";
    for(var i=0; i<str.length; i++){
      var code = str.charCodeAt(i);
      bf += "+".repeat(code) + ".";
    }
    return bf;
  }
  
  function encodeBase4096(str){
    var bits = "";
    for(var i=0; i<str.length; i++){
      bits += str.charCodeAt(i).toString(2).padStart(8,"0");
    }
    var pad = (12 - (bits.length % 12)) % 12;
    bits = bits.padEnd(bits.length+pad,"0");
    var res = "";
    for(var i=0; i<bits.length; i+=12){
      var chunk = bits.substr(i,12);
      var num = parseInt(chunk,2);
      res += String.fromCharCode(num + 0x1000);
    }
    return res;
  }
  
  function encodeDNA(str){
    var mapping = {"00":"A","01":"C","10":"G","11":"T"};
    var res = "";
    for(var i=0; i<str.length; i++){
      var bin = str.charCodeAt(i).toString(2).padStart(8,"0");
      for(var j=0; j<8; j+=2){
        var pair = bin.substr(j,2);
        res += mapping[pair];
      }
    }
    return res;
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
  // Bagian 3: Penggabungan Hasil Secara Ringkas
  // ===========================================================
  
  function processEncodings(input){
    var results = [];
    try { results.push(encodeBase64(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeCharCodes(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeURL(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeMorse(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBinary(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeRot13(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeHex(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeAtbash(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBase85(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBase91(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeJSObfuscate(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodePunycode(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBrainfuck(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeBase4096(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeDNA(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeAES256(input, "secretKey")); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeRSA4096(input)); } catch(e){ results.push("Err:" + e.message); }
    try { results.push(encodeQuantumCrypto(input)); } catch(e){ results.push("Err:" + e.message); }
    return results;
  }
  
  function combineEncodings(results){
    var take = 4;
    return results.map(function(r){ return r.substr(0, take); }).join("");
  }
  
  // ===========================================================
  // Bagian 4: Advanced Combine dengan Teknik String Array yang Sulit
  // ===========================================================
  function advancedCombineEncodings(results){
    var basic = combineEncodings(results);
    var chars = basic.split("");
    for(var i = chars.length - 1; i > 0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
    }
    var obfus = chars.map(function(ch){
      var hx = ch.charCodeAt(0).toString(16);
      var rev = hx.split("").reverse().join("");
      var rand = ["x","y","z"][Math.floor(Math.random()*3)];
      return rev + rand;
    });
    var delims = ["\x7C","\x2A","\x23"]; // |, *, #
    for(var i = delims.length - 1; i > 0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = delims[i];
      delims[i] = delims[j];
      delims[j] = tmp;
    }
    var delim = delims.join("");
    return obfus.join(delim);
  }
  
  // ===========================================================
  // Bagian 5: Event Listener dan Fungsi Clipboard
  // ===========================================================


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("encodeButton").addEventListener("click", function() {
        try {
            var inp = document.getElementById("inputText").value;
            console.log("Input Text:", inp); // Debug input

            var res = processEncodings(inp);
            console.log("Encoded Result:", res); // Debug hasil encode pertama

            var out = advancedCombineEncodings(res);
            console.log("Final Encoded Output:", out); // Debug hasil akhir

            document.getElementById("outputText").textContent = out;
        } catch(e) {
            console.error("Error Processing:", e);
            document.getElementById("outputText").textContent = "Error: " + e.message;
        }
    });
});

  
  document.getElementById("pasteButton").addEventListener("click", async function(){
    try{
      if(navigator.clipboard && navigator.clipboard.readText){
        var txt = await navigator.clipboard.readText();
        document.getElementById("inputText").value = txt;
      } else { alert("Clipboard API not supported."); }
    } catch(e){ alert("Paste err: " + e.message); }
  });
  
(function(){
  document.getElementById("copyButton").addEventListener("click", async function(){
    try{
      var txt = document.getElementById("outputText").textContent;
      await navigator.clipboard.writeText(txt);
      alert("Copied to clipboard!");
    } catch(e){ alert("Copy err: " + e.message); }
  });
})();
