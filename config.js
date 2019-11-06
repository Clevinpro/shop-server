const dbUser = 'clv';
const dbPassword = '3bicFbMLwZn6Pnf5';

const config = {
  secret: 'key123',
  port: 3000,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-gftfz.mongodb.net/shop?retryWrites=true&w=majority`
};

module.exports = config;
