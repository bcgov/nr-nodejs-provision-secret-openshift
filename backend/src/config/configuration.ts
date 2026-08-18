export default () => ({
  apitoken: process.env.APITOKEN || '',
  username: process.env.USERNAME || 'defaultusername',
  password: process.env.PASSWORD || 'defaultpassword',
  environment: process.env.ENVIRONMENT || 'development',
})
