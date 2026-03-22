import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { OAuth2Client } from "google-auth-library";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Google OAuth Configuration
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_URL}/auth/callback`
);

// Session configuration for iframe context
app.use(
  session({
    secret: "aegis-security-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,      // Required for SameSite=None
      sameSite: 'none',  // Required for cross-origin iframe
      httpOnly: true,
    },
  })
);

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// OAuth: Get Authorization URL
app.get("/api/auth/url", (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent"
  });

  res.json({ url });
});

// OAuth: Callback Handler
app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    // In a real app, you'd store these tokens in a database linked to the user
    // For this demo, we'll just send a success message to the parent window
    
    res.send(`
      <html>
        <body style="background: #151619; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
          <div style="text-align: center;">
            <h2 style="color: #F27D26;">Authentication Successful</h2>
            <p>Syncing with Aegis Security...</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', tokens: ${JSON.stringify(tokens)} }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).send("Authentication failed");
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
