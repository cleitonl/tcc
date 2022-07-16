module.exports = {
  database: 'ntask',
  username: 'root',
  password: '',
  params: {
    dialect: 'mysql',
    // storage: 'ntask.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`)
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: { session: false }
}
