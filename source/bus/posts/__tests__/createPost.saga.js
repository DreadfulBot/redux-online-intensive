
import { apply } from 'redux-saga/effects';
import { api } from '../../../REST';

import { expectSaga } from 'redux-saga-test-plan';
import { createPost } from '../saga/workers';
import { uiActions } from '../../ui/actions';
import { postsActions } from '../actions';

describe('create post saga', () => {
    test('should complete with status 200', async () => {
        await expectSaga(createPost, { payload: __.comment })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.posts.create, [__.comment]), __.fetchCreatePostSuccess]])
            .put(postsActions.createPost(__.post))
            .run();
    });

    test('should fail with status 401', async () => {
        await expectSaga(createPost, { payload: __.comment })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.posts.create, [__.comment]), __.fetchResponseFail401]])
            .put(uiActions.emitError(__.error))
            .run();
    });

});
