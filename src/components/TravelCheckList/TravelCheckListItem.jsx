/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class TravelChecklistItem extends PureComponent {
  renderTravelChecklistItem = () => {
    const { checklistItem: { id, name, resources } } = this.props;
    return (
      <div className="travelCheckList--item">
        <span className="travelCheckList--item__name">{ name } </span>
        {
          resources.length > 0 && resources.map(resource => (
            <a
              key={id}
              href={resource.link}
              target="blank"
              className="travelCheckList--item__resource-link"
            >
              [{resource.label}]
            </a>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderTravelChecklistItem()}
      </Fragment>
    );
  }
}

TravelChecklistItem.propTypes = {
  checklistItem: PropTypes.object.isRequired
};

export default TravelChecklistItem;
