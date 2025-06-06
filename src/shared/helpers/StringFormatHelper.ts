import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";

export class StringFormatHelper {
  public static formatFriendlyDate(date: Date): string {
    const now = new Date();

    if (+now - +date < 60 * 1000) {
      return "just now";
    }

    const diffInMinutes = Math.floor((+now - +date) / 60000);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24 && isToday(date)) {
      return `${diffInHours}h ago`;
    }

    if (isYesterday(date)) {
      return `Yesterday at ${format(date, "h:mm a")}`;
    }

    if (isThisWeek(date)) {
      return `${format(date, "EEEE 'at' h:mm a", { locale: enUS })}`;
    }

    if (isThisYear(date)) {
      return `${format(date, "MMM d 'at' h:mm a", { locale: enUS })}`;
    }

    return format(date, "dd/MM/yyyy 'at' h:mm a");
  }
}
