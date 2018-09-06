import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import register from './register';
import counter from './counter';
import page from './page';
import category from './category';
import userInfo from './userInfo';
import excellentcourse from './excellentcourse';
import excellentpackage from './excellentpackage';
import openclass from './openclass';
import ihma from './ihma';
import thinktank from './thinktank';
import apply from './apply';
import password from './password';
import follow from './follow';
import message from './message';
import sysmessage from './sysmessage';
import wallet from './wallet';
import walletdetail from './walletdetail';
import feedback from './feedback';
import comment from './comment';
import activity from './activity';
import home from './home';
import pay from './pay';
import course from './course';
import train from './train';
import tutor from './tutor';
import lms from './lms';
import teacher_trainlist from './teacher_trainlist';
import freepromotion from './freepromotion';
import live from './live';
import live_follow from './live_follow';
import liveclass from './liveclass';
import withdrawals from './withdrawals';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  page,
  register,
  form,
  category,
  userInfo,
  excellentcourse,
  excellentpackage,
  openclass,
  ihma,
  thinktank,
  apply,
  password,
  follow,
  message,
  sysmessage,
  wallet,
  walletdetail,
  feedback,
  comment,
  activity,
  home,
  pay,
  course,
  train,
  tutor,
  lms,
  teacher_trainlist,
  freepromotion,
  live,
  live_follow,
  liveclass,
  withdrawals,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  })
});
