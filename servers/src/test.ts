// import DataConnect from "./utils/DataConnect";
async function main() {
  try {
    // const query = `use [COURSERA3] INSERT INTO Admin (UserID)
    //         VALUES (3); `;
    // const query2 = `select *from [User] WHERE [User].UserID = 4;`;
    const query = `SELECT * from chat
`;
    // const params = "";

    // const result = await DataConnect.execute(query);
    // console.log(result);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
