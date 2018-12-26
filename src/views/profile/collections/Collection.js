import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ClassroomYear from 'components/objects/ClassroomYear';
import styles from './Collection.scss';

class Collection extends React.PureComponent {
  render() {
    const { classrooms, id, name, sequences, years } = this.props;
    const link = `/colecao/${id}`;
    const word1 = sequences === 1 ? 'sequência' : 'sequências';
    const word2 = classrooms === 1 ? 'turma' : 'turmas';

    const items = years.map((year, i) => {
      return <ClassroomYear key={i} color={year.color} year={year.year} />;
    });

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <NavLink to={link} className={styles.wrapper}>
          <div className={styles.info}>
            <h4>{name}</h4>
            <p>
              {sequences} {word1} &bull; {classrooms} {word2}
            </p>
          </div>
          <div className={styles.years}>{items}</div>
        </NavLink>
      </div>
    );
  }
}

Collection.defaultProps = {
  classrooms: 0,
  sequences: 0,
  years: [],
};

Collection.propTypes = {
  classrooms: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sequences: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
};

export default Collection;
