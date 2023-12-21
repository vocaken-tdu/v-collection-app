export function GetRelativeTime({ RawTime }: { RawTime: string }) {
  const time = new Date(RawTime);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();

  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const dayDiff = Math.floor(diff / (24 * 60 * 60 * 1000));

  const showDate = () => {
    if (dayDiff < 0) {
      return '未来';
    }
    if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))}分前`;
    }
    if (dayDiff < 1) {
      return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
    }
    if (dayDiff < 2) {
      return `昨日 ${hour}:${minute}`;
    }
    return `${year}/${month}/${date} ${hour}:${minute}`;
  };

  return (
    <>
      {showDate()}
    </>
  );
}
