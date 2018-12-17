import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ClassroomYear from 'components/objects/ClassroomYear';
import styles from './CollectionItem.scss';

class CollectionItem extends React.PureComponent {
  render() {
    const { classrooms, id, sequences, title, years } = this.props;
    const link = `/colecao/${id}`;
    const word1 = sequences === 1 ? 'sequência' : 'sequências';
    const word2 = classrooms === 1 ? 'turma' : 'turmas';

    const items = years.map((year, i) => {
      return <ClassroomYear key={i} color={year.color} year={year.year} />;
    });

    return (
      <NavLink to={link} className={styles.wrapper}>
        <div className={styles.info}>
          <h4>{title}</h4>
          <p>
            {sequences} {word1} &bull; {classrooms} {word2}
          </p>
        </div>
        <div className={styles.years}>{items}</div>
      </NavLink>
    );
  }
}

CollectionItem.propTypes = {
  classrooms: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  sequences: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired,
};

export default CollectionItem;
