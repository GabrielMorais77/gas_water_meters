
import { sequelize } from '../config/database';
import { Reading } from './reading';


Reading.init({

}, { sequelize, modelName: 'Reading' });

sequelize.sync();

export { Reading, sequelize };

