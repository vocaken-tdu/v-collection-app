import { formatDistanceStrict, format, isAfter, isToday, isYesterday } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { ja } from 'date-fns/locale';

const TIMEZONE = 'Asia/Tokyo';

export function getRelativeTime(utcTime?: string, formatType?: 'day'): string {
  if (!utcTime) return '(不明な日付)';

  const time = new TZDate(utcTime, TIMEZONE);
  const now = new TZDate(new Date(), TIMEZONE);

  if (isAfter(time, now)) return '未来';
  if (isToday(time)) return formatDistanceStrict(time, now, { locale: ja, addSuffix: true });
  if (isYesterday(time)) return `昨日 ${format(time, 'HH:mm')}`;

  const formatStr = formatType === 'day' ? 'yyyy/M/d' : 'yyyy/M/d HH:mm';
  return format(time, formatStr);
}
