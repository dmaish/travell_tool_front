import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login';
import ConnectedDashboard from '../views/Dashboard';
import ConnectedRequests from '../views/Requests';
import ConnectedGuestHouseDetails from '../views/Accommodation/FullGuestHouseDetails';
import RequireAuth from '../hoc/authHoc';
import ConnectedApprovals from '../views/Approvals';
import ConnectedVerifications from '../views/Verifications';
import ConnectedRole from '../views/Role';
import ConnectedUserProfile from '../views/UserProfile';
import LayoutShell from '../hoc/Layout';
import ConnectedAccommodation from '../views/Accommodation';
import ConnectedCheckIn from '../views/CheckIn';
import ConnectedChecklist from '../views/Checklist';
import ConnectedRoleDetails from '../views/RoleDetails';
import ConnectedDocuments from '../views/Documents';
import NotFound from '../views/ErrorPages';
import {
  TRAVEL_ADMINISTRATOR,
  SUPER_ADMINISTRATOR,
  TRAVEL_TEAM_MEMBER,
  MANAGER
} from '../helper/roles';


const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={ConnectedLogin}
    />
    <Route
      path="/redirect/*"
      exact
      component={ConnectedLogin}
    />
    <Route>
      <LayoutShell>
        <Switch>
          <Route
            path="/dashboard"
            exact
            component={
              RequireAuth(
                ConnectedDashboard,
                TRAVEL_ADMINISTRATOR,
                SUPER_ADMINISTRATOR,
                TRAVEL_TEAM_MEMBER
              )
            }
          />
          <Route
            path="/requests/my-approvals"
            exact
            component={
              RequireAuth(
                ConnectedApprovals,
                SUPER_ADMINISTRATOR,MANAGER
              )
            }
          />
          <Route
            path="/requests/my-verifications"
            exact
            component={
              RequireAuth(
                ConnectedVerifications,
                SUPER_ADMINISTRATOR,
                TRAVEL_TEAM_MEMBER,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/requests/my-verifications/:requestId"
            exact
            component={
              RequireAuth(
                ConnectedVerifications,
                SUPER_ADMINISTRATOR,
                TRAVEL_TEAM_MEMBER,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/requests"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/settings/roles"
            exact
            component={
              RequireAuth(
                ConnectedRole,
                SUPER_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/requests/:requestId"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/settings/profile"
            exact
            component={RequireAuth(ConnectedUserProfile)}
          />
          <Route
            path="/requests/my-approvals/:requestId"
            exact
            component={RequireAuth(ConnectedApprovals)}
          />
          <Route
            path="/residence/manage"
            exact
            component={
              RequireAuth(
                ConnectedAccommodation,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/residence/manage/guest-houses/:guestHouseId"
            exact
            component={RequireAuth(ConnectedGuestHouseDetails)}
          />
          <Route
            path="/residence/checkin"
            exact
            component={RequireAuth(ConnectedCheckIn)}
          />
          <Route
            path="/checklists"
            exact
            component={
              RequireAuth(
                ConnectedChecklist,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/settings/roles/:roleId"
            exact
            component={
              RequireAuth(
                ConnectedRoleDetails,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/documents"
            exact
            component={RequireAuth(ConnectedDocuments)}
          />
          <Route component={NotFound} />
        </Switch>
      </LayoutShell>
    </Route>
  </Switch>
);

export default Routes;
