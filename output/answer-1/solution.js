const fs = require("fs").promises;
const path = require("path");

const solution = async () => {
  try {
    const csvString = (
      await fs.readFile(
        path.resolve(__dirname, "../../input/question-1/main.csv")
      )
    ).toString();
    const lines = csvString.split("\n");
    let csvStrOut = "";
    csvStrOut += lines[0] + "\n";
    let i = 1;
    while (i < lines.length) {
      let entities = lines[i].split(",");
      const startYear = parseInt(entities[0]);
      const j = i;
      const sumVal = entities.map((ent) => 0);
      for (; i < Math.min(j + 10, lines.length); i++) {
        entities = lines[i].split(",");
        entities.forEach((ent, pos) => {
          ent = parseInt(ent);
          sumVal[pos] += ent;
        });
      }
      sumVal.splice(0, 2);
      csvStrOut += `${startYear},${parseInt(
        lines[i - 1].split(",")[1]
      )},${sumVal.join(",")}\n`;
    }
    await fs.writeFile(path.resolve(__dirname, "./main.csv"), csvStrOut);
  } catch (e) {
    console.log("Error, " + e);
  }
};

solution();
