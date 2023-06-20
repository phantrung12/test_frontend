import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from '../utils/types/injector-typings';

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  return combineReducers({
    ...injectedReducers,
  });
}
