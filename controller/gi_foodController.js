
const {
  getCategories,
  getfoodIdCategory,
  postNutritionEntry,
  updateFoodName,
  getAllFood,
  getHistory,
  getNutritionEntry
} = require("../models/gi_foodModel");

module.exports = {

  getAllFood: (req, res) => {
    getAllFood((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error retrieving food data",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getfoodIdCategory: (req, res) => {
    const id_category = req.params.id_category;
    getfoodIdCategory(id_category, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to retrieve food data",
        });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({
          success: 0,
          message: "No food found for the specified category",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  postNutritionEntry: async (req, res) => {
    const id_users = req.params.id_users;
    try {
      const {
        id_food,
        food_name,
        charbo,
        protein,
        fat,
        calorie,
        serving_size,
        GL
      } = req.body;

      

      const result = await postNutritionEntry({
        id_users,
        id_food,
        food_name,
        charbo,
        protein,
        fat,
        calorie,
        serving_size,
        GL,
      });

      const sanitizedResult = {
        id: result.id,
      };

      return res.status(201).json({
        success: 1,
        message: "Nutrition entry successfully",
        data: sanitizedResult,
      });

    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  },

  updateFoodName: async (req, res) => {
    const idResult = req.params.idResult;
    const newFoodName = req.body.newFoodName;
    

    updateFoodName({
      food_name: newFoodName,
      id: idResult
    }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error updating food name"
        });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: 1,
          message: "Food name updated successfully"
        });
      } else {
        return res.status(404).json({
          success: 0,
          message: " Food not found or no changes made."
        });
      }
    });
  },

  getNutritionEntry: (req, res) => {
    const id = req.params.id;
    getNutritionEntry(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to retrieve Nutrition and GL",
        });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({
          success: 0,
          message: "Not found",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getHistory: (req, res) => {
    const id_users = req.params.id_users;
    getHistory(id_users, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to retrieve the history",
        });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({
          success: 0,
          message: "history is not available",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
};
