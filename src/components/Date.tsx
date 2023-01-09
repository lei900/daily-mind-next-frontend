import { parseISO, format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export default function Date({
  dateString,
  className,
}: {
  dateString: string;
  className: string;
}) {
  const date = parseISO(dateString);
  let time = formatDistanceToNow(date, { locale: ja });

  if (time.indexOf("未満") !== -1) {
    time = "たった今";
  } else if (time.indexOf("か月") !== -1 || time.indexOf("年") !== -1) {
    time = format(date, "yyyy年M月d日", { locale: ja });
  } else {
    time = time + "前";
  }

  return (
    <time dateTime={dateString} className={className}>
      {time}
    </time>
  );
}
