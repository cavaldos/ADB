import DataConnect from "./utils/DataConnect";
import TaskTimer from "./utils/TaskTimer";
import CategoryRepo from "./repositories/category.repo";
async function main() {
  try {
    const timer = new TaskTimer();
    const query = `Select *  from Category ca join Instructor i on ca.CategoryID = i.InstructorID   join Course co on co.InstructorID = i.InstructorID where i.InstructorID = 9`;

    // await DataConnect.execute(query);

    timer.stop();
    console.log("Categories: ", timer.getDuration());
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
