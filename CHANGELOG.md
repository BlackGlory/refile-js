# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.4](https://github.com/BlackGlory/refile-js/compare/v0.3.3...v0.3.4) (2021-03-20)


### Features

* export HTTPClientError ([1260a77](https://github.com/BlackGlory/refile-js/commit/1260a7715e994500f025ad9239024e6d3fe25627))

### [0.3.3](https://github.com/BlackGlory/refile-js/compare/v0.3.2...v0.3.3) (2021-03-19)

### [0.3.2](https://github.com/BlackGlory/refile-js/compare/v0.3.1...v0.3.2) (2021-03-17)

### [0.3.1](https://github.com/BlackGlory/refile-js/compare/v0.3.0...v0.3.1) (2021-03-17)

## [0.3.0](https://github.com/BlackGlory/refile-js/compare/v0.2.7...v0.3.0) (2021-03-14)


### ⚠ BREAKING CHANGES

* rename /api to /admin

### Features

* rename /api to /admin ([3e13ee1](https://github.com/BlackGlory/refile-js/commit/3e13ee17ec9c466638cc6b2f7ead1b5849e289b3))

### [0.2.7](https://github.com/BlackGlory/refile-js/compare/v0.2.6...v0.2.7) (2021-03-10)


### Features

* add keepalive option ([60e40d0](https://github.com/BlackGlory/refile-js/commit/60e40d043de46b6ecbefde38e4262f3c8d6e725a))

### [0.2.6](https://github.com/BlackGlory/refile-js/compare/v0.2.5...v0.2.6) (2021-03-05)

### [0.2.5](https://github.com/BlackGlory/refile-js/compare/v0.2.4...v0.2.5) (2021-02-28)

### [0.2.4](https://github.com/BlackGlory/refile-js/compare/v0.2.3...v0.2.4) (2021-02-25)

### [0.2.3](https://github.com/BlackGlory/refile-js/compare/v0.2.2...v0.2.3) (2021-02-14)

### [0.2.2](https://github.com/BlackGlory/refile-js/compare/v0.2.1...v0.2.2) (2021-02-04)


### Bug Fixes

* peer dependencies ([6c84ef2](https://github.com/BlackGlory/refile-js/commit/6c84ef21001af89c0f615e074da9246b24256475))

### [0.2.1](https://github.com/BlackGlory/refile-js/compare/v0.2.0...v0.2.1) (2021-02-03)

## [0.2.0](https://github.com/BlackGlory/refile-js/compare/v0.1.12...v0.2.0) (2021-01-29)


### ⚠ BREAKING CHANGES

* RefileClient#listFilesByItem => getFileHashesByItem
* RefileClient#listItems => RefileClient#getAllItemIds
* RefileClient#listNamespaces => getAllNamespaces

### Features

* rename listFilesByItem => getFileHashesByItem ([101f13b](https://github.com/BlackGlory/refile-js/commit/101f13b3c90288b3c4f5a73b8fbca9f74861de26))
* rename listItems => getAllItemIds ([ee0e25e](https://github.com/BlackGlory/refile-js/commit/ee0e25e9a3c407fefc16b8c19b00a883f43b0186))
* rename listItemsByFile => getItemIdsByFile ([cb2d397](https://github.com/BlackGlory/refile-js/commit/cb2d397bc36516778a658808f327c23891ec7db1))
* rename listNamespaces => getAllNamespaces ([09a3222](https://github.com/BlackGlory/refile-js/commit/09a32226e005cd94b357a70354efc731a0af3e68))

### [0.1.12](https://github.com/BlackGlory/refile-js/compare/v0.1.11...v0.1.12) (2021-01-26)

### [0.1.11](https://github.com/BlackGlory/refile-js/compare/v0.1.10...v0.1.11) (2021-01-20)

### [0.1.10](https://github.com/BlackGlory/refile-js/compare/v0.1.9...v0.1.10) (2021-01-15)


### Bug Fixes

* esm bundle ([0bf47d1](https://github.com/BlackGlory/refile-js/commit/0bf47d1bb1e301856e2926b25c64af93989b3f1f))

### [0.1.9](https://github.com/BlackGlory/refile-js/compare/v0.1.8...v0.1.9) (2021-01-08)


### Bug Fixes

* createHash in browser ([88ef390](https://github.com/BlackGlory/refile-js/commit/88ef390a11794397abd994ea1fc2c71f70d180dc))

### [0.1.8](https://github.com/BlackGlory/refile-js/compare/v0.1.7...v0.1.8) (2021-01-08)


### Bug Fixes

* add domexception for fetch-blob in Node.js ([18f8df2](https://github.com/BlackGlory/refile-js/commit/18f8df2d0db5b4167304c057ce749372713c9657))

### [0.1.7](https://github.com/BlackGlory/refile-js/compare/v0.1.6...v0.1.7) (2021-01-08)


### Features

* add getFileHash ([710328b](https://github.com/BlackGlory/refile-js/commit/710328b50dc963c8ee6451da24125fb7bef5988a))

### [0.1.6](https://github.com/BlackGlory/refile-js/compare/v0.1.5...v0.1.6) (2021-01-08)


### Bug Fixes

* uploadFile in Node.js ([32513a6](https://github.com/BlackGlory/refile-js/commit/32513a648c8bff60fc6197688cf69bbcff4c8615))

### [0.1.5](https://github.com/BlackGlory/refile-js/compare/v0.1.4...v0.1.5) (2021-01-07)

### [0.1.4](https://github.com/BlackGlory/refile-js/compare/v0.1.3...v0.1.4) (2021-01-07)


### Features

* replace node-fetch with extra-fetch ([2d3b786](https://github.com/BlackGlory/refile-js/commit/2d3b7861f21bc0c3598d21ca1c37fb692e10657e))

### [0.1.3](https://github.com/BlackGlory/refile-js/compare/v0.1.2...v0.1.3) (2021-01-07)


### Features

* remove cross-fetch ([32df93c](https://github.com/BlackGlory/refile-js/commit/32df93cd377778b9ca4c9cdc589bc9a193ec5839))


### Bug Fixes

* browser fields ([7f4c78a](https://github.com/BlackGlory/refile-js/commit/7f4c78ab73f6e9b9437b3526836544981be6d795))

### [0.1.2](https://github.com/BlackGlory/refile-js/compare/v0.1.1...v0.1.2) (2021-01-07)


### Features

* remove cross-fetch ([32df93c](https://github.com/BlackGlory/refile-js/commit/32df93cd377778b9ca4c9cdc589bc9a193ec5839))

### [0.1.1](https://github.com/BlackGlory/refile-js/compare/v0.1.0...v0.1.1) (2021-01-07)


### Bug Fixes

* createHash ([b69d550](https://github.com/BlackGlory/refile-js/commit/b69d550a2180a273ba95629d97acfd08c6a66b0c))

## 0.1.0 (2021-01-07)


### Features

* init ([4aa7608](https://github.com/BlackGlory/refile-js/commit/4aa76087e92d53e58908c25bd45bb21ef57897a5))


### Bug Fixes

* bundle ([75d6153](https://github.com/BlackGlory/refile-js/commit/75d6153e0fba6fb526e20e03af428230af0214ef))
