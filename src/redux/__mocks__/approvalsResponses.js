export const pastApprovalsResponse = { //eslint-disable-line
  'success': true,
  'message': 'Approvals retrieved successfully',
  'approvals': [
    {
      'id': 'xDh20cuGy',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Approved',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-15T11:11:52.181Z',
      'updatedAt': '2018-05-15T11:11:52.181Z'
    },
    {
      'id': 'xDh20mytx',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Rejected',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-14T11:11:52.181Z',
      'updatedAt': '2018-05-14T11:11:52.181Z'
    }
  ],
  'meta': {
    'count': {
      'open': 3,
      'past': 6
    },
    'pagination': {
      'pageCount': 1,
      'currentPage': 1,
      'dataCount': 6
    }
  }
};

export const openApprovalsResponse = {
  'success': true,
  'message': 'Approvals retrieved successfully',
  'approvals': [
    {
      'id': 'xDh20cuGz',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Open',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-16T11:11:52.181Z',
      'updatedAt': '2018-08-16T11:11:52.181Z'
    },
    {
      'id': 'xDh26btGz',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Open',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-16T11:11:52.181Z',
      'updatedAt': '2018-08-16T11:11:52.181Z'
    }
  ],
  'meta': {
    'count': {
      'open': 3,
      'past': 6
    },
    'pagination': {
      'pageCount': 1,
      'currentPage': 1,
      'dataCount': 3
    }
  }
};

export const allApprovalsResponse = {
  'success': true,
  'message': 'Approvals retrieved successfully',
  'approvals': [
    {
      'id': 'xDh20cuGz',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Open',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-16T11:11:52.181Z',
      'updatedAt': '2018-08-16T11:11:52.181Z'
    },
    {
      'id': 'xDh20cuGy',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Approved',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-15T11:11:52.181Z',
      'updatedAt': '2018-05-15T11:11:52.181Z'
    },
    {
      'id': 'xDh20mytx',
      'name': 'Amarachukwu Agbo',
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'manager': 'Samuel Kubai',
      'gender': 'Female',
      'department': 'TDD',
      'role': 'Software Developer',
      'status': 'Rejected',
      'userId': '-LHJmKrxA8SlPNQFOVVm',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-14T11:11:52.181Z',
      'updatedAt': '2018-05-14T11:11:52.181Z'
    }
  ],
  'meta': {
    'count': {
      'open': 3,
      'past': 6
    },
    'pagination': {
      'pageCount': 1,
      'currentPage': 1,
      'dataCount': 3
    }
  }
};

export const errorResponse = {
  'success': false,
  'errors': [
    {
      'location': 'query',
      'param': 'status',
      'value': 'opened',
      'msg': 'Status must be "open", "past", "approved" or "rejected"'
    }
  ]
};
