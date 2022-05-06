import pino from "pino";
import dayjs from "dayjs";

export default pino({
  prettyPrint: true,
  timestamp: ()=> `,"time":"${dayjs().format()}"`,
  base: {
    pid: false
  },
});
