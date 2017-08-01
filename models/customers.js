// =============================================================
//                      Customer Model
// =============================================================
module.exports = function(sequelize, DataTypes) {

    var Customer = sequelize.define("Customer", {
                        customer_name: DataTypes.STRING
    });

    Customer.associate = function(models) {
    // Associating Customer with Burger
    // When a Customer is deleted, also delete any associated Burger
    Customer.hasMany(models.Burger, 
                    {
                     onDelete: "cascade"
                    });
    };
    
return Customer;
};
