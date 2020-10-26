import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyASRtFQqFRACoU-iRvyS-D-sOLSIo1oX-I',
  authDomain: 'hogwarts-itpazu-client.firebaseapp.com',
  databaseURL: 'https://hogwarts-itpazu-client.firebaseio.com',
  projectId: 'hogwarts-itpazu-client',
  storageBucket: 'hogwarts-itpazu-client.appspot.com',
  messagingSenderId: '647707317422',
  appId: '1:647707317422:web:5320201465786a1f40c93f',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp