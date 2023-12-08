const mysql = require("../database/data");

module.exports = {

getCategories: (callBack) => {
    const query = `
      SELECT id, category FROM food_category
    `;

    mysql.query(query, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },

  getfoodIdCategory: (id_category, callBack) => {
    const query = `
    SELECT gi_food.id, gi_food.food, food_category.category, gi_food.GI
    FROM gi_food
    JOIN food_category ON gi_food.id_category = food_category.id
    WHERE gi_food.id_category = ?;
    `;

    mysql.query(query, [id_category], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results[0]);
      }
    });
  },
};
