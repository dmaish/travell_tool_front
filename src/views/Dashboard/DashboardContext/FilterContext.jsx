import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { format } from 'date-fns';

export const { Consumer, Provider } = React.createContext();

export default class FilterContext extends Component {
  constructor(props) {
    super(props);
    const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const end = moment().endOf('isoWeek').format('YYYY-MM-DD');
    const [city] = localStorage.getItem('location').split(',');
    this.state = {
      range: {start, end},
      city
    };
  }

  handleFilter = filter => {
    this.setState({range: { ...filter }});
  }

  render() {
    const { children } = this.props;
    const context = {
      state: {...this.state},
      handleFilter: this.handleFilter
    };
    return (
      <Provider value={{ ...context }}>
        { children }
      </Provider>
    );
  }
}

FilterContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
