const {getCategories, getfoodIdCategory,createNutritionEntry,updateFoodName,getHistory,getNutritionEntry} = require("../models/gi_foodModel");

module.exports = {
    getCategories: (req, res) => {
        getCategories((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
    
          return res.json({
            success: 1,
            data: results
          });
        });
      },


      getfoodIdCategory: (req, res) => {
        const id_category = req.params.id_category;
        getfoodIdCategory(id_category, (err, results) => {
       
        if (err) {
            console.log(err);
            return res.json({
              success: 0,
              message: "Failed to retrieve food data",
            });
          }
      
          if (!results || results.length === 0) {
            return res.json({
              success: 0,
              message: "No food found for the specified category",
            });
          }
      
          return res.json({
            success: 1,
            data: results
          });
        });
      },

      createNutritionEntry: async (req, res) => {
        try {
          const { id_users, id_food, food_name, charbo, protein, fat, calorie, serving_size, GL } = req.body;
      
          // Execute the SQL query using the model
          const result = await createNutritionEntry({
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
          // Send a generic success response
          return res.status(200).json({
            success: 1,
            message: "Nutrition entry created successfully",
            data: sanitizedResult,
          });
          // res.status(201).json({ message: 'Nutrition entry created successfully' });
        } catch (error) {
          console.error('Error creating nutrition entry:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

      updateFoodName: async (req, res) => {
        const { id, newFoodName } = req.body;

        updateFoodName({ food_name: newFoodName, id: id }, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Error updating username"
            });
          }
        // try {
        //   const { id, newFoodName } = req.body;
      
        //   // Execute the SQL query using the model
        //   const result = await updateFoodName(id, newFoodName);
      
        //   // Check if the update was successful
        //   if (result.affectedRows === 0) {
        //     res.status(404).json({ error: 'Record not found' });
        //   } else {
        //     res.status(200).json({ message: 'Food name updated successfully' });
        //   }
        // } catch (error) {
        //   console.error('Error updating food name:', error);
        //   res.status(500).json({ error: 'Internal Server Error' });
        // }

        if (results.affectedRows > 0) {
          return res.json({
            success: 1,
            message: "Food name updated successfully"
          });
        } else {
          return res.json({
            success: 0,
            message: "No rows were updated. User not found or no changes made."
          });
        }
      });

      },


      getNutritionEntry:(req, res)=>{
        const id = req.params.id;
        getNutritionEntry(id,(err, results) => {
          if (err) {
            console.log(err);
            return res.json({
              success: 0,
              message: "Failed to retrieve Nutrition and GL ",
            });
          }
      
          if (!results || results.length === 0) {
            return res.json({
              success: 0,
              message: "Can not view the nutrition",
            });
          }
      
          return res.json({
            success: 1,
            data: results
          });
        });
      },
      

      getHistory: (req, res) => {
       const id_users = req.params.id_users;
        getHistory(id_users,(err, results) => {
          if (err) {
            console.log(err);
            return res.json({
              success: 0,
              message: "Failed to retrieve The history ",
            });
          }
      
          if (!results || results.length === 0) {
            return res.json({
              success: 0,
              message: "No one history here",
            });
          }
      
          return res.json({
            success: 1,
            data: results
          });
        });
      },

      
};
