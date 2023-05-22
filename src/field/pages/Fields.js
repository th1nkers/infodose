import React from 'react'

import FieldsList from '../components/FieldsList';

const Fields = () => {
  const FIELDS = [
    {
      id: 'f1',
      field_name: 'Most Published Books',
      field_image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      field_topics: 3
    }
  ];

  return <FieldsList items={FIELDS} />;
}

export default Fields
