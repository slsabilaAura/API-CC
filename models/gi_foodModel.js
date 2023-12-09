const mysql = require("../database/data");
const uuid = require('uuid');

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


  createNutritionEntry: async (data) => {
    try {
      const resultId = uuid.v4();
      const { id_user, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL } = data;
  
      // Execute the SQL query
      const query = `
        INSERT INTO result (id, id_user, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      const results = await mysql.query(query, [resultId, id_user, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL]);
      return results;
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  },
  

  updateFoodName :async (id, newFoodName) => {
    try {
      const query = `
        UPDATE result
        SET food_name = ?
        WHERE id = ?;
      `;
  
      const results = await mysql.query(query, [newFoodName, id]);
      return results;
    } catch (error) {
      throw error;
    }
  },

  
  getHistory: (id_user,callBack) => {
    const query = `
      SELECT food_name,GL  FROM result where id_user = ?
    `;

    mysql.query(query, [id_user], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },


};
