import React from 'react';
import { Link } from 'react-router-dom';

import Add from '../../assets/icons/add.png';

const AddLink = ({ url, itemType }) => (
  <Link to={url}>
    <img src={Add} alt="add" />
    add {itemType}
  </Link>
);

export default AddLink;