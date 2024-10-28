export type User = {
  id: string;
  nickname: string;
  email: string;
  role?: string;
  lead?: { id: string | number | null; nickname: string | null };
};
