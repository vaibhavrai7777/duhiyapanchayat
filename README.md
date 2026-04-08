#  दुहिया ग्राम पंचायत Website

**Gram Pradhan:** Vineet Rai (8303049123)  
**Pradhan Sahayak:** Akash Rai (7982181475)  
**Location:** Duhia, zamania, Ghazipur, UP — 233001

---

##  Project Structure

```
duhia-panchayat/
├── index.html              ← Main website (open this to view)
├── css/
│   └── style.css           ← All styles (edit for design changes)
├── js/
│   ├── config.js           ← EDIT THIS to change content
│   └── main.js             ← All JavaScript logic
├── assets/
│   └── photos.js           ← Embedded photos (auto-generated)
├── netlify/
│   └── functions/
│       └── chat.js         ← Serverless AI proxy (Netlify)
├── netlify.toml            ← Netlify deployment config
└── README.md               ← This file
```

---

##  Quick Start (Local)

1. **Open in VS Code:**
   ```
   code .
   ```

2. **Install Live Server extension** (VS Code marketplace)

3. **Right-click `index.html` → Open with Live Server**

4. Site opens at `http://127.0.0.1:5500`

---

##  How to Edit Content

**ALL content is controlled from one file: `js/config.js`**

### Change Announcements:
Open `js/config.js`, find `announcements:` array and edit or add items:
```js
{
  icon: "📅",
  titleHi: "ग्राम सभा बैठक",
  titleEn: "Gram Sabha Meeting",
  textHi: "20 मई को बैठक होगी...",
  textEn: "Meeting on May 20...",
  date: "15 मई, 2026",
}
```

### Change Government Schemes:
Edit the `schemes:` array in `js/config.js`.

### Change Portal Password:
```js
portalPassword: "yourNewPassword",
```

### Change Pradhan/Sahayak details:
Edit `pradhan:` and `sahayak:` objects in `js/config.js`.

---

##  Deploy to Netlify (Free Hosting)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Duhia Panchayat website"
git remote add origin https://github.com/YOUR_USERNAME/duhia-panchayat.git
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Click **"Add new site"** → **"Import from Git"**
3. Connect GitHub → Select `duhia-panchayat` repo
4. Build settings are auto-detected from `netlify.toml`
5. Click **"Deploy site"**
6. Your site is live at `https://duhia-panchayat.netlify.app` (free!)

### Step 3: Enable AI Assistant (optional)
1. Get API key from [console.anthropic.com](https://console.anthropic.com)
2. In Netlify dashboard → **Site settings** → **Environment variables**
3. Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
4. Redeploy site
5. AI assistant will now work for villagers

---

##  Features

| Feature | Description |
|---------|-------------|
|  Bilingual | Full Hindi + English toggle |
|  Physics Cursor | Spring-physics custom cursor |
|  Particles | Interactive particle physics hero |
|  3D Village | Three.js animated village scene |
|  Complaint System | File, track, manage complaints |
|  AI Assistant | Claude-powered panchayat assistant |
|  Pradhan Portal | Password-protected dashboard |
|  CSV Export | Download all complaints as spreadsheet |
|  Mobile Ready | Works on all screen sizes |
|  Real Map | Actual Ghazipur/Duhia coordinates |

---

##  Pradhan Portal

- **URL:** Click "प्रधान पोर्टल" button in navbar`
- **Change password** in `js/config.js` → `portalPassword`
- **Features:** View all complaints, mark as resolved, export CSV

---

## Map Coordinates

Duhia village is located at:
- **Latitude:** 25.5668°N
- **Longitude:** 83.5423°E
- (Zamania tehsil, Ghazipur district)

To update: change `map.lat` and `map.lng` in `js/config.js`

---

##  Support

For technical issues, contact the developer.  
For panchayat matters: **Pradhan Vineet Rai —  8303049123**
