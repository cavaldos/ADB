import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const Loading = () => {
    return (
     <div className=" flex justify-center h-[500px] items-center">
         <Spin
           indicator={
             <LoadingOutlined
               style={{
                 fontSize: 60
               }}
               spin
             />
           }
         />
     </div>
    );
}
export default Loading;
