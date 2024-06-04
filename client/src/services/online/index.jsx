import Axios from "../Axios";
import { message } from "antd";

const OnlineService = {
  checkLogin: async () => {
    const res = await Axios.get("/checklogin");
    return res;
  },
  taoTKKH: async (data) => {
    const res = await Axios.post("/online/taoKH", {
      sdt: data.sdt,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      matkhau: data.matkhau,
    });
    return res;
  },
  dangnhap: async (data) => {
    const res = await Axios.post("/online/dangnhap", {
      matk: data.matk,
      matkhau: data.matkhau,
    });
    if(res && res.response)
    {
      if (res.response.status === 401) {
        message.error(res.response.data.error);
      }
      if (res.response.status === 403) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/online/getAllDV");
    return res;
  },
  getAllDSNS: async () => {
    const res = await Axios.get("/online/getAllDSNhaSi");
    return res;
  },
};
export default OnlineService;
