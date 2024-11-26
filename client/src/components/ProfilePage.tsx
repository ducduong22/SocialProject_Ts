import "../assets/preview/stylesheets/css/ProfilePage.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SendOutlined,
  CommentOutlined,
  ShareAltOutlined,
  UserOutlined,
  EllipsisOutlined,
  CloseOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { mockComments } from "../store/mocks";
import { setPosts } from "../store/post/postSlice";
import {
  format,
  formatDistanceToNow,
  parseISO,
  differenceInHours,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { RootState } from "@/store/configureStore";
import { updatePosts } from "../store/post/postSlice";
import axios from "axios";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();
  const [activePostId, setActivePostId] = useState<string | number | null>(
    null
  );
  const posts = useSelector((state: RootState) => state.post.posts);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeStatus, setLikeStatus] = useState(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.handlelike }), {})
  );

  const handleCommentClick = (postId: string | number) => {
    setActivePostId((prevPostId) => (prevPostId == postId ? null : postId));
  };

  const handleLikeClick = async (postId: number | string) => {
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

  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch]);

  const userPosts = posts.filter((post) => post.userId == String(user._id));
  console.log(userPosts);
  console.log("user nè ", user);
  console.log("post nè", posts);

  const renderDatePost = (datepost: string) => {
    const postDate = parseISO(datepost);
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

  return (
    <div className="profilepage bg-gray-800">
      <Header />
      <div className="main_profile ">
        <div className="Left mt-20">
          <div className="my_profile">
            <div className="Avatar ">
              <div className="backgroud rounded-top">
                <img
                  src={user.avatar}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Profile"
                />
              </div>
              <div className="backgroud-bottom"></div>
              <div className="card-body text-center">
                <h5 className="card-title text-white">{user.name}</h5>
              </div>
            </div>
            <hr />
            <hr />
            <div className=" mb-2  " style={{ width: "327px", height: "50px" }}>
              <h5 className="card-text p-1 text-white">Introduce </h5>
            </div>
            <hr />
            <div className=" " style={{ width: "327px", height: "50px" }}>
              <h5 className="card-text p-1 text-white">Images </h5>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row mb-3 mt-20">
          <div className="center rounded-3">
            <div className="my_post">
              <div className="post_top">
                <img src={user.avatar} />
                <input
                  type="text"
                  placeholder={`what are you thinking ${user.name}?`}
                ></input>
              </div>
              <hr />
              <hr />
            </div>
            {userPosts.map((post) => (
              <div key={post.id}>
                <div>
                  <div className="mb-3">
                    <div className="friends_post">
                      <div className="friend_post_top">
                        <div className="Img_and_name">
                          <img className="Img" src={post.avatar} />
                          <div className="friends_name text-white">
                            <p className="friends_name text-white">
                              {post.name}
                            </p>
                            <p className="time text-white">
                              {renderDatePost(post.datepost)}
                              <i className="fa-solid fa-user-group"></i>
                            </p>
                          </div>
                        </div>

                        <button className="menu bg-transparent ">
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
                            {likedPosts[post.id] ? post.likes + 1 : post.likes}{" "}
                            like
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
                          <i className="fa-solid fa-message text-white"></i>
                          <button
                            className="bg-transparent text-white"
                            onClick={() => handleCommentClick(post.id)}
                          >
                            Comments
                          </button>
                        </div>

                        <div className="like_icon">
                          <i className="fa-solid fa-share text-white"></i>
                          <p className="text-white">Share</p>
                        </div>
                      </div>
                      <hr />

                      {/*---------------------------------------------------------------------------*/}
                      {activePostId === post.id && (
                        <div className="comments-section">
                          {mockComments
                            .filter((comment) => comment.postId === post.id)
                            .map((comment) => (
                              <div className="row" key={comment.id}>
                                <div className="col-auto ms-3 mt-2">
                                  <img
                                    className="rounded-circle"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nLCu85ayoTKwYw6alnvrockq5QBT2ZWR2g&usqp=CAU"
                                    style={{ height: "38px", width: "43px" }}
                                  ></img>
                                </div>
                                <div className="col-10 mt-2 bg-secondary rounded-4">
                                  <div className="mb-1 text-capitalize fs-6 text-white ">
                                    {comment.name}
                                  </div>
                                  <div className="text-white ">
                                    {comment.body}
                                  </div>
                                </div>
                                <div className="d-flex flex-row mb-3 comment_reply ">
                                  <button className="bg-transparent p-2">
                                    <HeartFilled
                                      onClick={() =>
                                        handleLikeClick(comment.id)
                                      }
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

                        <div className="comment_search">
                          <input
                            className="placeholder"
                            type="text"
                            placeholder="Write a comment"
                          />
                          <SendOutlined className="mr-16 bg-transparent text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
