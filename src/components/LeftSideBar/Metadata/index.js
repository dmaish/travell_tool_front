import activeBookmarkIcon from '../../../images/icons/bookmark_active.svg';
import inactiveBookmarkIcon from '../../../images/icons/bookmark_inactive.svg';
import activeSettingsIcon from '../../../images/icons/settings_active.svg';
import inactiveSettingsIcon from '../../../images/icons/settings_inactive.svg';
import inactiveLogoutIcon from '../../../images/icons/logout_inactive.svg';
import activeAccommodationIcon from '../../../images/icons/accommodation-blue.svg';
import inactiveAccommodationIcon from '../../../images/icons/accomodation-grey.svg';
import activeChecklistIcon from '../../../images/icons/checklist-active.svg';
import inactiveChecklistIcon from '../../../images/icons/checklist-inactive.svg';
import activeDashboardIcon from '../../../images/icons/dashboard.svg';
import inactiveDashboardIcon  from '../../../images/icons/dashboard_inactive.svg';
import activeDocumentsIcon from '../../../images/icons/documents-blue.svg';
import inactiveDocumentsIcon from '../../../images/icons/documents-grey.svg';

const NavItemsMetadata = [
  // Dashboard`
  {
    text: 'Dashboard',
    link_to: '/dashboard',
    activateOnLogin: true,
    exact: true,
    onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
    icons: {
      active: activeDashboardIcon,
      inactive: inactiveDashboardIcon
    }
  },
  // Requests
  {
    text: 'Requests',
    link_to: '/requests',
    activateOnLogin: true,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/requests',
        text: 'My Requests',
        exact: true
      },
      {
        onlyVisibleTo: ['Super Administrator', 'Manager'],
        link_to: '/requests/my-approvals',
        text: 'My Approvals'
      },
      {
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        link_to: '/requests/my-verifications',
        text: 'My Verifications'
      }
    ],
    icons: {
      active: activeBookmarkIcon,
      inactive: inactiveBookmarkIcon
    }
  },
  // Accommodation
  {
    text: 'Residence',
    link_to: '/residence',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/residence/manage',
        text: 'Manage',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator'],
        exact: false
      },
      {
        link_to: '/residence/checkin',
        text: 'Check-in',
        exact: false
      }
    ],
    icons: {
      active: activeAccommodationIcon,
      inactive: inactiveAccommodationIcon
    }
  },
  // Documents
  {
    text: 'Documents',
    link_to: '/documents',
    activateOnLogin: true,
    isDropdown: false,
    icons: {
      active: activeDocumentsIcon,
      inactive: inactiveDocumentsIcon
    }
  },
  // Trip planner
  {
    text: 'Trip Planner',
    link_to: '/checklists',
    activateOnLogin: false,
    isDropdown: false,
    icons: {
      active: activeChecklistIcon,
      inactive: inactiveChecklistIcon
    },
    onlyVisibleTo: ['Super Administrator', 'Travel Administrator']
  },
  // Settings
  {
    text: 'Settings',
    link_to: '/settings',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/settings/roles',
        exact: true,
        text: 'User Roles',
        onlyVisibleTo: ['Super Administrator']
      },
      {
        link_to: '/settings/profile',
        text: 'User Profile',
      },
      {
        link_to: '/settings/roles/339458',
        exact: true,
        text: 'Travel team',
        onlyVisibleTo: ['Travel Administrator']
      }

    ],
    icons: {
      active: activeSettingsIcon,
      inactive: inactiveSettingsIcon
    }
  },
  // Logout
  {
    text: 'Logout',
    link_to: '/logout',
    activateOnLogin: false,
    isDropdown: false,
    onClick: 'signout', // define a handler with this name in 'LeftSideNavItems'
    variantClassName: 'logout-button', // variant styling class
    icons: {
      inactive: inactiveLogoutIcon
    }
  },
];

export default NavItemsMetadata;
