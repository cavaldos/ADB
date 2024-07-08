import DataConnect from "./utils/DataConnect";
import TaskTimer from "./utils/TaskTimer";
import CategoryRepo from "./repositories/category.repo";
async function main() {
  try {

    const timer = new TaskTimer();
    
    const categories = await CategoryRepo.getAllCategory();
    timer.stop();
    console.log(categories[0]);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
