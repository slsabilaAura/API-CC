
const mysql = require("../database/data");
const uuid = require('uuid');

module.exports = {
 
  getAllFood: (callBack) => {
    const query = `
    SELECT gi_food.id, gi_food.food, food_category.category, gi_food.GI
    FROM gi_food
    JOIN food_category ON gi_food.id_category = food_category.id
    ORDER BY gi_food.food;
    `;

    mysql.query(query, [], (error, results) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results); // Return all rows
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
        callBack(null, results);
      }
    });
  },

  postNutritionEntry: async (data) => {
    const {
      id_users,
      id_food,
      food_name,
      charbo,
      protein,
      fat,
      calorie,
      serving_size,
      GL
    } = data;
    try {
      const resultId = uuid.v4();

      const query = `
        INSERT INTO result (id, id_users, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      const results = await mysql.query(query, [resultId, id_users, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL]);
      return results;
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  },

  updateFoodName: (data, callBack) => {
    const query = `
      UPDATE result
      SET food_name = ?
      WHERE id = ?;
    `;

    mysql.query(query, [data.food_name, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },

  getNutritionEntry: async (id, callBack) => {
    const query = `
      SELECT result.id, result.id, result.id_food, result.food_name, result.charbo, result.protein, result.fat, result.calorie, result.serving_size, result.GL, gi_food.GI 
      FROM result
      LEFT JOIN gi_food ON gi_food.id = result.id_food
      INNER JOIN users ON users.id = result.id_users
      WHERE result.id = ?;
    `;

    mysql.query(query, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },

  getHistory: (id_users, callBack) => {
    const query = `
      SELECT result.food_name, result.GL, gi_food.GI 
      FROM result
      LEFT JOIN gi_food ON result.id_food = gi_food.id 
      WHERE id_users = ?;
    `;

    mysql.query(query, [id_users], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },
};


