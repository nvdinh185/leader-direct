import { InputNumber } from "antd";
import AntInputNumber from "./styles/inputNumber.style";
import WithDirection from "@lib/helpers/rtl";
const WDInputnumber = AntInputNumber(InputNumber);
const Inputnumber = WithDirection(WDInputnumber);

export default Inputnumber;
