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
};

export { ConvertTime };
