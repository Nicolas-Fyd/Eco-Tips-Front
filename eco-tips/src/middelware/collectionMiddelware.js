import axios from 'axios';
import { GET_ALL_COLLECTION, GET_ALL_TAGS, saveCollection, saveAllTags } from '@/actions/collection';

const collectionMiddelware = (store) => (next) => (action) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  switch (action.type) {
    case GET_ALL_COLLECTION:
      axios
        .get(`${apiUrl}/me/collection`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          store.dispatch(saveCollection(res.data));
        })
        .catch((err) => console.log(err))
        .finally();
      break;
    case GET_ALL_TAGS:
      axios
        .get(`${apiUrl}/tag`, {
          headers: { Authorization: `Bearer ${store.getState().user.token}` },
        })
        .then((res) => {
          console.log(res.data);
          store.dispatch(saveAllTags(res.data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally();
      break;
    default:
  }

  next(action);
};

export default collectionMiddelware;