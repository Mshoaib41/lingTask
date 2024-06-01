import {
  LOAD_USER_DATA,
  FIND_USER,
  REGISTER_ERROR,
  ORGANIZE_USER_DATA,
} from '../types/index';

export const mountUserData = () => ({
  type: LOAD_USER_DATA,
});

export const searchUser = (payload: SearchUserActionPayload) => ({
  type: FIND_USER,
  data: payload,
});

export const setError = (payload: SetErrorActionPayload) => ({
  type: REGISTER_ERROR,
  data: payload,
});

export const sortData = (payload: SortUserActionPayload) => ({
  type: ORGANIZE_USER_DATA,
  data: payload,
});
