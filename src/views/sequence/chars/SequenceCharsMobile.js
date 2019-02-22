import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileModal from 'components/layout/MobileModal';
import ModalPage from 'components/layout/ModalPage';
import SequenceChars from './SequenceChars';
import ModalHeader from 'components/header/ModalHeader';

class SequenceCharsMobile extends Component {
  render() {
    return (
      <MobileModal htmlId="sequenceChars" isExpanded={this.props.isExpanded}>
        <ModalPage id="sequenceChars">
          <ModalHeader title="Características" onBack={this.props.onBack} />
          <SequenceChars data={this.props.data} />
        </ModalPage>
      </MobileModal>
    );
  }
}

SequenceCharsMobile.propTypes = {
  data: PropTypes.object,
  isExpanded: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
};

export default SequenceCharsMobile;
