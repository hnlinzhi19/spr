const glob = require("glob");
const path = require("path");
const fs = require("fs");
const texturePacker = require("free-tex-packer-core");

let options = {
  textureName: "my-texture", //文件名
  fixedSize: false,
  padding: 2, // 精灵图片元素间距
  allowRotation: false, //是否旋转
  detectIdentical: true,
  allowTrim: false, //是否裁切
  removeFileExtension: true, //删除文件后缀
  prependFolderName: false,
  tinify: false, // 要不要压缩图片
  tinifyKey: "5RX4Z4zrt0YgfRwGTjW45ZTb4JdgR0T7", // tini 秘钥
  packer: "MaxRectsPacker", // 图片生成的类型
  exporter: {
    // 自定义导出
    fileExt: "js", //导出文件后缀
    template: path.join(__dirname, `./template.mst`), // 导出模板
  },
};

const buildFn = (output) => {
  glob(path.join(process.cwd(), "**/*.png"), {}, (er, files) => {
    if (er) {
      throw new Error("dte");
    }

    let images = files.map((item) => {
      return {
        path: item,
        contents: fs.readFileSync(item),
      };
    });
    texturePacker(images, options, (files, error) => {
      if (error) {
        console.error("Packaging failed", error);
      } else {
        for (let item of files) {
          fs.writeFile(path.join(output, item.name), item.buffer, (err) => {
            if (err) throw err;
            console.log(item.name + "文件已被保存");
          });
        }
      }
    });
  });
};

module.exports = buildFn;
