import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function withWidth(Page) {
  class PageWithWidth extends Component {
    state = { windowWidth: 0 };

    onResized = () => {
      this.onResized1();
      this.timeout = setTimeout(this.onResized1, 15);
    };

    onResized1 = () => {
      const windowWidth =
        window.innerWidth > 0 ? window.innerWidth : window.screen.width;
      this.setState({ windowWidth });
    };

    componentDidMount() {
      window.addEventListener('resize', this.onResized);
      this.onResized();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResized);
      clearTimeout(this.timeout);
    }

    render() {
      return <Page {...this.props} windowWidth={this.state.windowWidth} />;
    }
  }

  PageWithWidth.defaultProps = {
    windowWidth: 0,
  };

  PageWithWidth.propTypes = {
    windowWidth: PropTypes.number.isRequired,
  };

  return PageWithWidth;
}
