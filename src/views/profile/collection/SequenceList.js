import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Sequence from './Sequence';
import styles from './SequenceList.scss';

class SequenceList extends Component {
  render() {
    const count = this.props.items.length;
    const word = count > 1 ? 'sequências' : 'sequência';
    const items = this.props.items.map((item, i) => {
      return (
        <Sequence
          key={i}
          name={item.name}
          component={item.component}
          componentColor={item.componentColor}
          isCompleted={item.isCompleted}
          image={item.image}
          slug={item.slug}
        />
      );
    });

    return (
      <section className={styles.wrapper}>
        <h3>
          {count} {word}
        </h3>
        <div className="container">
          <div className="row">
            {items}
          </div>
        </div>
        <NavLink className="btnFullWidth" to="/sequencias">
          Buscar mais sequências
        </NavLink>
      </section>
    );
  }
}

SequenceList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SequenceList;
