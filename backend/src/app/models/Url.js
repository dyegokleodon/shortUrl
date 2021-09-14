import Sequelize, {Model} from "sequelize";

class Url extends Model{
  static init(sequelize){
    super.init(
      {
        url: Sequelize.STRING,
        short_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
  }
}

export default Url;
