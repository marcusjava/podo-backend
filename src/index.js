const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const clients = require('./routes/api/clients');
const procedures = require('./routes/api/procedures');
const services = require('./routes/api/services');
const consults = require('./routes/api/consults');

// URI mongodb atlas mongodb+srv://omnistack:omnistack@cluster0-kjbyd.mongodb.net/semana09?retryWrites=true&w=majority
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

//passport
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//fazendo com que as imagens fiquem acessiveis
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Routes
app.use('/api/users', users);
app.use('/api/clients', clients);
app.use('/api/procedures', procedures);
app.use('/api/services', services);
app.use('/api/consults', consults);

app.listen(3001, () => {
	console.log(`Server started at port 3001`);
});
