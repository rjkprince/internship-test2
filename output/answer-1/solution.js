const fs = require("fs").promises;

const solution = async () => {
  try {
    const csvString = (
      await fs.readFile("/input/question-1/main.csv")
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
        lines[i].split(",")[1]
      )},${sumVal.join(",")}\n`;
      i++;
    }
    await fs.writeFile("/output/answer-1/main.csv", csvStrOut);
  } catch (e) {
    console.log("Error, " + e.message);
  }
};

solution();
