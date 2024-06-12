// backend/notification.js

const express = require('express');
const axios = require('axios');

const serverKey = process.env.FIREBASE_SERVER_KEY; 

export const send_notification = async (req:any, res:any) => {
    console.log(req.body);
  const { title, message, imageUrl, link, type } = req.body;
  const fcmUrl = 'https://fcm.googleapis.com/fcm/send';

  const notificationPayload = {
    to: '/topics/all', // or specific device token
    notification: {
      title,
      body: message,
      image: imageUrl,
    },
    data: {
      link,
      type,
    },
  };

  try {
    const response = await axios.post(fcmUrl, notificationPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${serverKey}`,
      },
    });

    if (response.status === 200) {
      return res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to send notification' });
    }
  } catch (err) {
    console.error('Error sending notification via FCM:', err);
    return res.status(500).json({ success: false, message: 'Error while sending notification' });
  }
}

