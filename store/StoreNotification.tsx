import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

// 送信中の通知を表示
export function Sending(name: string, comment: string) {
  notifications.show({
    id: 'sending',
    loading: true,
    autoClose: false,
    radius: 'md',
    title: `${name}さんのコメントを送信中……`,
    message: comment,
  });
}

// 送信完了の通知を表示
export function Sent(comment: string) {
  notifications.update({
    id: 'sending',
    color: 'teal',
    title: '送信しました！',
    message: comment,
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    loading: false,
    autoClose: 2000,
  });
}

// 送信失敗の通知を表示
export function SendFailed() {
  notifications.update({
    id: 'sending',
    color: 'red',
    title: '送信に失敗しました。',
    message:
      '通信環境を確認して再度送信してみてください。何度も失敗する場合はお問い合わせください。リロードするとコメントが復元されます。',
    loading: false,
    autoClose: false,
  });
}

// 未送信の通知を表示
export function RemainComment() {
  notifications.show({
    color: 'yellow',
    radius: 'md',
    title: '未送信かも……？',
    message:
      '送信できなかったかもしれないコメントを復元しました。送れていなかったら再度送信してみてください。',
  });
}

// イラストリストが取得できなかったときの通知を表示
export function FetchFailedIllustList() {
  notifications.show({
    id: 'fetchFailedIllustList',
    loading: true,
    autoClose: 6000,
    radius: 'md',
    title: 'イラスト情報が取得できませんでした。',
    message:
      'ページをリロードしても直らない場合は、しばらくお待ちいただくか、お問い合わせください。',
  });
}

//  イラストリストが更新された場合に通知を表示
export function UpdateIllustList() {
  notifications.show({
    id: 'updateIllustList',
    autoClose: true,
    radius: 'md',
    title: 'イラスト情報を更新しました',
    message: '前回アクセスしたときから、新しいイラストが追加されているかもしれません。',
  });
}

// イラストが取得できなかったときの通知を表示
export function FetchFailedIllust() {
  notifications.show({
    id: 'fetchFailedIllust',
    loading: true,
    autoClose: 6000,
    radius: 'md',
    title: 'イラスト情報が取得できませんでした。',
    message:
      'ページをリロードしても直らない場合は、しばらくお待ちいただくか、お問い合わせください。',
  });
}
