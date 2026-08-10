import moment from "moment";
import { toBanglaNumber } from "./toBanglaNumber";

export const formatBanglaDate = ({
  date,
  showTime = false,
  showDate = true,
}: {
  date: Date | string;
  showTime?: boolean;
  showDate?: boolean;
}) => {
  const momentDate = moment(date);

  if (!momentDate.isValid()) return "";

  const datePart = momentDate.format("DD-MM-YYYY");

  // শুধু date
  if (!showTime) {
    return showDate ? toBanglaNumber(datePart) : "";
  }

  // Period
  const hour = momentDate.hour();

  let period = "";

  if (hour < 12) {
    period = "সকাল";
  } else if (hour < 15) {
    period = "দুপুর";
  } else if (hour < 18) {
    period = "বিকাল";
  } else {
    period = "রাত";
  }

  const timePart = momentDate.format("hh:mm");

  const banglaTime = `${period} ${toBanglaNumber(timePart)}`;

  // শুধু time
  if (!showDate) {
    return banglaTime;
  }

  // date + time
  return `${toBanglaNumber(datePart)} ${banglaTime}`;
};