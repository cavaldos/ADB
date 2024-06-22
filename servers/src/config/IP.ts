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

export default { IP }; // Export the function as a default export