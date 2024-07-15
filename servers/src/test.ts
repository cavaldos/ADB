import TaskTimer from "./utils/TaskTimer";
// import UserService from "./api/services/User.sv";
// import TaxRepo from "./repositories/tax.repo";

async function main() {
  try {
    const timer = new TaskTimer();
    // const result = await TaxRepo.getAllTaxSetting();

    timer.stop();
    console.log("Time: ", timer.getDuration());
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
