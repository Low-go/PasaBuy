/**
 * Represents a user provided by the server
 */

export interface User{
    id: string;
    name: string;
    phone: string;
    avatar?: string;
    location?: string;
    // possibly add a light dark preference here later,
    // sabe what was the last one the users wanted   
}

export interface Post {
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