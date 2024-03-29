/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// react and redux hooks
import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
// Main components
import CardTitle from './CardTitle';
import CardTags from './CardTags';
import CardRating from './CardRating';
import CardDescription from './CardDescription';
import CardAuthor from './CardAuthor';
import CardImg from './CardImg';
import CheckIcon from './CheckIcon';
// Optionals components
import DeleteButton from './DeleteButton';
import CostCard from './CostCard';

function Card({ image,
  value,
  base64Image,
  title,
  tags,
  description,
  author,
  environmental_rating,
  economic_rating,
  state,
  displayValue,
  delete: isDeleteEnabled,
  id,
  children }) {
  // state to expanded value
  const [isExpanded, setIsExpanded] = useState(false);
  // state to showBackground
  const [showBackground, setShowBackground] = useState(false);
  // ref for handleOutsideClick while card expanded
  const cardRef = useRef();
  // handle style of card while state isExpanded
  const styleCardExpanded = isExpanded ? '' : 'overflow-y-auto h-96';
  const styleContainerExpanded = isExpanded && 'z-40 fixed top-1/2 left-1/2 animate-expand cursor-auto w-full md:1/2 lg:w-1/3';
  // style when card is validate (green border)
  const styleValidated = state && 'border-4 border-green-600';
  // handle click on card
  const handleClick = () => {
    setIsExpanded(true);
    setShowBackground(true);
  };
  const handleOutsideClick = (event) => {
    // Check if the clicked element is not a descendant of cardRef and isExpanded=true
    if (!cardRef.current.contains(event.target) && isExpanded) {
      setIsExpanded(false);
      setShowBackground(false);
    }
  };
  // listen click on window when isExpanded=true
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded]);
  return (
    <>
      {showBackground && (
        <button
          className="z-40 fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md"
          type="button"
          aria-label="Outside click handler"
          onClick={handleOutsideClick}
        />
      )}
      <div
        className={`${styleContainerExpanded}`}
        aria-label="Card container"
        id={`${id}`}
        ref={cardRef}
      >
        <div
          className={`bg-white relative rounded ${styleCardExpanded} shadow-lg hover:shadow-lg ${styleValidated}`}
        >
          <CardImg path={image} title={title} base64Image={base64Image} isExpanded={isExpanded}>
            <CardTitle title={title} isExpanded={isExpanded} />
          </CardImg>
          <div className="flex flex-col pt-2 space-between px-4">
            <CardTags tags={tags} isExpanded={isExpanded} />
            <CardRating environmental={environmental_rating} economic={economic_rating} />
            <CardDescription description={description} isExpanded={isExpanded} />
            <CardAuthor author={author} />
          </div>
          {isExpanded ? (
            <button
              type="button"
              onClick={() => { setIsExpanded(false); setShowBackground(false); }}
              className="absolute top-2 left-2 rounded shadow-lg p-1 bg-white button-active active:animate-buttonAnimation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
              </svg>

            </button>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="absolute top-2 left-2 rounded shadow-lg p-1 bg-white button-active active:animate-buttonAnimation"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </button>
          )}
          {state && <CheckIcon />}
          {isDeleteEnabled && <DeleteButton cardId={id} />}
          {displayValue && <CostCard cost={value} />}
        </div>
        {children}
      </div>
    </>
  );
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ),
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  environmental_rating: PropTypes.number.isRequired,
  economic_rating: PropTypes.number.isRequired,
  state: PropTypes.bool,
  children: PropTypes.node,
  delete: PropTypes.bool,
  displayValue: PropTypes.bool,
  base64Image: PropTypes.string,
  id: PropTypes.number,
  value: PropTypes.number,
};
Card.defaultProps = {
  value: 0,
  id: null,
  image: null,
  children: null,
  tags: null,
  state: false,
  delete: false,
  base64Image: null,
  displayValue: false,
};

export default Card;
