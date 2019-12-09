import axios from "axios";
import uuid from "uuid/v4";

export default class Logger {
  log(logStr) {
    let obj = {
      content: logStr,
      uuid: uuid()
    };

    axios
      .post("https://silverkit-api.silverkit.i//api/logs", obj)
      .catch(error => {
        console.log(error);
      });
  }
}
