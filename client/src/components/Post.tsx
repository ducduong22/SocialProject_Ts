import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  addPostRequest,
  deletePostRequest,
} from "../store/post/postSlice";
import {
  HeartFilled,
  SendOutlined,
  CommentOutlined,
  ShareAltOutlined,
  UserOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Avatar } from "antd";
import "../assets/preview/stylesheets/css/Comment.css";
import "../assets/preview/stylesheets/css/Modal.css";
import "../assets/preview/stylesheets/css/Homepage.css";
import { RootState } from "@/store/configureStore";
import {
  format,
  formatDistanceToNow,
  parseISO,
  differenceInHours,
  isValid,
} from "date-fns";

import { enUS } from "date-fns/locale";
import {
  addCommentRequest,
  deleteCommentRequest,
  setComments,
} from "../store/comment/commentSlice";
import axios from "axios";
import { Posts } from "../container/type";
import { updatePosts } from "../store/post/postSlice";

const Post = () => {
  const [newPost, setNewPost] = useState<{
    body: string;
    img?: File | null;
  }>({ body: "", img: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [activePostId, setActivePostId] = useState<string | number | null>(
    null
  );
  const posts = useSelector((state: RootState) => state.post.posts);
  const search = useSelector((state: RootState) => state.search.search);
  const comments = useSelector((state: RootState) => state.comment.comments);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const deleteModalRef = useRef<HTMLDivElement | null>(null);
  const [newComment, setNewComment] = useState({
    body: "",
    postId: null,
  });
  // console.log(activePostId);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const addPost = () => {
    if (newPost.body.trim()) {
      const postData = {
        ...newPost,
        userId: user._id,
        avatar: user.avatar,
        name: user.name,
        comment: 0,
        share: 0,
        likes: 0,
        datepost: new Date().toISOString(),
      };

      dispatch(addPostRequest(postData));
      setNewPost({ body: "", img: null });
      setIsModalOpen(false);
    }
  };

  const deletePost = (id: string | number) => {
    dispatch(deletePostRequest(id));
  };
  const renderDatePost = (datepost: string | undefined): string => {
    if (!datepost) {
      return "";
    }
    const postDate = parseISO(datepost);
    if (!isValid(postDate)) {
      return "";
    }
    const currentTime = new Date();
    if (differenceInHours(currentTime, postDate) < 24) {
      const distanceString = formatDistanceToNow(postDate, {
        addSuffix: true,
        locale: enUS,
      });

      return distanceString.replace(/^about\s/, "");
    } else {
      return format(postDate, "dd/MM/yyyy", { locale: enUS });
    }
  };
  const handleCommentSubmit = () => {
    if (newComment.body.trim() && newComment.postId !== null) {
      const commentToSubmit = {
        ...newComment,
        avatar: user.avatar,
        name: user.name,
        body: newComment.body,
        like: 0,
        id: Math.floor(Math.random() * 10),
      };
      dispatch(addCommentRequest(commentToSubmit));
      setNewComment({ ...newComment, body: "", postId: null });
    }
  };
  const openDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setDeleteModalVisible(true);
  };

  const handleRemoveComment = () => {
    dispatch(deleteCommentRequest(selectedCommentId));
    setDeleteModalVisible(false);
    setSelectedCommentId(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        deleteModalRef.current &&
        !deleteModalRef.current.contains(event.target as Node)
      ) {
        setDeleteModalVisible(false);
        setSelectedCommentId(null);
      }
    };

    const handleScroll = () => {
      setDeleteModalVisible(false);
      setSelectedCommentId(null);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCommentClick = (postId: number | string) => {
    setActivePostId((prevPostId) => (prevPostId === postId ? null : postId));
  };

  const [likeStatus, setLikeStatus] = useState(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.handlelike }), {})
  );

  const handleLikeClick = async (postId: number | string) => {
    setLikeStatus((Status) => {
      const newLikeStatus = {
        ...Status,
        [postId]: !Status[postId],
      };
      console.log(
        `Like status for post with id ${postId}:`,
        newLikeStatus[postId]
      );
      return newLikeStatus;
    });
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedLikes = post.likes + (post.likes % 2 === 0 ? 1 : -1);
        return {
          ...post,
          likes: updatedLikes,
        };
      }
      return post;
    });
    dispatch(updatePosts(updatedPosts));
    const updatedPost = updatedPosts.find((post) => post.id === postId);
    const newLikes = updatedPost?.likes;
    try {
      await axios.put(
        `https://66b0f7e16a693a95b53ad5a2.mockapi.io/Post/${postId}`,
        {
          likes: newLikes,
        }
      );
    } catch (error) {
      console.error("Error updating data on the server", error);
    }
  };

  const searchs = (posts: Posts[]) => {
    return posts.filter(
      (post: Posts) =>
        post.name.toLowerCase().includes(search?.toLowerCase()) ||
        post.body.toLowerCase().includes(search?.toLowerCase())
    );
  };

  const filteredPosts = searchs(posts);

  useEffect(() => {
    dispatch(setPosts());
    dispatch(setComments());
  }, [dispatch]);

  return (
    <div>
      <div className="post_top bg-gray-800">
        <img src={user.avatar} />
        <input
          className="placeholder"
          type="text"
          placeholder="What's on you mind ?"
          onClick={() => setIsModalOpen(true)}
        ></input>
      </div>
      <hr />
      <hr />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post: Posts) => {
          return (
            <div key={post.id}>
              <div>
                <div className="friends_post bg-gray-800">
                  <div className="friend_post_top bg-gray-800">
                    <div className="Img_and_name">
                      <Avatar
                        className="mr-2"
                        size="large"
                        src={post.avatar}
                      ></Avatar>
                      <div className="friends_name text-white">
                        <span className="friends_user_name ">{post.name}</span>
                        <p className="time text-white">
                          {renderDatePost(post.datepost)}
                          <i className="fa-solid fa-user-group"></i>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="menu bg-transparent "
                    >
                      <CloseOutlined className="text-white" />
                    </button>
                  </div>
                  <div>
                    <div className="text-capitalize text-white mt-3 mb-2">
                      {post.body}
                    </div>
                  </div>
                  {post.img && <img src={post.img} />}

                  <div className="info">
                    <div className="emoji_img">
                      <p className="text-white ">
                        {likedPosts[post.id] ? post.likes + 1 : post.likes} like
                      </p>
                    </div>

                    <div className="comment">
                      <p className="text-white">{post.comment}</p>
                      <div className="mb-5 text-white">
                        <CommentOutlined />
                      </div>
                      <p className="text-white">{post.share}</p>
                      <div className="mb-5 text-white">
                        <ShareAltOutlined />
                      </div>
                    </div>
                  </div>

                  <hr />
                  {/*---------------------------------------------------------------------------*/}

                  <div className="like">
                    <div className="like_icon">
                      <button className="bg-transparent">
                        <HeartFilled
                          onClick={() => handleLikeClick(post.id)}
                          style={{
                            color: likeStatus[post.id] ? "red" : "white",
                            fontSize: "24px",
                          }}
                        />
                      </button>
                    </div>

                    <div className="like_icon">
                      <button
                        className="bg-transparent text-white"
                        onClick={() => handleCommentClick(post.id)}
                      >
                        Comments
                      </button>
                    </div>

                    <div className="like_icon">
                      <p className="text-white">Share</p>
                    </div>
                  </div>
                  <hr />

                  {/*---------------------------------------------------------------------------*/}
                  {activePostId === post.id && (
                    <div className="comments-section">
                      {comments
                        .filter((comment) => comment.postId == post.id)
                        .map((comment) => (
                          <div>
                            <div className="flex flex-row" key={comment.id}>
                              <Avatar
                                className="mt-3"
                                size="large"
                                src={comment.avatar}
                              ></Avatar>
                              <div className="flex-auto ml-3 mt-2 mr-8  rounded-lg flex  position-relative bg-slate-400">
                                <div className="w-5/6  flex-none body_comment ">
                                  <div className="mb-1 text-capitalize fs-6 text-white font-bold ml-2">
                                    {comment.name}
                                  </div>
                                  <div className="text-white  ml-2">
                                    {comment.body}
                                  </div>
                                </div>
                                {deleteModalVisible &&
                                  selectedCommentId === comment.id && (
                                    <div className="modal-comment position-absolute">
                                      <div
                                        className="modal-content-comment"
                                        ref={deleteModalRef}
                                      >
                                        <div className="modal-button-comment  ">
                                          <button
                                            className="modal-button-comment-detele bg-transparent text-white d-flex flex-row mb-3"
                                            onClick={handleRemoveComment}
                                          >
                                            <div className="fa-solid fa-trash-can mt-3"></div>
                                            <div className="modal-button-detele">
                                              Detele
                                            </div>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                <button
                                  className="ml-16 flex-initial
                          bg-transparent  bg-slate-400 text-white"
                                  onClick={() => openDeleteModal(comment.id)}
                                >
                                  <EllipsisOutlined />
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-row mb-3 comment_reply ml-10">
                              <button className="bg-transparent p-2">
                                <HeartFilled
                                  onClick={() => handleLikeClick(comment.id)}
                                  style={{
                                    color: likeStatus[comment.id]
                                      ? "red"
                                      : "white",
                                    fontSize: "24px",
                                  }}
                                />
                              </button>

                              <button className="bg-transparent mt-1 text-dark mb-2 text-white p-2 ml-0">
                                Reply to
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  <hr />
                  {/*---------------------------------------------------------------------------*/}
                  <div className="comment_warpper">
                    <img src={user.avatar} />
                    <div className="circle"></div>

                    <div className="comment_search">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={
                          newComment.postId === post.id ? newComment.body : ""
                        }
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            body: e.target.value,
                            postId: post.id,
                          })
                        }
                      />

                      <SendOutlined
                        className="fa-solid fa-paper-plane bg-transparent text-white"
                        onClick={handleCommentSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white error_post">Did not find the post</p>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <input
              type="file"
              placeholder="Image URL (optional)"
              onChange={(e) =>
                setNewPost({ ...newPost, img: e.target.files[0] })
              }
            />
            <div className="modal-buttons">
              <button onClick={addPost}>Add Post</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
