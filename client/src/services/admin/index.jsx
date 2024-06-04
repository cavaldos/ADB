import Axios from "../Axios";
import { message } from "antd";

const AdminService = {
  getAllNhanVien: async () => {
    const res = await Axios.get("/qtv/getAllNhanVien");
    return res;
  },
  getAllNhaSi: async () => {
    const res = await Axios.get("/qtv/getAllNhaSi");
    return res;
  },
  getAllQTV: async () => {
    const res = await Axios.get("/qtv/getAllQTV");
    return res;
  },
  getAllKhachHang: async () => {
    const res = await Axios.get("/qtv/getAllKhachHang");
    return res;
  },
  getAllThuoc: async () => {
    const res = await Axios.get("/qtv/getAllThuoc");
    return res;
  },

  getAllDV: async () => {
    const res = await Axios.get("/qtv/getAllDV");
    return res;
  },

  getAllCa: async () => {
    const res = await Axios.get("/qtv/getAllCa");
    return res;
  },

  getAllDSNhaSi: async () => {
    const res = await Axios.get("/qtv/getAllDSNhaSi");
    return res;
  },
  themThuoc: async (data) => {
    const res = await Axios.post("/qtv/themThuoc", data);
    if (res && res.response) {
      if (res.response.status === 422) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  themDV: async (data) => {
    const res = await Axios.post("/qtv/themDV", data);
    if (res && res.response) {
      if (res.response.status === 400) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  nhapThuoc: async (data) => {
    const res = await Axios.put("/qtv/nhapThuoc", data);
    if (res && res.response) {
      if (res.response.status === 422) {
        message.error(res.response.data.error);
      }
      if (res.response.status === 400) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  xoaThuoc: async (data) => {
    const res = await Axios.delete("/qtv/xoaThuoc", data);
    if (res && res.response) {
      if (res.response.status === 405) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  suaThuoc: async (data) => {
    const res = await Axios.put("/qtv/suaThuoc", data);
    if (res && res.response) {
      if (res.response.status === 304) {
        message.error(res.response.data.error);
      }
      if (res.response.status === 400) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  suaDV: async (data) => {
    const res = await Axios.put("/qtv/suaDV", data);
    return res;
  },
  suaNV: async (data) => {
    const res = await Axios.put("/qtv/nhanVien", data);
    return res;
  },
  themNhanVien: async (data) => {
    const res = await Axios.post("/qtv/nhanVien", data);
    return res;
  },
  blockNhanVien: async (data) => {
    const res = await Axios.put("/qtv/blockNhanVien", data);
    return res;
  },
  unblockNhanVien: async (data) => {
    const res = await Axios.put("/qtv/unblockNhanVien", data);
    return res;
  },
  themNhaSi: async (data) => {
    const res = await Axios.post("/qtv/nhasi", data);
    return res;
  },
  suaNS: async (data) => {
    const res = await Axios.put("/qtv/nhasi", data);
    return res;
  },
  blockNhaSi: async (data) => {
    const res = await Axios.put("/qtv/blockNhaSi", data);
    return res;
  },
  unblockNhaSi: async (data) => {
    const res = await Axios.put("/qtv/unblockNhaSi", data);
    return res;
  },
  themQTV: async (data) => {
    const res = await Axios.post("/qtv/themQTV", data);
    return res;
  },
  blockKH: async (data) => {
    const res = await Axios.put("/qtv/blockKH", data);
    return res;
  },
  unblockKH: async (data) => {
    const res = await Axios.put("/qtv/unblockKH", data);
    return res;
  },
  doimatKhau: async (data) => {
    const res = await Axios.put("/qtv/matKhau", {
      maqtv: data.maqtv,
      matkhaucu: data.matkhaucu,
      matkhaumoi: data.matkhaumoi,
    });
    if (res && res.response) {
      if (res.response.status === 422) {
        message.error(res.response.data.error);
      }
      if (res.response.status === 404) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
};
export default AdminService;
