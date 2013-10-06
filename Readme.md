
# EncryptionHelper

  A collection of helper functions that encrypt, decrypt, and hash strings and files based on the native crypto module.
  This module can be used to create ciphers and decipher them.

## Installation

`npm install --save encryptionhelper`

## Usage

```javascript
var EncryptionHelper = require('encryptionhelper');

var hash = EncryptionHelper.checksum('some buffer/string data', 'md5');
// hash is equal to md5 of the given string
// Also supports MD5, SHA1, SHA256, and more (based on whatever NodeJS natively supports)

var fileHash = EncryptionHelper.checksumFile('path/to/file', 'md5', function (err, res) {
  // err is any error that occured
  // res is the md5 hash of the file at path/to/file
});

var myKey = 'my_secret_private_key';
var cipher = EncryptionHelper.cipher(myKey, 'some buffer/string data', 'aes256');
// Creates a aes256-based cipher using the key provided
// Supports more than just the AES256 algo-- supports all the algo's NodeJS's crypto module supports

var originalString =  EncryptionHelper.decipher(myKey, cipher);
// originalString === 'some buffer/string data'
```

## License

(The MIT License)

Copyright (c) 2013 Tarun Chaudhry &lt;tarunc92@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.