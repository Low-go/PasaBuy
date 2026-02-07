export type Post = {
  id: number;
  post_type: 'seeker' | 'runner';
  title: string;
  description: string;
  tags: string[];
  location: string;
  created_at: string;
  creator: {
    name: string;
    avatar_url: string | null;
  };
};