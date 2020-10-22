// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);

const userProfile = {
    id:        'TEST_ID',
    avatar:    'TEST_AVATAR',
    firstName: 'Walter',
    lastName:  'White',
    token,
};

const userProfileSet = [userProfile, { ...userProfile, id: 'TEST_ID_2' }, { ...userProfile, id: 'TEST_ID_3' }];

const newName = {
    firstName: 'Walter',
    lastName:  "White",
};

const newAvatar = ['avatar'];

const newPassword = {
    oldPassword: 12345,
    newPassword: 123456,
};

const credentials = {
    email:    'test@email.com',
    password: '1111',
    remember: true,
};

const comment = "test post";

const post = {
    id:      "59edd93052db76aefs2b36ee",
    comment,
    created: 1508760000,
    likes:   [],
    author:  userProfile,
};

const postResponseSuccess = {
    data:    post,
    message: successMessage,
};

const fetchCreatePostSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(postResponseSuccess)),
};

const responseDataSuccess = {
    data:    userProfile,
    message: successMessage,
};

const responseDataSuccessProfiles = {
    data:    userProfileSet,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccess204 = {
    status: 204,
};

const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const url = 'https://www.url.com';

global.__ = {
    userProfile,
    userProfileSet,
    errorMessage,
    token,
    error,
    post,
    comment,
    responseDataSuccess,
    responseDataSuccessProfiles,
    responseDataFail,
    fetchResponseSuccess,
    fetchResponseSuccess204,
    fetchResponseFail401,
    fetchResponseFail400,
    fetchCreatePostSuccess,
    credentials,
    url,
    newName,
    newAvatar,
    newPassword,
};
global.fetch = fetch;
global.localStorage = new LocalStorage();
