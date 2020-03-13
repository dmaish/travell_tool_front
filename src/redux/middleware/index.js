/* eslint-disable */
import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
  watchDeleteRequest
} from './requestsSaga';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync,
  watchAddRoleSaga,
  watchUpdateRoleSaga
} from './roleDataSaga';
import { watchFetchRoleUsers, watchDeleteUserRoleAsync } from './roleSaga';
import {
  watchCreateComment,
  watchEditComment,
  watchDeleteComment
} from './commentsSaga';
import { watchFetchApprovals, watchUpdateRequestStatus } from './approvalsSaga';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from './notificationsSaga';

import { watchUpdateUserProfileAsync } from './UserProfileSaga';

import {
  watchCreateAccommodationSagaAsync,
  watchFetchAccommodation,
  watchFetchTimelneData,
  watchEditAccommodation,
  watchDisableAccommodation,
  watchFetchDisabledAccommodation,
  watchRestoreDisabledAccommodation
} from './accommodationSaga';

import { watchFetchOccupations } from './occupationSaga';

import { watchFetchAvailableRooms } from './availableRoomsSaga';

import { watchUpdateRoomsAsync } from './roomUpdateSaga';

import {
  watchFetchTrips,
  watchUpdateTrip,
  watchUpdateTripRoom
} from './tripsSaga';
import {
  watchCreateChecklist,
  watchFetchAllChecklists,
  watchUpdateChecklist,
  watchDeleteChecklist,
  watchFetchDeletedChecklistItems,
  watchRestoreChecklist
} from './travelChecklistSaga';

import {
  watchFetchCalendarAnalytics,
  watchDownloadCalendarAnalytics
} from './travelCalendarSaga';

import { watchFetchCenters, watchUpdateUserCenterAsync } from './centersSaga';
import { watchFetchAnalytics, watchdownloadAnalytics } from './analyticsSaga';
import {
  watchFetchReadiness,
  watchExportReadiness
} from './travelReadinessSaga';

import { watchFetchDepartmentTrips } from './tripsAnalyticsSaga';

import {
  watchFetchDocuments,
  watchDeleteDocument,
  watchUpdateDocument,
  watchCreateDocument,
  watchDownloadDocuments
} from './DocumentSaga';
import {
  watchPostSubmission,
  watchFetchSubmission
} from './checklistSubmissionSaga';
import { watchFileUpload } from './fileUploadSaga';
import{
  watchAddMainteinanceAsync, watchUpdateMaintenance, watchDeleteMaintenance
} from './maintenanceSaga';
import {
  watchFetchAttachments,
  watchdownloadAttachments
} from './attachmentsSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchFetchApprovals(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
    watchDeleteComment(),
    watchUpdateRequestStatus(),
    watchEditComment(),
    watchFetchNotifications(),
    watchUpdateRoomsAsync(),
    watchUpdateUserProfileAsync(),
    watchEditRequest(),
    watchAddNotification(),
    watchFetchAccommodation(),
    watchEditAccommodation(),
    watchUpdateAllNotificationStatus(),
    watchCreateAccommodationSagaAsync(),
    watchFetchTimelneData(),
    markSingleNotificationAsReadSaga(),
    watchFetchTrips(),
    watchUpdateTrip(),
    watchFetchOccupations(),
    watchFetchAllChecklists(),
    watchUpdateChecklist(),
    watchCreateChecklist(),
    watchDeleteChecklist(),
    watchRestoreChecklist(),
    watchFetchCenters(),
    watchUpdateUserCenterAsync(),
    watchFetchDeletedChecklistItems(),
    watchFetchAvailableRooms(),
    watchUpdateTripRoom(),
    watchFetchAnalytics(),
    watchDeleteUserRoleAsync(),
    watchFetchDepartmentTrips(),
    watchFetchReadiness(),
    watchFetchCalendarAnalytics(),
    watchDownloadCalendarAnalytics(),
    watchdownloadAnalytics(),
    watchFetchDocuments(),
    watchDeleteDocument(),
    watchUpdateDocument(),
    watchCreateDocument(),
    watchExportReadiness(),
    watchPostSubmission(),
    watchFetchSubmission(),
    watchDownloadDocuments(),
    watchFileUpload(),
    watchAddMainteinanceAsync(),
    watchDownloadDocuments(),
    watchAddRoleSaga(),
    watchUpdateRoleSaga(),
    watchDeleteRequest(),
    watchFetchAttachments(),
    watchdownloadAttachments(),
    watchUpdateMaintenance(),
    watchDeleteMaintenance(),
    watchDisableAccommodation(),
    watchFetchDisabledAccommodation(),
    watchRestoreDisabledAccommodation()
  ]);
}

export default rootSaga;
