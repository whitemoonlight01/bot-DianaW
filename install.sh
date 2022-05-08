#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install nodejs
apt-get install libwebp
apt-get install ffmpeg
apt-get install wget
apt-get install tesseract
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm audit fix
npm i imgbb-uploader
npm cache clean -f
npm install --dev
npm i got

echo "[*] All dependencies have been installed, por favor usa ahora el comando \"npm start\" para que te genere el codigo QR XDXD"
echo "avisame si hay un Bug"
echo "esta mamada de bot es basico, no esperes que haga grandes cosas"
echo "seguire incorporandole mas parches y extenciones"
