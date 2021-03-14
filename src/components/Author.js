import React from 'react';

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'Fraddy';
  }
  render() {
    this.name = 'Fraddy Oliveira';
    return <div>Name:{this.name}</div>;
  }
}

export default Author;
