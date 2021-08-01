# MakeDirectory

A simple script to make directory for scattered files.

Maybe, It's useful for people who use
[PixivDownloader](https://chrome.google.com/webstore/detail/pixiv-downloader/fnbkeopcpjainobjebddfcnnknmfipid)
in the following settings.

- `?member-name? - ?title? (?illust-id?) ?page??[ページ]?`

## How it works

If you have the following files at `targetRoot` directory.

```
targetRoot
├── チノ - ほげほげ (01234567) 1ページ.jpg
├── チノ - ほげほげ (01234567) 2ページ.jpg
└── チノちゃん - no-image (01234567) .jpg
```

This script make the following directory.

```
targetRoot
├── チノ
├── チノ - ほげほげ (01234567) 1ページ.jpg
├── チノ - ほげほげ (01234567) 2ページ.jpg
├── チノちゃん
└── チノちゃん - no-image (01234567) .jpg
```

Sorry, this script does not support to move files 😭

## Usage

```shell
npm install
```

change config in `index.js` .

```
node index.js
```
