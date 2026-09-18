require("dotenv").config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "change-this-to-a-long-random-secret-key";

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// DATABASE SETUP
// --------------------------------------------------

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

const dbPath = path.join(dataFolder, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create users table
db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (err) => {
    if (err) {
      console.error("Could not create users table:", err.message);
    } else {
      console.log("Users table ready.");
    }
  }
);

// --------------------------------------------------
// HOME / HEALTH CHECK
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is running."
  });
});

// --------------------------------------------------
// REGISTER
// --------------------------------------------------

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required."
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    db.get(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail],
      async (err, existingUser) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            success: false,
            error: "Database error."
          });
        }

        if (existingUser) {
          return res.status(409).json({
            success: false,
            error: "An account with this email already exists."
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        db.run(
          `
          INSERT INTO users (name, email, password)
          VALUES (?, ?, ?)
          `,
          [cleanName, cleanEmail, hashedPassword],
          function (err) {
            if (err) {
              console.error(err);

              return res.status(500).json({
                success: false,
                error: "Could not create account."
              });
            }

            // Create JWT
            const token = jwt.sign(
              {
                userId: this.lastID,
                email: cleanEmail
              },
              JWT_SECRET,
              {
                expiresIn: "7d"
              }
            );

            res.status(201).json({
              success: true,
              message: "Account created successfully.",
              token,
              user: {
                id: this.lastID,
                name: cleanName,
                email: cleanEmail
              }
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Server error."
    });
  }
});

// --------------------------------------------------
// LOGIN
// --------------------------------------------------

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required."
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [cleanEmail],
    async (err, user) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          error: "Database error."
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password."
        });
      }

      // Compare passwords
      const passwordMatches = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatches) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password."
        });
      }

      // Create JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

      res.json({
        success: true,
        message: "Login successful.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
});

// --------------------------------------------------
// AUTHENTICATION MIDDLEWARE
// --------------------------------------------------

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Authentication required."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: "Invalid or expired token."
    });
  }
}

// --------------------------------------------------
// GET CURRENT USER
// --------------------------------------------------

app.get("/api/me", authenticateToken, (req, res) => {
  db.get(
    `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = ?
    `,
    [req.user.userId],
    (err, user) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          error: "Database error."
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found."
        });
      }

      res.json({
        success: true,
        user
      });
    }
  );
});

// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

app.post("/api/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message:
      "Logout successful. Remove the token from the client."
  });
});

// --------------------------------------------------
// 404 HANDLER
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found."
  });
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log("Backend server is running!");
  console.log(`http://localhost:${PORT}`);
  console.log("=================================");
  console.log("");
});
