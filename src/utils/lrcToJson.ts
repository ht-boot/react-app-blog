import fs from "fs";

const readLrcFile = async (filePath: fs.PathOrFileDescriptor) => {
  const lrcContent = fs.readFileSync(filePath, "utf8");
  const lines = lrcContent.split("\n");
  const json: any = {};

  lines.forEach((line) => {
    if (line.startsWith("[")) {
      const key = line.replace("[", "").replace("]", "");
      const value = lines
        .find((l) => l.startsWith(key + ":"))
        ?.replace(key + ":", "");
      if (value) {
        json[key] = value;
      }
    }
  });

  return json;
};

const lrcToJson = async (lrcFilePath: any) => {
  const json = await readLrcFile(lrcFilePath);
  return json;
};

export default lrcToJson;
