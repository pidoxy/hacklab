import {  notification } from "antd";

const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: type.toUpperCase(),
      description,
    });
  };

  export default openNotificationWithIcon;