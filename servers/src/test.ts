import TaskTimer from "./utils/TaskTimer";
import UserService from "./api/services/User.sv";
async function main() {
  try {
    const timer = new TaskTimer();

    await UserService.getInstructorByID(1);
    // console.log("Instructor: ", result);

    timer.stop();
    console.log("Categories: ", timer.getDuration());
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
