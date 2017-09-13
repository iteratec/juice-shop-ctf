# JuiceShop fbctf

This repo lets you create a json export file for the facebook capture the flag (fbctf) plattform.

## Disclaimer: This repository is not an official juice-shop repository. It is maintained by iteratec GmbH.

## Usage
```bash
git clone git@github.com:iteratec/juice-shop-ctf.git
cd juice-shop-ctf
node ./bin/juice-shop-ctf.js
```

### Populating the [fbctf](https://github.com/facebook/fbctf) plattform.

1. Login the fbctf plattform as a admin user
2. Go to `/index.php?p=admin&page=controls` page
3. Click `Import Full Game` and upload the `fbctf-game.json` previously generated (See "usage")
4. After a few seconds a popup should appear confirming the succesful import

This program is free software: you can redistribute it and/or modify it
under the terms of the [MIT license](LICENSE). OWASP Juice Shop and any
contributions are Copyright © by Bjoern Kimminich 2016-2017.