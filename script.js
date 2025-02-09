// Metode Netcyzen: AES-256, RSA-4096, dan Quantum Cryptography
(async function () {
    // ===========================================================
    // Bagian 1: AES-256 Encryption & Decryption
    // ===========================================================
    async function generateAESKey() {
        return await crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async function encryptAES(key, text) {
        let encoder = new TextEncoder();
        let data = encoder.encode(text);
        let iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector (IV)
        let encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            data
        );
        return { encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))), iv: btoa(String.fromCharCode(...iv)) };
    }

    async function decryptAES(key, encrypted, iv) {
        let decoder = new TextDecoder();
        let encryptedBytes = new Uint8Array(atob(encrypted).split('').map(c => c.charCodeAt(0)));
        let ivBytes = new Uint8Array(atob(iv).split('').map(c => c.charCodeAt(0)));
        let decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: ivBytes },
            key,
            encryptedBytes
        );
        return decoder.decode(decrypted);
    }

    // ===========================================================
    // Bagian 2: RSA-4096 Encryption & Decryption
    // ===========================================================
    async function generateRSAKeys() {
        return await crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 4096,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async function encryptRSA(publicKey, text) {
        let encoder = new TextEncoder();
        let data = encoder.encode(text);
        let encrypted = await crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            data
        );
        return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    }

    async function decryptRSA(privateKey, encrypted) {
        let decoder = new TextDecoder();
        let encryptedBytes = new Uint8Array(atob(encrypted).split('').map(c => c.charCodeAt(0)));
        let decrypted = await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            encryptedBytes
        );
        return decoder.decode(decrypted);
    }

    // ===========================================================
    // Bagian 3: Quantum Cryptography Placeholder
    // ===========================================================
    function quantumEncrypt(text) {
        // Quantum encryption is experimental and beyond browser capabilities
        return btoa(text); // Placeholder for quantum-safe encryption
    }

    function quantumDecrypt(encrypted) {
        return atob(encrypted); // Placeholder for quantum-safe decryption
    }

    // ===========================================================
    // Bagian 4: Event Listener
    // ===========================================================
    document.getElementById("encryptButton").addEventListener("click", async function () {
        let inputText = document.getElementById("inputText").value;
        let aesKey = await generateAESKey();
        let rsaKeys = await generateRSAKeys();

        let aesEncrypted = await encryptAES(aesKey, inputText);
        let rsaEncrypted = await encryptRSA(rsaKeys.publicKey, inputText);
        let quantumEncrypted = quantumEncrypt(inputText);

        document.getElementById("outputAES").textContent = `AES: ${aesEncrypted.encrypted}\nIV: ${aesEncrypted.iv}`;
        document.getElementById("outputRSA").textContent = `RSA: ${rsaEncrypted}`;
        document.getElementById("outputQuantum").textContent = `Quantum: ${quantumEncrypted}`;
    });
})();
