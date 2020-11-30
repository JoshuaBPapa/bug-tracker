import React from 'react';
import { Link } from 'react-router-dom';

import Add from '../../../assets/icons/add.png';

const AddLink = ({ url, itemType }) => (
  <Link to={url} className="item-tool">
    <img src={Add} alt="add" />
    Add {itemType}
  </Link>
);

export default AddLink;