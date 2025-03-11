module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define("Bookmark", {});
  
    Bookmark.associate = (models) => {
      Bookmark.belongsTo(models.User, { foreignKey: "userId" });
      Bookmark.belongsTo(models.Job, { foreignKey: "jobId" });
    };
  
    return Bookmark;
  };