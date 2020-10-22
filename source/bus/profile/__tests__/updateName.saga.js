import { expectSaga } from 'redux-saga-test-plan';
import { apply } from 'redux-saga-test-plan/matchers';
import { uiActions } from '../../ui/actions';
import { updateName } from '../saga/workers';
import { api } from '../../../REST';
import { profileActions } from '../actions';

describe('update name saga', () => {
    test('should complete with code 200', async () => {
        await expectSaga(updateName, { payload: __.newName })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.profile.updateProfile, [__.newName]), __.fetchResponseSuccess]])
            .put(profileActions.fillProfile(__.userProfile))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should fail with code 401', async () => {
        await expectSaga(updateName, { payload: __.newName })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.profile.updateProfile, [__.newName]), __.fetchResponseFail401]])
            .put(uiActions.emitError(__.error, ''))
            .put(uiActions.stopFetching())
            .run();
    });
});
