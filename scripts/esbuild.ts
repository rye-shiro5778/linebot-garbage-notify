import { build, BuildOptions } from "esbuild";
import pkg from "../package.json";

const dependencies = Object.keys(pkg.dependencies ?? {});
const external = [...dependencies];

const options: BuildOptions = {
  entryPoints: ["./src/webhook.ts", "./src/main.ts"],
  platform: "node",
  target: "node14",
  format: "cjs",
  outdir: "./dist",
  bundle: true,
  external,
};

build(options)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
