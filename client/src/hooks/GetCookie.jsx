import Cookies from "js-cookie";

const removeDoubleQuotes = (str) => {
  if (str === undefined) return "";
  return str.replace(/"/g, "");
};
const GetCookie = (name) => {
  const cookie = Cookies.get(name);
  const newCookie = removeDoubleQuotes(cookie || "");
  return newCookie;
};

export default GetCookie;
