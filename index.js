// =========================================== Importing module for Environment variables ======================================
require('dotenv').config();

// ============================================ Importing module for defining paths ============================================
const path = require('path')

// ============================================ Importing express modules ============================================
const express = require('express')
const expressEdge = require('express-edge')
const app = new express()

// ============================================ Importing module to hide/show login, register, logout buttons ==============
const edge = require('edge.js')

// ============================================ Importing module to parse forms ============================================
const bodyParser = require('body-parser')

// ============================================ Importing module for database ============================================
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })

// ============================================ Importing module for user session ============================================
const expressSession = require('express-session')

// ================================= Importing module for storing user session in database ===================================
const connectMongo = require('connect-mongo')

// ============================================ Importing module for displaying errors for single request ====================
const connectFlash = require('connect-flash')

// ============================================ Importing Controllers ============================================
const homePageController = require('./controllers/homePage')

const searchDataController = require('./controllers/searchData')

const moviesPageController = require('./controllers/moviesPage')
const oneMoviePageController = require('./controllers/oneMoviePage')
const comingSoonController = require('./controllers/comingSoonPage')
const nowShowingPageController = require('./controllers/nowShowingPage')

const cinemaHallsPageController = require('./controllers/cinemaHallsPage')

const bookTicketController = require('./controllers/bookTicketPage')
const storeTicketController = require('./controllers/storeTicket')

const signInPageController = require('./controllers/signInPage')
const signInUserController = require('./controllers/signinUser')

const logoutController = require('./controllers/signout')

const signUpPageController = require('./controllers/signUpPage')
const storeUserController = require('./controllers/storeUser')

const supportPageController = require('./controllers/supportPage')

const aboutUsController = require('./controllers/aboutUsPage')

// =================================== Using public directory for stati files ==============================
app.use(express.static('public'))

app.use(expressEdge)
// Storing session in database
const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(connectFlash())

// ============================================ Using Middleware ============================================
const authMiddleware = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const redirectIfNotAuthenticated = require('./middleware/redirectIfNotAuthenticated')

// Sharing session userId globally
app.use('*', (req, res, next) => {
    // Using edge templating engine, the global variable 'auth' is available on 
    // all templates rendered by our templating engine
    edge.global('auth', req.session.userId)
    next()
})

// ============================================ Setting views directory ============================================
app.set('views',`${__dirname}/views`)

// For post request - body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// ============================================ Creating actions for requests ============================================
app.get('/', homePageController)

app.get('/search', searchDataController)

app.get('/movies', moviesPageController)
app.get('/movies/:id', oneMoviePageController)
app.get('/comingsoon', comingSoonController)
app.get('/nowshowing', nowShowingPageController)

app.get('/cinemahalls', cinemaHallsPageController)

app.post('/bookticket', redirectIfNotAuthenticated, bookTicketController)
app.post('/users/book', redirectIfNotAuthenticated, storeTicketController)

app.get('/signin', redirectIfAuthenticated, signInPageController)
app.post('/users/signin', redirectIfAuthenticated, signInUserController)

app.get('/signout', authMiddleware, logoutController)

app.get('/signup', redirectIfAuthenticated, signUpPageController)
app.post('/users/signup', redirectIfAuthenticated, storeUserController)

app.get('/support', supportPageController)

app.get('/aboutus', aboutUsController)


// 404 Page
app.use((req, res) => {
    res.render('not-found')
})

// ============================================ Running application at port 4000 ============================================
// http://localhost:port/
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})

