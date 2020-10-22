
import { apply } from 'redux-saga/effects';
import { api } from '../../../REST';
import { expectSaga } from 'redux-saga-test-plan';
import { logout } from '../saga/workers';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';
import { postsActions } from '../../posts/actions';
import { usersActions } from '../../users/actions';

describe('logout saga', () => {
    test('should complete 204 status response', async () => {
        await expectSaga(logout)
            .put(uiActions.startFetching())
            .provide([[apply, apply(api, api.auth.logout), __.fetchResponseSuccess201]])
            .apply(localStorage, localStorage.removeItem, ['token'])
            .apply(localStorage, localStorage.removeItem, ['remember'])
            .put(profileActions.clearProfile())
            .put(postsActions.clearPosts())
            .put(usersActions.clearUsers())
            .put(uiActions.stopFetching())
            .run();
    });

    test('should fail with not 204 status', async () => {
        await expectSaga(logout)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.logout), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, ''))
            .run();
    });

});
