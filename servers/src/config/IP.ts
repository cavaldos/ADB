import axios from "axios";
import os from "os"; // Import the os module from Node.js

function IP() {
  const networkInterfaces = os.networkInterfaces();
  const ipAddresses: any = [];

  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const ifaceList: any = networkInterfaces[interfaceName];
    ifaceList.forEach((iface: any) => {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddresses.push(iface.address);
      }
    });
  });

  return ipAddresses;
}
async function fetchPublicIP() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Could not fetch public IP:", error);
    return "localhost";
  }
}
export default { IP }; // Export the function as a default export
export { fetchPublicIP }; // Export the function as a named export