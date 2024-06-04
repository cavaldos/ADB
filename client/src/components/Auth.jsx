
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OnlineService from "~/services/online";
import Axios from "~/services/axios.config";
import GetCookie from "~/hooks/GetCookie";
import {
  setRole,
  updateUserInfo,
  deleteRole,
} from "~/redux/features/userSlice";
const Auth = () => {
  const state = useSelector((state) => state.stateData);
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const pass = GetCookie("password");
  React.useEffect(() => {
    OnlineService.checkLogin()
      .then((res) => {
        if (res.message === "ok") {
          Axios.post("/online/dangnhap", {
            matk: user.MAQTV || user.MANS || user.MANV || user.SODT,
            matkhau: pass,
          })
            .then((resp) => {
              dispatch(setRole(resp.data.info.ROLE));
              dispatch(updateUserInfo(resp.data.info));
            })
            .catch((error) => {
              console.log("err", error);
            });
        }
      })
      .catch((err) => {
        dispatch(deleteRole());
        console.log(err);
      });
  }, [state]);
  return <></>;
};

export default Auth;
