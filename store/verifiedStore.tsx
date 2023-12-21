import { createHash } from 'crypto';
import { create } from 'zustand';

// hostNameをハッシュ化した値
const verifiedHash = [
  '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763',
  '90204c9af65756457f2709654d6321900f67ac586a4f69eda5bae9fd3f2eab23',
];

// -------- ドメインで認証

type verifiedState = {
  isAuth: boolean;
};

export const useVerified = create<verifiedState>(() => ({
  isAuth: false,
}));

// -------- 要素を表示するドメインの認証

export const setVerified = () => {
  const domein = window.location.hostname;

  // ハッシュ化
  const encryptSha256 = (str: string) => {
    const hash = createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  };

  // ハッシュ化した値と一致するか
  verifiedHash.includes(encryptSha256(domein)) && useVerified.setState({ isAuth: true });
};
