import React from 'react';
import { shallow } from 'enzyme';
import NotificationContainer from '../NotificationContainer';
import testImage from '../../../images/logo.svg';

describe('Notification Container Component', () => {
  const customProps = {
    title: 'Pending Approvals',
    pendingNotifications: [{
      isPending: true,
      general: false,
      name: 'Captain America',
      notificationType: 'pending',
      notificationStatus: 'unread',
      senderImage: testImage,
      id: 'id1'
    },
    {
      isPending: true,
      general: false,
      name: 'The Wasp',
      notificationStatus: 'unread',
      notificationType: 'pending',
      senderImage: testImage,
      id: 'id2'
    },
    {
      isPending: true,
      general: false,
      name: 'Thor Ragnarok',
      notificationStatus: 'unread',
      notificationType: 'pending',
      senderImage: testImage,
      id: 'id3'
    },
    ],
    generalNotifications: [{
      isPending: false,
      general: true,
      name: 'Ademola Ariya',
      message: 'posted a comment',
      notificationStatus: 'unread',
      notificationType: 'general',
      senderImage: testImage,
      id: 'id11'
    }],
    updateAllNotificationStatus: jest.fn(),
    markSingleNotificationAsRead: jest.fn(),
    link: '',
    timeStamp: '',
    id: 12
  };

  const setup = (props = customProps) => shallow( <NotificationContainer {...props} />);

  it('should render Pending Approvals successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  it('should render General Notifications successfully', () => {
    const newProps = { ...customProps,
      title: 'General Notifications'
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('NotificationItem').length).toBe(1);
  });

  it('should call `getUnreadNotifictionsCount` on component render',
    (done) => {
      const wrapper = setup();

      const getUnreadNotificationsCountSpy =
        jest.spyOn(wrapper.instance(), 'getUnreadNotificationsCount');
      wrapper.instance().getUnreadNotificationsCount();
      expect(getUnreadNotificationsCountSpy).toHaveBeenCalled();

      done();
    });

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
    const wrapper = setup();

    const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
    wrapper.instance().handleMarkAllAsRead();
    expect(handleMarkAllAsReadSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
    const wrapper =
        setup({ ...customProps, title: 'General Notifications' });

    const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
    wrapper.instance().handleMarkAllAsRead();
    expect(handleMarkAllAsReadSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'handleMarkSingleAsRead'
    if a notification is clicked`, (done) => {
    const wrapper =
        setup({ ...customProps, title: 'General Notifications' });

    const handleMarkSingleAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkSingleAsRead');
    wrapper.instance().handleMarkSingleAsRead();
    expect(handleMarkSingleAsReadSpy).toHaveBeenCalled();

    done();
  });
});
