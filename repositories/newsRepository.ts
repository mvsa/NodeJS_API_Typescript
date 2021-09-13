import * as mongoose from 'mongoose';

import NewsSchema from '../models/newsSchema';


export default mongoose.model('news', NewsSchema);

//O repositorio está apenas exportando o schema? Existe um melhor uso para esse arquivo?