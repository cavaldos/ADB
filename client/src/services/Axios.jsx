import instance from "./axios.config";
import { message } from "antd";

const Axios = {
  get: async (url) => {
    try {
      const res = await instance.get(url);
      if (res.status === 500) {
        message.error("Thất bại");
      }
      return res.data;
    } catch (err) {}
  },
  post: async (url, data) => {
    try {
      const res = await instance.post(url, data);
      if (res.status === 200 || res.status === 201) {
        message.success("Thành công");
      }
      return res.data;
    } catch (err) {
      // message.error("Error");
      console.log(err);
      return err
    }
  },
  put: async (url, data) => {
    try {
      const res = await instance.put(url, data);
      if (res.status === 200 || res.status === 201) {
        message.success("Thành công");
      }
      return res.data;
    } catch (err) {
      // message.error("Error");
      console.log(err);
      return err;
    }
  },
  patch: async (url, data) => {
    try {
      const res = await instance.patch(url, data);
      if (res.status === 200 || res.status === 201) {
        message.success("Thành công");
      }
      return res.data;
    } catch (err) {
      message.error("Error");
      console.log(err);
    }
  },

  delete: async (url, data) => {
    try {
      const res = await instance.delete(url, {
        data: data,
      });
      if (res.status === 200 || res.status === 201) {
        message.success("Thành công");
      }
      return res.data;
    } catch (err) {
      // message.error(`delete ${"Error"}`);
      console.log(err);
      return err;
    }
  },
};
export default Axios;
