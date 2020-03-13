import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_analyticsPagination.scss';

class AnalyticsPagination extends PureComponent{
  handleClick = (e) => {
    const { handlePagination } = this.props;
    const { target: { id, classList } } = e;
    if (!classList.contains('disabled')){
      handlePagination(id);
    }
  }
  renderPaginationBtn (direction) {
    const { pagination: {currentPage, pageCount, prevPage} } = this.props;
    const renderButton = (text, disabled) => (
      <button id={text} className={`pg--button ${disabled && 'disabled'}`} onClick={this.handleClick} type="button">{text}</button>
    );

    switch (direction) {
    case 'Previous':
      return renderButton(direction, prevPage === 0);
    case 'Next':
      return renderButton(direction, currentPage === pageCount);
    }
  }

  render () {
    const {pagination: {currentPage, pageCount}} = this.props;
    return(
      <div className="pg--container">
        {this.renderPaginationBtn('Previous')}
        <span className="pg--text">
          {`Showing page ${currentPage} of ${pageCount} ${pageCount > 1 ? 'pages' : 'page'}`}
        </span>
        {this.renderPaginationBtn('Next')}
      </div>
    );
  }
}

AnalyticsPagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired
};

export default AnalyticsPagination;
