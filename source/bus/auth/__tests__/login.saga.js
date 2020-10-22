
import { apply } from 'redux-saga/effects';
import { api } from '../../../REST';
import { expectSaga } from 'redux-saga-test-plan';
import { login } from '../saga/workers';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';
import { actions } from 'react-redux-form';
import { authActions } from '../actions';

describe('login saga', () => {
    test('should complete with 200 status and set a remember flag in store', async () => {
        await expectSaga(login, { payload: __.credentials })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.login, [__.credentials]), __.fetchResponseSuccess]])
            .apply(localStorage, localStorage.setItem, ['remember', true])
            .apply(localStorage, localStorage.setItem, ['token', __.token])
            .put(profileActions.fillProfile(__.userProfile))
            .put(actions.change('forms.user.profile.firstName', __.userProfile.firstName))
            .put(actions.change('forms.user.profile.lastName', __.userProfile.lastName))
            .put(authActions.authenticate())
            .put(uiActions.stopFetching())
            .run();
    });

    test('should fail with 400 status', async () => {
        await expectSaga(login, { payload: __.credentials })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.auth.login, [__.credentials]), __.fetchResponseFail401]])
            .put(uiActions.emitError(__.error))
            .put(uiActions.stopFetching())
            .run();
    });

});
