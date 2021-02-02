import config from 'config'

export const Login = (username, password) => ({
  endpoint: '/api/account/login',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],

    username,
    password,
  },
})

export const AttemptRegister = (username, email) => ({
  endpoint: '/api/account/attemptregister',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],
    username,
    email,
  },
})

export const Register = (username, password, password_confirm, email, over18, veriCode) => ({
  endpoint: '/api/account/register',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],

    username,
    password,
    password_confirm,
    email,
    over18,
    token: veriCode,
  },
})

export const GetUserInfo = (userID) => ({
  endpoint: '/api/user/'+userID,
  method: 'get',
})

export const ChangePasswd = (userID, origPassword, password, passwordConfirm) => ({
  endpoint: '/api/user/'+userID+'/updatepasswd',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],

    orig_password: origPassword,
    password,
    password_confirm: passwordConfirm,
  },
})

export const AttemptChangeEmail = (userID, password, email) => ({
  endpoint: '/api/user/'+userID+'/attemptchangeemail',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],

    password,
    email,
  },
})

export const ChangeEmail = (userID, token) => ({
  endpoint: '/api/user/'+userID+'/changeemail',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],
    token,
  },
})

export const AttemptSetIDEmail = (userID, password, email) => ({
  endpoint: '/api/user/'+userID+'/attemptsetidemail',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],

    password,
    email,
  },
})

export const SetIDEmail = (userID, token) => ({
  endpoint: '/api/user/'+userID+'/setidemail',
  method: 'post',
  json: {
    client_id: config['CLIENT_ID'],
    client_secret: config['CLIENT_SECRET'],
    token,
  },
})

export const LoadPopularBoards = () => ({
  endpoint: '/api/boards/popular',
  method: 'get',
})

export const LoadGeneralBoardsByClass = (startIdx, title, brdname, isAsc, limit) => ({
  endpoint: '/api/boards/byclass'  ,
  method: 'get',
  query: {
    start_idx: startIdx,
    title,
    brdname,
    asc: isAsc,
    limit: limit,
  },
})

export const LoadGeneralBoards = (startIdx, title, brdname, isAsc, limit) => ({
  endpoint: '/api/boards'  ,
  method: 'get',
  query: {
    start_idx: startIdx,
    title,
    brdname,
    asc: isAsc,
    limit: limit,
  },
})
