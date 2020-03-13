import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class CalendarAnalyticsAPI{
  static getCalendarAnalytics = (query)=>{
    const location = localStorage.getItem('location');
    const limit = 3;
    const {filter, page, type} = query;
    const responseType = (type === 'file') ? 'blob' : 'json';
    return axios.get(`${baseUrl}/analytics/calendar?type=${type}&location=${location}&${filter}&limit=${limit}&page=${page}`, {
      responseType
    });
  }
}

export default CalendarAnalyticsAPI;
