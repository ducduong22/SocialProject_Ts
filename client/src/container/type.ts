import Comment from "../components/Comment";
export interface Register {
  email: string;
  password: string;
  name: string;
  userId: string;
}
//pick chọn các thuộc tính
export interface Login extends Pick<Register, "name" | "email" | "password"> {}
//Omit là bỏ cái huộc tính
export interface User extends Omit<Register, "password"> {
  _id: string;
  avatar?: string;
}

export interface UserId extends Omit<User, "email" | "password" | "_id"> {
  id: string;
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
  GroupId: number;
  id: number | number;
  name: string;
  avatar: string;
  coverimage: string;
  statusJoin: boolean;
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
