import Link from 'next/link';
import { Divider, Text } from '@mantine/core';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Not found.</h2>
      <Text>アクセスしようとしたページは見つかりませんでした。</Text>
      <Divider my={48} />
      <Text>考えられる原因として……</Text>
      <ul>
        <li>ファイルが存在しないかも？</li>
        <li>URL アドレスが間違っているかも？</li>
        <li>意図せず、なにかしらの原因でアクセスができなくなっているかも？</li>
      </ul>
      <Link href="/">(ホームに戻る)</Link>
    </div>
  );
}
