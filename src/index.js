/* require('dotenv').config({
    path:"./env"
}) */
import dotenv from "dotenv"
import dbconnect from './db/dbconnect.js'

dotenv.config({
    path:"./env"
})

dbconnect();