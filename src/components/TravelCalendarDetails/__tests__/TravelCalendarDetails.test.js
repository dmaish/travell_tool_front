import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TravelCalendarDetails from '../index';

describe('Travel Calendar Details', () => {
  const calendar = {
    "name": "Harrison Maina",
    "department": "Apprenticeship Department",
    "role": "Product designer",
    "picture": "",
    "flight": {
      "arrival": {
        "destination": "Lagos",
        "airline": "Kenya Airways",
        "flightNo": "KQ5752",
        "arrivalTime": "24/10/2018 13:23:33",
        "departureTime": "24/10/2018 13:23:33"
      },
      "departure": {
        "destination": "Nairobi",
        "airline": "Kenya Airways",
        "flightNo": "KQ5752",
        "arrivalTime": "24/10/2018 13:23:33",
        "departureTime": "24/10/2018 13:23:33"
      }
    }
  };

  it('should render TravelCalendarDetails', ()=>{
    const wrapper = shallow(<TravelCalendarDetails calendar={calendar}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show/hide details when button is clicked', () => {
    const wrapper = shallow(<TravelCalendarDetails calendar={calendar}/>);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toEqual('Show Details');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toEqual('Hide Details');
  });
});
