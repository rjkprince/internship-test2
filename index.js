const solution1 = require("./output/answer-1/solution");
const solution2 = require("./output/answer-2/solution");
const solution3 = require("./output/answer-3/solution");

const solveAll = async () => {
  try {
    await solution1();
    await solution2();
    await solution3();
    console.log("Solved all!");
  } catch (err) {
    console.error(err);
  }
};

solveAll();
