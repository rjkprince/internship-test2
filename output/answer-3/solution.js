const fs = require("fs").promises;
const path = require("path");

const solution = async () => {
  try {
    const csvString = (
      await fs.readFile(
        path.resolve(__dirname, "../../input/question-3/main.csv")
      )
    ).toString();
    const lines = csvString.split("\n");
    let csvStrOut = "";
    csvStrOut += "Team,Yellow Cards, Red Cards\n";
    let i = 1;
    const entities = lines[0].split(",");
    const teamIndex = entities.indexOf("Team");
    const yellowIndex = entities.indexOf("Yellow Cards");
    const redIndex = entities.indexOf("Red Cards");
    const result = [];
    while (i < lines.length) {
      const values = lines[i].split(",");
      const team = values[teamIndex];
      const yellowCards = parseInt(values[yellowIndex]);
      const redCards = parseInt(values[redIndex]);
      result.push({ team, yellowCards, redCards });
      i++;
    }
    result.sort(
      (a, b) => b.redCards - a.redCards || b.yellowCards - a.yellowCards
    );
    result.forEach((res) => {
      csvStrOut += `${res.team},${res.yellowCards},${res.redCards}\n`;
    });
    await fs.writeFile(path.resolve(__dirname, "./main.csv"), csvStrOut);
  } catch (e) {
    console.log("Error, " + e);
  }
};

solution();

module.exports = solution;
