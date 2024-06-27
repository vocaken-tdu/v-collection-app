import { create } from 'zustand';

// -------- 初回アクセスかどうかを判定する

type isFirstAccessState = {
  isFirstAccess: boolean;
};

export const useIsFirstAccess = create<isFirstAccessState>(() => ({
  isFirstAccess: true,
}));

export const setIsFirstAccess = () => {
  // illustListStoreからイラストデータを取得
  useIsFirstAccess.setState({ isFirstAccess: false });
};
