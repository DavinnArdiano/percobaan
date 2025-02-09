// Kode JavaScript dengan sedikit obfuscation agar tidak mudah dipahami secara langsung
(function(){
  // Fungsi encode base64 dengan nama variabel acak
  function _0x1a2b(_0x3c4d){
    return btoa(_0x3c4d);
  }

  // Event listener untuk tombol encode
  document.getElementById('enc').addEventListener('click', function(){
    var _0x5e6f = document.getElementById('inp').value;
    try {
      var _0x7a8b = _0x1a2b(_0x5e6f);
      document.getElementById('out').value = _0x7a8b;
    } catch(err) {
      document.getElementById('out').value = 'Error encoding: ' + err;
    }
  });
})();
