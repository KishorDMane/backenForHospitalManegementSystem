const { sequelize } = require("../config/db")
const { Sequelize,DataTypes } = require('sequelize');

const Department = sequelize.define('department', {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },

 imgurl:{
  type:DataTypes.STRING,
  allowNull:true
 }

});

module.exports = Department;



// Insert into departments  Values (2,"lungs","the lungs department of ayuva has one of best doctors of india at affordable prices","0000-00-00 00:00:00","0000-00-00 00:00:00");

// Insert into departments  Values(3,"heart","The team of experts in the Cardiology department includes cardiologists, cardiac surgeons, nurses, and other healthcare professionals who work together to provide the best possible care to patients. They are dedicated to using the latest technologies and techniques to diagnose and treat cardiovascular diseases, including heart attacks, arrhythmias, heart failure, and more.","https://img.icons8.com/emoji/48/null/red-heart.png","0001-00-00 00:00:00","0001-00-00 00:00:00");
 
// Insert into departments  Values(4,"Optical","The team of experts in the Optical department includes optometrists, ophthalmologists, opticians, and other healthcare professionals who work together to provide the best possible care to patients.","https://img.icons8.com/external-creatype-outline-colourcreatype/50/null/external-eyes-basic-creatype-outline-colourcreatype.png","0001-00-00 00:00:00","0001-00-00 00:00:00");


// Insert into departments Values (5,"neurology","The department offers a wide range of services, including diagnostic tests such as EEGs, EMGs, and brain imaging studies. They also provide advanced procedures such as brain and spinal surgery, deep brain stimulation, and nerve conduction studies.","https://img.icons8.com/emoji/48/null/brain-emoji.png","0001-00-00 00:00:00","0001-00-00 00:00:00");



// Insert into departments  VALUES (6,"Nephrology"," They are dedicated to using the latest technologies and techniques to diagnose and treat kidney diseases, including chronic kidney disease, kidney stones, kidney infections, and more.","https://as2.ftcdn.net/v2/jpg/02/22/71/35/1000_F_222713538_smzje8qrVbIBQaWp2b6Us4Oi1TUGp9zY.jpg","0001-00-00 00:00:00","0001-00-00 00:00:00");

// SELECT * FROM departments;
