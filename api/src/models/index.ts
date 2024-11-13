'use strict'

import { Sequelize } from "sequelize-typescript"
import { DataTypes } from "sequelize"
import fs from 'fs'
import path from "path"
import { Dialect } from "sequelize"

const basename = path.basename(__filename)
const sequelizeDatabase: any = {}

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes
    )
    sequelizeDatabase[model.name] = model
  })

Object.keys(sequelizeDatabase).forEach(modelName => {
  if (sequelizeDatabase[modelName].associate) {
    sequelizeDatabase[modelName].associate(sequelizeDatabase)
  }
})

sequelizeDatabase.sequelize = sequelize
sequelizeDatabase.Sequelize = Sequelize

export default sequelizeDatabase