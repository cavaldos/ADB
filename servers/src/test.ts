
async function main() {
  try {
    const query =
      "INSERT INTO [Account] ([id], [company], [username], [password]) VALUES (@id, @company, @username, @password);";
    const params = {
      "@id": 1467,
      "@company": "Compandy dsgfdafa",
      "@username": "usedsfsdfsdfnafad",
      "@password": "passwodfsrd",
    };
    console.log(query, params);
    // const result = await Database.executeWithParams(query, params);
    // console.log("Insert Product Result:", result);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
main();
