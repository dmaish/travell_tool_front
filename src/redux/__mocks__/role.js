const roles = {
  role: [
    {
      id: '1',
      roleName: 'Super Administrator',
      Description: 'Can perform all task on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '2',
      roleName: 'Travel Administrator',
      Description: 'Can view and approve all request on travela',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '3',
      roleName: 'Travel Team Member',
      Description: 'Can view all request made on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '4',
      roleName: 'Requester',
      Description: 'Can make travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '5',
      roleName: 'Manager',
      Description: 'Can request and approve travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    }
  ]
};

export const travelTeamMembersMockData = [
  {
    email: 'batman.robin@andela.com',
    fullName: 'Batman Robin',
    userId: '-LetUsWait',
    id: 1,
    centers: [
      {
        id: '12345',
        location: 'Travel Team Member'
      }
    ]
  },
  {
    email: 'spider.man@andela.com',
    fullName: 'Spider Man',
    userId: '-LetUsGo',
    id: 2,
    centers: [
      {
        id: '12345',
        location: 'Travel Team Member'
      }
    ]
  }
];

export default roles;
