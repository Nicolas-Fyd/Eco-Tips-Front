import PropTypes from 'prop-types';
import { useState } from 'react';

function ProposalDescription({ description, onChangeDescription }) {
  const handleChange = (event) => {
    onChangeDescription(event.target.value);
  };
  return (
    <div className="p-2 border border-opacity-50 border-gray-400 rounded w-full flex flex-col">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description :</label>
      <textarea
        id="description"
        name="description"
        maxLength="350"
        placeholder="Partagez en quelques phrases votre expérience avec cet éco-geste ! Quels défis avez-vous rencontrés ? Qu'avez-vous appris ? Encouragez les autres à adopter cette pratique en partageant votre histoire ! (max. 350 caractères)"
        className="block p-2.5 w-full flex-grow text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
        value={description}
        onChange={handleChange}
      />
    </div>
  );
}

ProposalDescription.propTypes = {
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
};

export default ProposalDescription;
