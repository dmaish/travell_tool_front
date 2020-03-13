
import moment from 'moment';

const generateDynamicDate = (requestData, date) => {
  return requestData && moment(date).format('DD MMM YYYY');
};

export default generateDynamicDate;
