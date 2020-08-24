'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.getCustomerStatus = exports.deleteProfileImage = exports.addProfileImage = exports.getUserInfoRefresh = exports.submitUserEditDetails = exports.unblockSystemUser = exports.solicitNewPassword = exports.changePassword = exports.checkTokenForPasswordReset = exports.allUsers = exports.deleteUser = exports.register = exports.refreshToken = exports.LogIn = void 0

var _axios = _interopRequireDefault(require('axios'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var baseURL = 'https://keepershomestaging-env.eba-b9pnmwmp.eu-central-1.elasticbeanstalk.com' // const baseURL = 'http://127.0.0.1:5000'

var LogIn = function LogIn (data) {
  return _axios['default'].post(''.concat(baseURL, '/login'), data, {
    withCredentials: true
  })
}

exports.LogIn = LogIn

var refreshToken = function refreshToken (userId) {
  var data = {
    _id: userId
  }
  var headers = {
    headers: {
      credentials: 'cross-site'
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/refresh_token'), data, headers)
}

exports.refreshToken = refreshToken

var register = function register (newUser, userCredentials) {
  var csrf = userCredentials.csrf
  var body = newUser
  body._id = userCredentials.userId
  var headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: csrf
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/add_user'), body, headers)
}

exports.register = register

var deleteUser = function deleteUser (userId, userCredentials) {
  var body = {
    user_id: userId,
    _id: userCredentials.userId
  }
  var data = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf
    },
    withCredentials: true,
    data: body
  }
  return _axios['default']['delete'](''.concat(baseURL, '/delete_user'), data)
}

exports.deleteUser = deleteUser

var allUsers = function allUsers (userCredentials) {
  var body = {
    _id: userCredentials.userId
  }
  var headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/all_users'), body, headers)
}

exports.allUsers = allUsers

var checkTokenForPasswordReset = function checkTokenForPasswordReset (userId, token) {
  var body = {
    _id: userId
  }
  var headers = {
    headers: {
      token: token
    }
  }
  return _axios['default'].post(''.concat(baseURL, '/check_token'), body, headers)
}

exports.checkTokenForPasswordReset = checkTokenForPasswordReset

var changePassword = function changePassword (data) {
  return _axios['default'].post(''.concat(baseURL, '/change_password'), data)
}

exports.changePassword = changePassword

var solicitNewPassword = function solicitNewPassword (data) {
  return _axios['default'].post(''.concat(baseURL, '/newpass_solicit'), data)
}

exports.solicitNewPassword = solicitNewPassword

var unblockSystemUser = function unblockSystemUser (email, userCredentials) {
  var data = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site'
    },
    withCredentials: true,
    data: {
      _id: userCredentials.userId,
      email: email
    }
  }
  return _axios['default']['delete'](''.concat(baseURL, '/unblock_user'), data)
}

exports.unblockSystemUser = unblockSystemUser

var submitUserEditDetails = function submitUserEditDetails (data, admin) {
  var headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: admin.csrf
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/edit_account_details'), data, headers)
}

exports.submitUserEditDetails = submitUserEditDetails

var getUserInfoRefresh = function getUserInfoRefresh (user) {
  var data = {
    _id: user.userId
  }
  var headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: user.csrf
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/get_user_info'), data, headers)
}

exports.getUserInfoRefresh = getUserInfoRefresh

var addProfileImage = function addProfileImage (data, userCredentials) {
  var headers = {
    headers: {
      credentials: 'cross-site',
      Authorization: userCredentials.csrf,
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  }
  return _axios['default'].post(''.concat(baseURL, '/upload_file'), data, headers)
}

exports.addProfileImage = addProfileImage

var deleteProfileImage = function deleteProfileImage (userCredentials) {
  var newData = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site'
    },
    withCredentials: true,
    data: {
      _id: userCredentials.userId
    }
  }
  return _axios['default']['delete'](''.concat(baseURL, '/delete_photo'), newData)
}

exports.deleteProfileImage = deleteProfileImage

var getCustomerStatus = function getCustomerStatus (email, userCredentials) {
  var url = ''.concat(baseURL, '/get_customer/').concat(email.email)
  var payload = {
    headers: {
      Authorization: userCredentials.csrf,
      credentials: 'cross-site'
    },
    withCredentials: true,
    body: {
      _id: userCredentials.userId
    }
  }
  return _axios['default'].get(url, payload)
}

exports.getCustomerStatus = getCustomerStatus
