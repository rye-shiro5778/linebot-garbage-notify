rm /mylinebot_prj.zip
cp ./dist/webhook.js ./index.js
npm-pack-zip
rm ./index.js