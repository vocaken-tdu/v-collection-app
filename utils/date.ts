export function getRelativeTime(RawTime?: string, format?: 'day') {
  if (!RawTime) {
    return '(不明な日付)';
  }

  // 日付を取得
  const time = new Date(RawTime);

  // 年月日を取得
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  // 時分を取得(0埋め済み)
  const hourPadded = time.getHours().toString().padStart(2, '0');
  const minutePadded = time.getMinutes().toString().padStart(2, '0');

  // 現在時刻との差を取得
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const dayDiff = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (dayDiff < 0) {
    // 差分がマイナスの場合は未来
    return '未来';
  }
  if (diff < 60 * 60 * 1000) {
    // 1時間以内
    return `${Math.floor(diff / (60 * 1000))}分前`;
  }
  if (dayDiff < 1) {
    // 1日以内
    return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
  }
  if (dayDiff < 2) {
    // 2日以内
    return `昨日 ${hourPadded}:${minutePadded}`;
  }
  // それ以外
  if (format === 'day') {
    return `${year}/${month}/${date}`;
  }
  return `${year}/${month}/${date} ${hourPadded}:${minutePadded}`;
}
