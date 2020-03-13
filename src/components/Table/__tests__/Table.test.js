import React from 'react';
import { shallow } from 'enzyme';
import { Table } from '../index';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';

const props = {
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwo Agbo',
      tripType: 'multi',
      status: 'Open',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      trips: [
        {
          returnDate: '2018-10-21',
          departureDate: '2018-10-20',
          origin: 'Lagos',
          destination: 'Angola'
        },
        {
          returnDate: '2018-10-22',
          departureDate: '2018-10-21',
          origin: 'Angola',
          destination: 'Nairobi'
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    },
    {
      id: 'xDh20btGy',
      name: 'Amarachukwo Agbo',
      tripType: 'oneWay',
      status: 'Rejected',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      trips: [
        {
          departureDate: '2018-10-20',
          origin: 'Lagos',
          destination: 'Angola'
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    },
    {
      id: 'xDh20btGx',
      name: 'Amarachukwo Agbo',
      tripType: 'oneWay',
      status: 'Approved',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      trips: [
        {
          departureDate: '2018-10-20',
          origin: 'Lagos',
          destination: 'Angola'
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    }
  ],
  fetchRequestsError: null,
  message: 'Requests retrieved successfully',
  location: {
    pathname: ''
  },
  history: {
    push: jest.fn()
  },
  editRequest: jest.fn(),
  travelChecklists: [],
  showTravelChecklist: jest.fn(),
  fetchSubmission: jest.fn(),
  submissionInfo
};

const wrapper = shallow(<Table {...props} />);

describe('<Requests />', () => {
  it('should render the requests table when there are requests', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(3);
  });

  it('adds the appropriate class based on the status of the request', () => {
    expect(
      wrapper.find('#status-xDh20btGz').hasClass('request__status--open')
    ).toEqual(true);
    expect(
      wrapper.find('#status-xDh20btGy').hasClass('request__status--rejected')
    ).toEqual(true);
    expect(
      wrapper.find('#status-xDh20btGx').hasClass('request__status--approved')
    ).toEqual(true);
  });

  it('should render a div when there are no requests', () => {
    wrapper.setProps({
      requests: [],
      message: 'You have no requests at the moment'
    });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(1);
    expect(wrapper.find('div.table__requests--empty').text()).toEqual(
      'You have no requests at the moment'
    );
  });

  it('should render error when there is an error fetching requests', () => {
    wrapper.setProps({ fetchRequestsError: 'Server Error' });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--error').length).toBe(1);
    expect(wrapper.find('div.table__requests--error').text()).toEqual(
      'Server Error'
    );
  });

  it('should render Onclick request works as exepected', () => {
    const wrapper = mount(<Table {...props} />);
    let requestId = wrapper
      .find('tr.table__row')
      .at(0)
      .find('div')
      .at(0);
    requestId.simulate('click');
    expect(wrapper.find('Modal').length).toEqual(3);
  });
  it('should spy on toggleMenu method ', () => {
    const wrapper = mount(<Table {...props} />);
    wrapper.instance().toggleMenu('xDh20btGz');
    expect(wrapper.state().menuOpen.id).toBe('xDh20btGz');
  });

  it('should display Stage based on the request status', () => {
    const wrapper = mount(<Table {...props} />);
    expect(wrapper.instance().retrieveStatusTag({ status: 'Open',}, '')).toEqual('Manager Stage');
    expect(wrapper.instance().retrieveStatusTag({ status: 'Approved',}, '')).toEqual('Travel Stage');
  });
});
