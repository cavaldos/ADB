import TaskTimer from "./utils/TaskTimer";
import UserService from "./api/services/User.sv";


async function main() {
  try {
    const timer = new TaskTimer();

    timer.stop();
    console.log("Time: ", timer.getDuration());
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
