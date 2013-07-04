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
    if (!outputEncoding || 'string' !== typeof outputEncoding || outputEncoding.length < 2) {
      outputEncoding = 'base64';
    }
    if (!inputEncoding || 'string' !== typeof inputEncoding || inputEncoding.length < 2) {
      inputEncoding = 'utf8';
    }

    var md5 = crypto.createHash(encryption);
    md5.update(data, inputEncoding);
    return md5.digest(outputEncoding);
  },
  // A helper function to create a one-way md5 hash of a file
  getMD5ofFile: function(file, callback) {
    var hash = crypto.createHash('md5');

    var fileStream = fs.createReadStream(file, {
      'flags': 'r',
      'encoding': 'ascii',
      'mode': 0666,
      'bufferSize': 4 * 1024,
    });

    fileStream.on('data', function(data) {
      hash.update(data);
    });

    fileStream.on('end', function() {
      var result = hash.digest(encoding = 'base64');
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
  }
};

/**
 * Expose `EncryptionHelper` Library.
 */
module.exports = EncryptionHelper;
