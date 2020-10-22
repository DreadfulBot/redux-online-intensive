import { expectSaga } from 'redux-saga-test-plan';
import { apply } from 'redux-saga/effects';
import { authActions } from '../actions';
import { initialize } from '../saga/workers';

describe('initialize saga', () => {
    test('should authenticate async when a token and remember set in a store', async () => {
        await expectSaga(initialize)
            .provide([[
                apply(localStorage, localStorage.getItem, ['token']),
                __.token
            ], [
                apply(localStorage, localStorage.getItem, ['remember']),
                true
            ]])
            .put(authActions.authenticateAsync())
            .run();
    });

    test('should initialize if token or remember not set', async () => {
        await expectSaga(initialize)
            .provide([[
                apply(localStorage, localStorage.getItem, ['token']),
                __.token
            ]])
            .put(authActions.initialize())
            .run();
    });

});
