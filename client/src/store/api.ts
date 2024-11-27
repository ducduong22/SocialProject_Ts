import axios from "axios";
import { Posts, Comment, postData } from "@/container/type";
// Import các mock data
import {
  mockPost,
  mockGroup,
  mock3DPrinting,
  mockArtificial,
  mockTechNews,
  mockProgramming,
  mockUser,
} from "./mocks";

// Định nghĩa API URL
const apiUrl = {
  getPosts: "https://66b0f7e16a693a95b53ad5a2.mockapi.io/Post",
  getComment: "https://66b0f7e16a693a95b53ad5a2.mockapi.io",
  getPostDetail: (id: number) =>
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  getGroup: "https://example.com/comments",
};

// Kiểu dữ liệu Post

// Lấy danh sách bài viết
export const getPost = async (): Promise<Posts[]> => {
  const posts = await axios.get(apiUrl.getPosts);
  return posts.data;
};

// Thêm bài viết mới
export const addPost = async (post: postData) => {
  const response = await axios.post(apiUrl.getPosts, post);
  return response.data;
};
// Xóa bài viết
export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${apiUrl.getPosts}/${id}`);
};

// Thêm bình luận
export const addComment = (
  newComment: Omit<Comment, "id">
): Promise<Comment> => {
  return axios.post(`${apiUrl.getComment}/comments`, newComment);
};

// Lấy danh sách bình luận
export const getComments = (): Promise<Comment[]> => {
  return axios.get(`${apiUrl.getComment}/comments`);
};

// Xóa bình luận
export const deleteComment = async (commentId: number): Promise<void> => {
  return axios.delete(`${apiUrl.getComment}/comments/${commentId}`);
};

// Lấy mock user ID
export const getUserId = async (): Promise<typeof mockUser> => {
  return mockUser;
};

// Lấy dữ liệu 3D Printing
export const getThreePrinting = async (): Promise<typeof mock3DPrinting> => {
  return mock3DPrinting;
};

// Lấy dữ liệu Artificial Intelligence
export const getArtificial = async (): Promise<typeof mockArtificial> => {
  return mockArtificial;
};

// Lấy dữ liệu Programming
export const getProgramming = async (): Promise<typeof mockProgramming> => {
  return mockProgramming;
};

// Lấy dữ liệu Tech News
export const getTechNews = async (): Promise<typeof mockTechNews> => {
  return mockTechNews;
};

// Lấy dữ liệu Group
export const getGroup = async (): Promise<typeof mockGroup> => {
  return mockGroup;
};

export default apiUrl;
