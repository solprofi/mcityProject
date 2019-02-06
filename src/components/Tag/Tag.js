import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const template = <div
    style={{
      background: props.background,
      fontSize: props.fontSize,
      color: props.color,
      padding: '5px 10px',
      display: 'inline-block',
      fontFamily: 'Righteous',
      ...props.add,
    }}
  >{props.children}</div>;

  if (props.isLink) {
    return (
      <Link to={props.linkTo}>
        {template}
      </Link>
    )
  } else {
    return template;
  }
}


