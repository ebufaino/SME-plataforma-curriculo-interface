import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment/locale/pt-br';
import 'moment-timezone';
import Truncate from 'react-truncate';
import { NavLink } from 'react-router-dom';
import Avatar from 'components/objects/Avatar';
import iconClip from 'images/icons/clip.svg';
import styles from './Result.scss';

class Result extends Component {
  render() {
    const { data, slug } = this.props;
    
    const link = `/desafio/${slug}/resultado/${data.id}`;
    const icon = data.has_archive ? <img src={iconClip} alt="Anexos" className={styles.icon} /> : null;

    const friendlyDate = (
      <Moment
        fromNow={true}
        locale="pt-br"
        tz="America/Sao_Paulo"
      >
        {data.created_at}
      </Moment>
    );
    
    return (
      <NavLink to={link} className={styles.wrapper} aria-label={data.teacher.name}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <Avatar
              nickname={data.teacher.name}
              photo={data.teacher.avatar_attributes && data.teacher.avatar_attributes.default_url}
              size={50}
            />
          </div>
          <div>
            <div className={styles.name}>{data.teacher.name}</div>
            <div className={styles.date}>{data.class_name} &middot; {friendlyDate}</div>
          </div>
          {icon}
        </div>
        <p className={styles.text}>
          <Truncate lines={3}>{data.description}</Truncate>
        </p>
      </NavLink>
    );
  }
}

Result.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Result;
