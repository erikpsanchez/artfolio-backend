var Sequelize = require("sequelize");
var sqlString = require("sequelize/lib/sql-string");

Sequelize.safeLiteral = function (query, params) {
  if (query) {
    var variables = query.match(/\?/g);
    var valores = params && typeof params == "object" ? params : null;
s
    if (variables && variables.length && valores) {
      variables.forEach(function (variable, index) {
        if (valores[index]) {
          query = query.replace(variable, sqlString.escape(valores[index]));
        }
      });
    }
  }

  return Sequelize.literal(query);
};
