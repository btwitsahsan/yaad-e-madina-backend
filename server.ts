require("dotenv").config();
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { Connect_DB } from './src/database/mongodb';
import { authticate_admin, authticate_owner } from './src/middlewares/middlewares';
import { create_admin } from './src/requests/owner_requests';
import { admin_login, create_category, create_naat_khawan, delete_category, delete_naat_khawan, get_all_categories, get_all_naat_khawans } from './src/requests/admin_requests';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: `50mb`, extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js!');
});

// OWNER END-POINTs
app.post("/api/owner/createAdmin", authticate_owner, create_admin);

// ADMIN END-POINTs
app.post("/api/admin/login", admin_login);


// Add Category
app.post("/api/createCategory",authticate_admin ,create_category);
// Get All Categories
app.post("/api/getAllCategories", authticate_admin, get_all_categories);
// Delete Category
app.post("/api/deleteCategory/:id", authticate_admin, delete_category);


// API endpoint for creating Naat Khawans
app.post("/api/createNaatKhawan", authticate_admin, create_naat_khawan);
// Get All naatKhawans
app.post("/api/getAllNaatKhawans", authticate_admin, get_all_naat_khawans);
// Delete naatKhawans
app.post("/api/deleteNaatKhawan/:id", authticate_admin, delete_naat_khawan);



Connect_DB().then(() => {
    app.listen(PORT, async () =>
      console.log(`Server started at URL: http://localhost:${PORT}`)
    );
});
