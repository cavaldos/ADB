import { useState } from "react";

const useCookie = (key, initialValue) => {
  const [cookieValue, setCookieValue] = useState(() => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith(key));

      if (cookie) {
        const value = cookie.split("=")[1];
        return JSON.parse(decodeURIComponent(value));
      }

      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setCookie = (value, expirationDays = 365) => {
    try {
      const encodedValue = encodeURIComponent(JSON.stringify(value));
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);

      const cookie = `${key}=${encodedValue}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookie;

      setCookieValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCookie = () => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    setCookieValue(initialValue);
  };

  return [cookieValue, setCookie, removeCookie];
};

export default useCookie;
