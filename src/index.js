const express = require('express');
const cors = require('cors');
const app = express();

// Cors
app.use(cors());

// Settings
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/refresh-token'));
app.use(require('./routes/menu'));
app.use(require('./routes/clients'));

/*
app.use(require('./routes/usuarios'));
app.use(require('./routes/empleados'));
app.use(require('./routes/medios-pago'));
app.use(require('./routes/citas'));
app.use(require('./routes/tipo-documento'));
*/

// Starting the server
app.listen(app.get('port'), () => console.log(`Server on port.. ${app.get('port')}`) );
