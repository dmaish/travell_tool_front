import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedRoleDetails, { RoleDetails } from '../index';


let wrapper;
const props = {
  roleUsers: [
    {
      fullName: 'A user',
      centers: [
        {
          id: 12345,
          location: 'Lagos, Nigeria'
        }
      ]
    }
  ],
  closeModal: jest.fn(),
  fetchRoleUsers: sinon.spy(),
  updateUserCenter: jest.fn(),
  getRoleData: jest.fn(),
  isLoading: false,
  getCurrentUserRole: ['Travel Administrator', 'Requester'],
  history: {
    push: jest.fn(),
  },
  isLoaded: true,
  openModal: jest.fn(),
  shouldOpen: false,
  modalType: 'new model',
  match: {
    params: {
      roleId: 335498
    }
  },
  roleName: 'Travel team member',
  fetchCenters: sinon.spy(),
  centers: [{}],
  putRoleData: sinon.spy(),
  deleteModalRoleId: 1,
  deleteModalState: 'invisible',
  hideDeleteRoleModal: jest.fn(),
  showDeleteRoleModal: jest.fn(),
  deleteUserRole: jest.fn()
};


const initialState = {
  modal: {
    shouldOpen: false,
    modalType: null
  }
};


const user = {
  id: 1,
  role: ['Travel team member'],
  center: 'lagos'
};

const mockStore = configureStore();
const store = mockStore(initialState);


describe('<ROleDetails />', () => {
  beforeEach(() => {
    wrapper = shallow(<RoleDetails {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the fetchRoleUser prop method on
    componentDidMount`, () => {
    expect(props.fetchRoleUsers.called).toEqual(true);
    expect(props.fetchRoleUsers.calledWith(335498)).toEqual(true);
  });

  it(`calls renders the RoleDetails Table with
    the correct number of users`, () => {
    const roleDetailsTable = wrapper
      .find('WithLoading')
      .dive()
      .find('RoleDetailsTable')
      .dive();
    expect(roleDetailsTable.find('.table__rows').length).toEqual(1);
  });


  it('should call handleEditCenter  ', () => {
    const newProps = { ...props, deleteModalState: 'visible' };
    const shallowWrapper = shallow(<RoleDetails {...newProps} />);
    shallowWrapper.setState({
      headTitle: 'Change Center',
      userDetail: user ,
    });
    sinon.spy(shallowWrapper.instance(), 'handleEditCenter');
    shallowWrapper.instance().handleEditCenter(user);
    expect(shallowWrapper.instance().handleEditCenter.calledOnce).toEqual(true);
  });

  it('should call `handleAddUser`', (done) => {
    const newProps = { ...props, deleteModalState: 'visible' };
    wrapper = shallow(<RoleDetails {...newProps} />);

    const handleAddUserSpy = jest
      .spyOn(wrapper.instance(), 'handleAddUser');
    wrapper.instance().handleAddUser();
    expect(handleAddUserSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleDeleteUserRole`', (done) => {
    const handleDeleteUserRoleSpy = jest
      .spyOn(wrapper.instance(), 'handleDeleteUserRole');
    wrapper.instance().handleDeleteUserRole(1);
    expect(handleDeleteUserRoleSpy).toHaveBeenCalled();
    expect(props.deleteUserRole).toHaveBeenCalledTimes(1);

    done();
  });

  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedRoleDetails {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.setState({
      headTitle: 'Change Center',
      userDetail: user,
    });
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
