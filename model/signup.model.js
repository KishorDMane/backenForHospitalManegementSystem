
const { sequelize } = require("../config/db")
const { Sequelize } = require('sequelize');


const Signup = sequelize.define('signup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'doctor','patient'),
        defaultValue: 'patient'
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created/updated successfully');
  });

  
// sequelize.sync({ force: true }).then(() => {
//     console.log(`Table created!`);
// });

module.exports = { Signup }