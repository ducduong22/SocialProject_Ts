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
  userId: string;
}

export interface UserId extends Omit<User, "email" | "password" | "_id"> {
  id: string;
  avatar?: string;
}

export interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    userId: string;
  };
  token: string;
}

export interface Posts {
  userId: number;
  id: string | number;
  name: string;
  datepost: string;
  avatar: string;
  img: string;
  body: string;
  likes: number;
  handlelike: boolean;
  comment: number;
  share: number;
  friendstatus: boolean;
}

export interface postData {
  userId: string;
  avatar: string;
  name: string;
  comment: number;
  share: number;
  likes: number;
  datepost: string;
}

// menu
export interface ArtificialData extends Omit<Posts, "friendstatus"> {
  category: string;
}
export interface ThreeDPrinting {
  id: number;
  name: string;
  title: string;
  userid: number;
  avatar: string;
  body: string;
  category: string;
  likes: string;
  handlelike: boolean;
  comment: string;
  share: string;
}
export interface Programming extends Omit<Posts, "friendstatus"> {
  category: string;
}
export interface TechNews extends Omit<Posts, "friendstatus"> {
  category: string;
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
  id: number;
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
export interface ChatBoxListProps {
  senderId: string;
  receiverId: string;
}
