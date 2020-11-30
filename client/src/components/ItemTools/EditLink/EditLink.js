import React from 'react';
import { Link } from 'react-router-dom';

import edit from '../../../assets/icons/edit.png';

const EditLink = ({ url, itemType }) => (
  <Link to={url} className="item-tool">
    <img src={edit} alt="edit" />
    Edit {itemType}
  </Link>
);

export default EditLink;