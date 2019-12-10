import axios from "axios";
import uuid from "uuid/v4";

const url = "https://silverkit-api.silverkit.io/api/logs";
// const url = "http://localhost:8000/api/logs";

export default class Logger {
  log(logStr) {
    let obj = {
      content: logStr,
      uuid: uuid()
    };

    console.log(logStr);

    axios.post(url, obj).catch(error => {
      console.log(error);
    });
  }
}
