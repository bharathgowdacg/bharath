# Portfolio Deployment Guide

## Summary of Changes

This guide documents all changes made to integrate a secure server-side email system into your portfolio.

### Files Modified

#### 1. **package.json**
- Added server dependencies: `express`, `nodemailer`, `cors`, `dotenv`
- Added npm script: `"server": "node server.js"`

#### 2. **index.html**
- Removed: EmailJS SDK script and client-side email handler
- Added: Secure server-side form submission via `/api/send` endpoint
- Form now sends data to your Express backend instead of third-party EmailJS service
- All email credentials stay server-side (secure)

#### 3. **server.js** (NEW FILE)
- Express.js server listening on port 3001
- Endpoint: `POST /api/send`
- Accepts: `{name, email, message}`
- Features:
  - CORS enabled for localhost:5173 (configurable via env)
  - Nodemailer SMTP integration
  - Ethereal test account fallback (for development)
  - Returns: `{ok: true, messageId, preview}` on success
  - Error handling and logging

#### 4. **.env.local.example** (NEW FILE)
- Template for environment variables
- SMTP configuration (Gmail, SendGrid, custom SMTP)
- Email recipient address
- Server port and client origin (CORS)
- Instructions for Gmail App Password setup

#### 5. **.vscode/settings.json** (NEW FILE)
- Workspace settings to show hidden files (`.env.local`, dotfiles)

---

## Running Locally

### Terminal 1: Email Server
```powershell
npm run server
# Server starts on http://localhost:3001
```

### Terminal 2: Development Site
```powershell
npm start
# Dev site starts on http://localhost:5173
```

Visit http://localhost:5173/ and test the contact form.

---

## Production Setup

### For Gmail (Recommended for Testing)

1. **Enable App Passwords in Gmail:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character app password

2. **Create .env.local in project root:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   EMAIL_TO=your-email@gmail.com
   CLIENT_ORIGIN=http://localhost:5173
   PORT=3001
   ```

3. **Restart server:**
   ```powershell
   npm run server
   ```

### For Other SMTP Providers

Update `.env.local` with your provider's SMTP details:
- SendGrid: `smtp.sendgrid.net:587`
- AWS SES: `email-smtp.region.amazonaws.com:587`
- Custom SMTP: Your provider's SMTP host and port

---

## Deployment Options

### Frontend (React + Vite)

**Deploy to Netlify:**
1. Build: `npm run build`
2. Connect your repo or drag `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

**Environment Variable:** In Netlify settings, add:
```
VITE_API_URL=https://your-server.com
```

Update `index.html` fetch URL if needed:
```javascript
const apiUrl = import.meta.env.VITE_API_URL || '/api/send';
const response = await fetch(apiUrl, { ... });
```

### Backend (Express Server)

**Deploy to Railway/Render/Heroku:**

1. Create account on [Railway.app](https://railway.app) or [Render.com](https://render.com)
2. Connect your GitHub repo (or push code)
3. Set environment variables in dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `EMAIL_TO`
   - `CLIENT_ORIGIN` (your deployed frontend URL)
   - `PORT` (will be assigned by platform)

4. Deploy command: `npm run server`

**Example with Railway:**
```bash
npm install -g @railway/cli
railway init
railway up
```

---

## Testing Email Delivery

### Development (Ethereal Test Account)
- No `.env.local` needed
- Emails logged to Ethereal service
- Preview URL returned in response
- View test email: Visit the `preview` URL returned by `/api/send`

### Production (Real SMTP)
- Emails sent to `EMAIL_TO` address
- Configure SMTP credentials in `.env.local`
- Test by submitting form on your site

---

## Security Checklist

- ✅ Email credentials stored server-side (not in HTML)
- ✅ CORS restricted to your frontend origin
- ✅ `.env.local` added to `.gitignore` (create this if deploying)
- ✅ Form validation on server-side
- ✅ HTTPS required for production (handled by deployment platform)

---

## Project Structure

```
portfolio/
├── index.html                 # Updated frontend with secure form
├── package.json              # Added server dependencies
├── server.js                 # Express email API
├── .env.local.example        # Template for env vars
├── .vscode/
│   └── settings.json         # Show hidden files
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── [assets]
├── vite.config.js            # Vite config (unchanged)
└── dist/                     # Build output (generated)
```

---

## API Reference

### POST /api/send

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect!"
}
```

**Response (Success):**
```json
{
  "ok": true,
  "messageId": "<uuid@domain.com>",
  "preview": "https://ethereal.email/message/..."  // Only in dev mode
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields: name, email, message"
}
```

---

## Troubleshooting

### Server won't start
- Check port 3001 is not in use: `netstat -ano | findstr :3001`
- Kill process: `Stop-Process -Name node -Force`

### Emails not sending
- Check `.env.local` exists and has correct SMTP credentials
- Verify `EMAIL_TO` is set
- Check server logs for error messages
- For Gmail: Verify app password is 16 characters, not your regular password

### CORS errors in browser
- Ensure `CLIENT_ORIGIN` in `.env.local` matches your frontend URL
- In dev: should be `http://localhost:5173`

### Form shows "something went wrong"
- Open browser DevTools (F12) → Console tab
- Look for error messages and server response
- Check server logs: `Get-Content server.err -Raw`

---

## What Was Done

1. ✅ Integrated EmailJS initially (client-side)
2. ✅ Moved to secure server-side Node.js/Express backend
3. ✅ Implemented Nodemailer with SMTP support
4. ✅ Added Ethereal test account fallback
5. ✅ Tested end-to-end locally
6. ✅ Created deployment guide and examples

---

## Next Steps

1. **Test locally** - Fill and submit the contact form on http://localhost:5173/
2. **Add real email** - Configure Gmail or other SMTP in `.env.local`
3. **Build for production** - `npm run build`
4. **Deploy frontend** - Netlify, Vercel, or GitHub Pages
5. **Deploy backend** - Railway, Render, or Heroku

For questions or issues, refer to this guide or check server logs.
