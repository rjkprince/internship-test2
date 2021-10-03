const fs = require("fs").promises;
const path = require("path");

const solution = async () => {
  try {
    const csvString = (
      await fs.readFile(
        path.resolve(__dirname, "../../input/question-2/main.csv")
      )
    ).toString();
    const lines = csvString.split("\n");
    let csvStrOut = "";
    csvStrOut += ",min,max\n";
    csvStrOut += "occupation,,\n";
    let i = 1;
    const entities = lines[0].split(",");
    const occupationIndex = entities.indexOf("occupation");
    const ageIndex = entities.indexOf("age");
    const result = {};
    while (i < lines.length) {
      const values = lines[i].split(",");
      const occupation = values[occupationIndex];
      const age = parseInt(values[ageIndex]);
      if (result.hasOwnProperty(occupation)) {
        const minAge = result[occupation]["minAge"];
        const maxAge = result[occupation]["maxAge"];
        result[occupation]["minAge"] = Math.min(minAge, age);
        result[occupation]["maxAge"] = Math.max(maxAge, age);
      } else {
        result[occupation] = {
          minAge: age,
          maxAge: age,
        };
      }
      i++;
    }
    const sortedResult = Object.keys(result)
      .sort()
      .reduce(function (acc, key) {
        acc[key] = result[key];
        return acc;
      }, {});

    for (const occupation in sortedResult) {
      csvStrOut += `${occupation},${sortedResult[occupation]["minAge"]},${sortedResult[occupation]["maxAge"]}\n`;
    }
    await fs.writeFile(path.resolve(__dirname, "./main.csv"), csvStrOut);
  } catch (e) {
    console.log("Error, " + e);
  }
};

solution();
