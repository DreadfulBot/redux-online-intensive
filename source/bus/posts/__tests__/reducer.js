import { postsReducer } from "../reducer";
import { postsActions } from "../actions";
import { fromJS } from "immutable";

const initialState = fromJS([__.post]);
const initialStateWithLike = fromJS([{ ...__.post, likes: [__.userProfile]}]);

describe("posts reducer", () => {
    test("should return initial state by default", () => {
        expect(postsReducer(void 0, {})).toMatchSnapshot();
    });

    test("should handle fill posts", () => {
        expect(
            postsReducer(void 0, postsActions.fillPosts([__.post, __.post]))
        ).toMatchSnapshot();
    });

    test("should handle create post", () => {
        expect(
            postsReducer(void 0, postsActions.createPost(__.post))
        ).toMatchSnapshot();
    });

    test("should handle like post", () => {
        expect(
            postsReducer(
                initialState,
                postsActions.likePost({
                    postId: __.postId,
                    liker:  __.userProfile,
                })
            )
        ).toMatchSnapshot();
    });

    test("should handle unlike post", () => {
        expect(
            postsReducer(
                initialStateWithLike,
                postsActions.unlikePost({
                    postId: __.postId,
                    liker:  fromJS(__.userProfile),
                })
            )
        ).toMatchSnapshot();
    });

    test("should handle remove post", () => {
        expect(
            postsReducer(initialState, postsActions.removePost(__.post.id))
        ).toMatchSnapshot();
    });

    test("should handle clear posts", () => {
        expect(
            postsReducer(initialState, postsActions.clearPosts())
        ).toMatchSnapshot();
    });
});
