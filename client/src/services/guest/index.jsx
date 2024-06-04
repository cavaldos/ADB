import Axios from "../Axios";
import { message } from "antd";

const GuestService = {
  getAllDV: async () => {
    const res = await Axios.get("/khachhang/getAllDV");
    return res;
  },
  taoTKKH: async (data) => {
    const res = await Axios.post("/khachhang/taoKH", {
      sdt: data.sdt,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      matkhau: data.matkhau,
    });
    return res;
  },
  getAllDSNS: async () => {
    const res = await Axios.get("/khachhang/getAllDSNhaSi");
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/khachhang/getAllCa");
    return res;
  },
  lichRanh: async () => {
    const res = await Axios.get("/khachhang/lichRanh");
    return res;
  },
  loaiThuoc: async (mathuoc) => {
    const res = await Axios.get(`/khachhang/loaiThuoc/${mathuoc}`);
    return res;
  },
  loaiDV: async (madv) => {
    const res = await Axios.get(`/khachhang/loaiDV/${madv}`);
    return res;
  },
  chitietHoSo: async (type, id) => {
    console.log(type, id);
    const res = await Axios.get(`/khachhang/${type}/${id}`);
    return res;
  },
  lichHen: async (sdt) => {
    const res = await Axios.get(`/khachhang/lichHen/${sdt}`);
    return res;
  },
  taoLichHen: async (data) => {
    const res = await Axios.post("/khachhang/lichHen", {
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
  benhAn: async (sdt) => {
    const res = await Axios.get(`/khachhang/benhAn/${sdt}`);
    return res;
  },
  deleteLichHen: async (data) => {
    const res = await Axios.delete(`/khachhang/xoalichHen`, {
      mans: data.mans,
      sdt: data.sdt,
      stt: data.stt,
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
  capnhatKH: async (data) => {
    const res = await Axios.put("/khachhang/capnhatKH", {
      userId: data.userId,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      matkhaucu: data.matkhaucu,
      matkhaumoi: data.matkhaumoi,
    });
    console.log(res)
    console.log("here");

    if (res && res.response) {

      if (res.response.status === 400) {
        console.log("400 sai")

        message.error(res.response.data.error);
      }
    }
    return res;
  },
  doiMatKhau: async (data) => {
   const res = await Axios.put("/khachhang/capnhatKH", {
     userId: data.sdt,
     matkhaucu: data.matkhaucu,
     matkhaumoi: data.matkhaumoi,
   });
   if (res && res.response) {
     if (res.response.status === 422) {
       message.error(res.response.data.error);
     }
   }
   return res;
  },
  xemthongtinKH: async () => {
    const res = await Axios.get("/khachhang/xemthongtinKH");
    return res;
  },
  xemLRChuaDatTatCaNSTheoNgay: async () => {
    const res = await Axios.get("/khachhang/lichRanhTheoNgay");
    return res;
  },
};

export default GuestService;
