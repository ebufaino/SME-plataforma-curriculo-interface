import React, { Component } from 'react';
import SchoolItem from './SchoolItem';
import SimpleHeader from 'components/SimpleHeader';
import styles from './Classrooms.scss';

class Classrooms extends Component {
  render() {
    const schools = [
      {
        name: 'EMEF João de Deus',
        classrooms: [
          {
            year: '2D',
            name: '2o ano D',
            level: 'EF',
            components: [
              {
                color: '#66ac70',
                name: 'Ciências Naturais',
              },
              {
                color: '#ff007d',
                name: 'Matemática',
              },
            ],
          },
          {
            year: '3A',
            name: '3o ano A',
            level: 'EJA',
            components: [
              {
                color: '#ff007d',
                name: 'Matemática',
              },
            ],
          },
        ],
      },
      {
        name: 'EMEF Maria da Silva',
        classrooms: [
          {
            year: '1A',
            name: '1o ano A',
            level: 'EF',
            components: [
              {
                color: '#66ac70',
                name: 'Ciências Naturais',
              },
              {
                color: '#ff7e2c',
                name: 'História',
              },
            ],
          },
          {
            year: '3A',
            name: '3o ano A',
            level: 'EJA',
            components: [
              {
                color: '#ff007d',
                name: 'Matemática',
              },
            ],
          },
        ],
      },
    ];

    const items = schools.map((school, i) => {
      return (
        <SchoolItem
          key={i}
          name={school.name}
          classrooms={school.classrooms}
        />
      );
    });

    return (
      <section className={styles.wrapper}>
        <SimpleHeader
          back={true}
          title="Minhas turmas"
        />
        <div className="container">
          {items}
        </div>
      </section>
    );
  }
}

Classrooms.propTypes = {
};

export default Classrooms;
