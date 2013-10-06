/**
 * Module dependencies.
 */
var crypto = require('crypto'),
    fs = require('fs');

/**
 * `EncryptionHelper` Library.
 * Basic library to do md5/aes256 encryption/decryption for strings or files
 *
 * @api public
 */
var EncryptionHelper = {
  // A helper function to create a one-way md5 hash of a string
  encrypt: function(data, encryption, outputEncoding, inputEncoding) {
    if (!encryption || 'string' !== typeof encryption || encryption.length < 2) {
      encryption = 'md5';
    }
    if (!outputEncoding) {
      outputEncoding = 'hex';
    }
    if (!inputEncoding) {
      inputEncoding = 'utf8';
    }

    var md5 = crypto.createHash(encryption);
    md5.update(data, inputEncoding);
    return md5.digest(outputEncoding);
  },
  // A helper function to create a one-way md5 hash of a file
  getChecksumOfFile: function(file, algo, outputEncoding, inputEncoding, callback) {
    if (inputEncoding && !callback) {
      callback = inputEncoding;
      inputEncoding = null;
    }

    if (outputEncoding && !callback) {
      callback = outputEncoding;
      outputEncoding = null;
    }

    if (algo && !callback) {
      callback = algo;
      algo = null;
    }

    if (!algo) {
      algo = 'md5';
    }

    if (!outputEncoding) {
      outputEncoding = 'hex';
    }

    if (!inputEncoding) {
      inputEncoding = 'utf8';
    }

    var hash = crypto.createHash(algo);

    var fileStream = fs.createReadStream(file, {
      'flags': 'r',
      'encoding': inputEncoding,
      'mode': 0666,
      'bufferSize': 4 * 1024,
    });

    fileStream.on('data', function(data) {
      hash.update(data);
    });

    fileStream.on('end', function() {
      var result = hash.digest('base64');
      return callback(null, result);
    });

    fileStream.on('error', function(ex) {
      return callback(ex, null);
    });

    return fileStream;
  },
  // A helper function to create a cipher from a given string.
  // The cipher can be reversed and deciphered to give the orginal string.
  // Default returns a hex encoded string from a utf8 and
  // uses the aes256 algorithm to create the cipher.
  cipher: function(key, text, algo, outputEncoding, inputEncoding) {
    outputEncoding = outputEncoding || 'hex';
    inputEncoding = inputEncoding || 'utf8';
    algo = algo || 'aes256';

    var cipher = crypto.createCipher(algo, key);
    return cipher.update(text, inputEncoding, outputEncoding) + cipher.final(outputEncoding);
  },
  // A helper function to dichper a given string.
  // Default returns a utf8 encoded string from a hex string and
  // uses the aes256 algorithm to dechiper the given cipher.
  decipher: function(key, encrypted, algo, outputEncoding, inputEncoding) {
    algo = algo || 'aes256';
    outputEncoding = outputEncoding || 'utf8';
    inputEncoding = inputEncoding || 'hex';

    var decipher = crypto.createDecipher(algo, key);
    return decipher.update(encrypted, inputEncoding, outputEncoding) + decipher.final(outputEncoding);
  },
  cipherFile: function(key, file, algo, outputEncoding, inputEncoding, cb) {

  },
  decipherFile: function(key, file, algo, outputEncoding, inputEncoding, cb) {

  }
};

EncryptionHelper.checksum = EncryptionHelper.getChecksum = EncryptionHelper.encrypt;
EncryptionHelper.encryptFile = EncryptionHelper.checksumFile = EncryptionHelper.getChecksumOfFile;

/**
 * Expose `EncryptionHelper` Library.
 */
module.exports = EncryptionHelper;
