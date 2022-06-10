#! /bin/bash
./node_modules/.bin/tsc --noEmit
if [ $? -ne 0 ]; then exit; fi

./node_modules/esbuild/bin/esbuild src/main.ts src/webhook.ts \
--bundle=true \
--platform=node \
--target=node14 \
--format=cjs \
--outdir=dist
