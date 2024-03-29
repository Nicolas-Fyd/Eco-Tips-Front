/* eslint-disable max-len */
// exemple to store
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '@/reducers';
// import middelwares
import authMiddleware from '@/middelware/authMiddleware';
import adminMiddleware from '@/middelware/adminMiddleware';
import collectionMiddelware from '@/middelware/collectionMiddelware';
import communityMiddelware from '@/middelware/communityMiddelware';
import achievementMiddelware from '@/middelware/achievementMiddelware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// combine middelwares
const enhancers = composeEnhancers(
  applyMiddleware(authMiddleware, adminMiddleware, collectionMiddelware, communityMiddelware, achievementMiddelware),
);

const store = createStore(reducer, enhancers);

export default store;
