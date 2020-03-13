
import moment from 'moment';
import generateDynamicDate from './generateDynamicDate';

const generateDynamicTime = (date) => {
  const createdAt = moment(date).format('MM/DD/YYYY @ h:mm a');
  return moment(createdAt).fromNow();
};

export default generateDynamicTime;
