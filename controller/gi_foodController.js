const {getCategories, getfoodIdCategory} = require("../models/gi_foodModel");

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
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
    
        //   if (!results) {
        //     return res.json({
        //       success: 0,
        //       message: "Food does not exist"
        //     });
        //   }
    
        //   results.password = undefined;

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
      
        //   results.forEach(result => {
        //     // If needed, you can modify or remove sensitive data here
        //     result.password = undefined;
        //   });
      
          return res.json({
            success: 1,
            data: results
          });
        });
      },
};
