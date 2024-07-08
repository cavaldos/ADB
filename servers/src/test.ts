import DataConnect from "./utils/DataConnect";
import TaskTimer from "./utils/TaskTimer";
import CategoryRepo from "./repositories/category.repo";
async function main() {
  try {
    const timer = new TaskTimer();

    const categories = await CategoryRepo.getAllCategory();
    const categories2 = await CategoryRepo.getCategoryById(1);
    await CategoryRepo.createCategory(
      "Electrsdfodfgdsdfgdfgfndsfsgfdics",
      "Electronfsaddfdfggfdfsadafdfidc devices",
      ""
    );

    timer.stop();
    console.log(categories2);
    console.log(categories);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
