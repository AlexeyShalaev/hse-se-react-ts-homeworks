export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ChatMessage {
  senderId: string;
  message: string;
}