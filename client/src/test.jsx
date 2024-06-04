import { useEffect } from "react";
import { GetUserInfo } from "./redux/features/userSlice";
import AdminService from "./services/admin/index";
import StaffService from "./services/staff";
import OnlineService from "./services/online";
import GuestService from "./services/guest";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "./redux/features/userSlice";
import axios from "axios";
import Axios from "./services/axios.config";
import GetCookie from "./hooks/GetCookie";
import Hash from "~/hooks/Hash";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJRVFYwMDAxIiwidXNlclJvbGUiOiJRVFYiLCJpYXQiOjE3MDI0NTYzMzEsImV4cCI6MTcwMjQ1NjM5MX0.jq6sWsZa1BPgRnjbyZsU1Gyg0eSeqOvU5NHGx5GuuYE";

const Test = () => {
  const dispatch = useDispatch();
  // const [cookie, setCookie] = useCookie("token", "");
  // const [password, setPassword] = useCookie("password", "");
  const tokena = GetCookie("token");
  // const pass = Cookies.get("password");
  // console.log(pass.length);
  // const hashPassword = new Hash(1);
  // const decodedpass = hashPassword.decode(password);

  // console.log("passs", password);

  useEffect(() => {
    // Axios.get("/checklogin")
    //   .then((res) => {
    //     console.log("resk", res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    // dispatch(updateUserInfo({
    //   SODT: "123",
    //   MANS: "123",
    //   MANV: "123",
    //   HOTEN: "123",
    //   PHAI: "123",
    //   NGAYSINH: "123",
    //   DIACHI: "123",
    //   VITRICV: "123",
    // }));
    // console.log("Test");
    // dispatch(GetUserInfo({name:"adfads"}));
    // axios
    //   .get("http://localhost:3000/checklogin", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    // GuestService.deleteLichHen({
    //   mans: "123",
    //   sdt: "123ssdfsdfasfsdfd",
    //   stt: "123",
    // }).then((res) => {
    //   console.log(res);
    // });
    // axios
    //   .delete("http://localhost:3000/khachhang/xoalichHen", {
    //     data: {
    //       mans: "123",
    //       sdt: "123sd",
    //       stt: "123",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // AdminService.getAllThuoc()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return <>{/* <Print /> */}</>;
};
export default Test;
