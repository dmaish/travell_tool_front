/* eslint react/jsx-one-expression-per-line: 0 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TravelChecklistItem from './TravelCheckListItem';
import Preloader from '../Preloader/Preloader';
import countryUtils from '../../helper/countryUtils';
import './TravelCheckList.scss';


class TravelChecklist extends PureComponent {
  renderCheckList = (list, keyIndex) => {
    const countryFlagUrl = countryUtils.getCountryFlagUrl(list.destinationName);
    const { destinationName, checklist } = list;
    const location = localStorage.getItem('location');
    const newChecklist = destinationName.includes(location) ? checklist.filter(item => item.name === 'Travel Ticket Details') : checklist;
    return (
      <Fragment>
        {
          checklist.length > 0 && (
            <div key={keyIndex} className="travelCheckList__destination">
              <div className="travelCheckList__destination-name">
                <div
                  className="travelCheckList__destination-flag"
                  alt="country flag"
                  style={{ backgroundImage: `url(${countryFlagUrl})` }}
                />
                {destinationName}
              </div>
              {
                newChecklist.map((item) => (
                  <TravelChecklistItem key={`${item.id}`} checklistItem={item} />
                ))
              }
            </div>
          )
        }
      </Fragment>
    );
  }
  renderTravelCheckLists = () => {
    const { travelChecklists: { checklistItems } } = this.props;
    return (
      <div className="travelCheckList">
        {
          checklistItems.length
            ? checklistItems.map((list, i) => this.renderCheckList(list, i))
            : (
              <p className="travelCheckList__not-found">
                There are no checklist items for your selected destination(s). Please contact your Travel Department.
              </p>
            )
        }
      </div>
    );
  }

  render() {
    const { travelChecklists: { isLoading } } = this.props;

    return (
      <Fragment>
        {isLoading
          ? <Preloader spinnerClass="loader" />
          : this.renderTravelCheckLists()}
      </Fragment>
    );
  }
}

TravelChecklist.propTypes = {
  travelChecklists: PropTypes.object.isRequired
};

export default TravelChecklist;
