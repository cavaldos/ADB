import Axios from "../Axios";
import { message } from "antd";

const StaffService = {
  getLichRanhNS: async () => {
    const res = await Axios.get("/nhanvien/lichRanhNS");
    return res;
  },
  getLichHenNS: async () => {
    const res = await Axios.get("/nhanvien/lichHen");
    return res;
  },
  taoTaiKhoanKH: async (data) => {
    const res = await Axios.post("/nhanvien/khachHang", {
      sdt: data.sdt,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
    });
    if (res && res.response) {
      if (res.response.status === 409) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  taoHoaDon: async (data) => {
    const res = await Axios.post("/nhanvien/taohoaDon", {
      sdt: data.sdt,
      stt: data.stt,
      manv: data.manv
    });
    if(res && res.response)
    {
      if (res?.response?.status === 422) {
        message.error(res.response.data.error);
      }
      if (res?.response?.status === 404) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  xacNhanThanhToan: async (data) => {
    try {
      const res = await Axios.put("/nhanvien/xacNhanHoaDon", {
        sdt: data.sdt,
        stt: data.stt,
        manv: data.manv,
      });
      if(!res.success)
      {
        if (res?.response.status === 422) {
          message.error(res?.response?.data?.error);
        }
        if (res?.response.status === 404) {
          message.error(res?.response?.data?.error);
        }
      }
  
      return res;
    } catch (error) {
      console.error("Lỗi khi xác nhận thanh toán:", error);
      throw error; // Ném lỗi để bắt ở nơi gọi hàm nếu cần
    }
  },
  doiMatKhau: async (data) => {
    const res = await Axios.put("/nhanvien/matKhau", {
      manv: data.manv,
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
  getAllThuoc: async () => {
    const res = await Axios.get("/nhanvien/getAllThuoc");
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/nhanvien/getAllDV");
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/nhanvien/getAllCa");
    return res;
  },
  getHoaDon: async (sdt) => {
    const res = await Axios.get(`/nhanvien/hoaDon/${sdt}`);
    return res;
  },
  xemBenhAn: async (sdt) => {
    const res = await Axios.get(`/nhanvien/benhAn/${sdt}`);
    return res;
  },
  getAllDSNhaSi: async () => {
    const res = await Axios.get("/nhanvien/getAllDSNhaSi");
    return res;
  },
  deleteLichHen: async (data) => {
    const res = await Axios.delete("/nhanvien/lichHen", {
      mans: data.mans,
      sdt: data.sdt,
      stt: data.stt,
    });
    if (res && res.response) {
      if (res.response.status === 400) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  matKhau: async (data) => {
    const res = await Axios.put("/nhanvien/matKhau", data);
    return res;
  },
  taoLichHen: async (data) => {
    const res = await Axios.post("/nhanvien/lichHen",{
      sodt: data.sodt,
      mans: data.mans,
      sott: data.sott,
      lydokham: data.lydokham,
    });
    if (res && res.response) {
      if (res.response.status === 422) {
        message.error(res.response.data.error);
      }
    }
    return res;
  },
  getAllNS: async () => {
    const res = await Axios.get("/online/getAllDSNhaSi");
    return res;
  },
};
export default StaffService;
