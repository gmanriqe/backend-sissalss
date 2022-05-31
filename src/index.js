const cors = require('cors');
const express = require('express');
const app = express();

// Cors
app.use(cors());

// Settings
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(express.json());

// Routes
// app.use(require('./routes/employees'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/clientes'));
app.use(require('./routes/empleados'));
app.use(require('./routes/medios-pago'));
app.use(require('./routes/citas'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
