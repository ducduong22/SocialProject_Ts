export interface serverUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
}
export interface serverMessage {
  senderId: string;
  receiverId: string;
  content: string;
}
