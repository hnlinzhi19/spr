#!/usr/bin/env node


var program = require("commander");
const buildFn = require("../build");

program
  .version("v" + require("../package.json").version)
  .description("Manipulate asar archive files");

program
  .command("pack <output>")
  .alias("p")
  .description("create asar archive")
  .action(function (output) {
    console.log(output + "文件成功生成");
    buildFn(output);
  });
program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
