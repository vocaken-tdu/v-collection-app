import { notifications } from '@mantine/notifications';

export const NotifyFetchFailedImage = () => {
  notifications.show({
    id: 'fetchFailedImage',
    loading: true,
    autoClose: false,
    radius: 'md',
    title: '画像が取得できませんでした。',
    message: '現在対応中です。しばらくお待ちいただくか、長く続く場合はお問い合わせください。',
  });
};
