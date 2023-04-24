/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconsAdd from '@/components/Collection/IconsAdd';
import { getAllCollection } from '@/actions/collection';
import { askRefresh } from '@/actions/ui';
import DisplayRemainingTime from '@/components/Collection/RemainingTime';
// card component
import Card from '@/components/Card';
import Spinner from '@/components/Spinner';
import AddCard from '@/components/Collection/AddCard';

import SuccessNotifications from '@/components/SuccessNotifications';

function Collection() {
  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state.collection);
  const { refresh } = useSelector((state) => state.ui);
  const successText = useSelector((state) => state.success.successText);
  console.log(successText);
  const [loading, setLoading] = useState(true);
  const [addCard, setAddCard] = useState(false);

  useEffect(() => {
    dispatch(getAllCollection());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      dispatch(getAllCollection());
      setLoading(false);
      dispatch(askRefresh());
    }
  }, [refresh]);

  const addCardRequest = (confirm) => {
    setAddCard(confirm);
  };
  const resetAddCard = (reset) => {
    setAddCard(reset);
  };
  return (
    <div className="mx-auto bg-white p-8 rounded-md shadow-md">
      <IconsAdd addCardRequest={addCardRequest} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-3 m-6">
          {addCard && (
          <>
            <SuccessNotifications notification="Votre carte a bien été importé dans votre collection" />
            <AddCard resetAddCard={resetAddCard} />
          </>
          )}
          {collection.map((card) => (
            <div key={card.id} className="md:w-1/6">
              <Card {...card} delete>
                {!card.state && <DisplayRemainingTime expirationDate={card.expiration_date} cardId={card.id} />}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
