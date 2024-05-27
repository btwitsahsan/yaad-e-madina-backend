require("dotenv").config();
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { Connect_DB } from './src/database/mongodb';
import { authticate_admin, authticate_owner } from './src/middlewares/middlewares';
import { create_admin } from './src/requests/owner_requests';
import { admin_login, create_category } from './src/requests/admin_requests';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://yaad-e-madina-admin.web.app'
}));
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



Connect_DB().then(() => {
    app.listen(PORT, async () =>
      console.log(`Server started at URL: http://localhost:${PORT}`)
    );
  });
  