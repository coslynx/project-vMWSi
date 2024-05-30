import moment from 'moment';

const notificationSystem = {
  sendNotification: (message) => {
    // Logic to send notification to user
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Notification sent: ${message}`);
  },
};

export default notificationSystem;