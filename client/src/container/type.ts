import Comment from "../components/Comment";
export interface Register {
  email: string;
  password: string;
  name: string;
  userId: string;
}

export interface Login {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  userId: string | number;
  avatar?: string;
}

export interface ApiResponse {
  user: User;
  token: string;
}

export interface Posts {
  userId: string;
  id: string | number;
  name: string;
  datepost: string;
  avatar: string;
  img: string;
  body: string;
  likes: number;
  handlelike: false;
  comment: number;
  share: number;
  friendstatus: boolean;
}
export interface ToggleLike {
  postId: string;
  increment: boolean;
}

export interface Comment {
  postId: number | string;
  name: string;
  body: string;
  likes: number;
  comment: number;
  avatar: string;
  id: string | number;
}
export interface Group {
  slice(arg0: number, arg1: number): unknown;
  GroupId: number;
  id: number | number;
  name: string;
  avatar: string;
  coverimage: string;
  statusJoin: boolean;
}
export interface UserId {
  userId: number;
  avatar: string;
  id: number;
  name: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}
export interface UserState {
  user: User;
}
export interface UserIdState {
  userId: UserId;
}
export interface PostState {
  post: Posts;
}
export interface CommentState {
  comment: Comment;
}
export interface GroupState {
  group: Group;
}
export interface JoinState {
  [key: string]: boolean;
}
