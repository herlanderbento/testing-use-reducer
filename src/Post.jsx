import { useEffect, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "./postReducer";
import { ACTION_TYPES } from "./postActionTypes";

export function Post() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const { post, loading, error } = state;

  function handleFetch() {
    dispatch({ type: ACTION_TYPES.FETCH_START });

    fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      });
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <p>{loading && "Wait..."}</p>
      <ul>
        {post.map((data) => (
          <li>{data.title}</li>
        ))}
      </ul>
      {/* <p>{post?.title}</p> */}
      <span>{error && "Something went wrong!"}</span>
    </div>
  );
}
