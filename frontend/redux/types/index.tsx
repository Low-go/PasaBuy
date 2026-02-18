/**
 * Composition of types and expected types based off our schema
 */

export interface User{
    id: number;
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

export interface Proposals {
    id: number,
    message: string,
    offered_price?: number,
    status:  'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN',
    created_at: string
    // not sure if i make updated at?

    // This is its foreign connection
    post: {
        title: string,
    }
    proposer:{
        name: string,
        avatar_url: string | null
    }
}

export interface Chat {
    id: number,
    status: 'ACTIVE' | 'CANCELED' | 'COMPLETED'
    post: {
        id: number,
        title: string
    }
    proposal: {
        id: number,
        offered_price?: number
    }
    participant_one: {
        id: number,
        name: string,
        avatar_url: string | null
    }
    participant_two: {
        id: number,
        name: string,
        avatar_url: string | null
    }
}

export interface Message{
    id: number,
    content: string,
    is_read: boolean,
    chat: {
        id: number
    }
    sender: {
        id: number
    }
}