const ConvertTime = {
  convertDateToDDMMYYYY: (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
  },

  convertTimeToDDMM: (timeString) => {
    const date = new Date(timeString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based

    return `${day} - ${month}`;
  },
  convertTimeToHHMM: (timeString) => {
    const date = new Date(timeString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return ` ${hours}:${minutes} - ${day}/${month}/${year}`;
  },
};

export { ConvertTime };
