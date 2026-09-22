# Birthday mystery website

This is a fully static, mobile-friendly birthday surprise for GitHub Pages. It includes a passcode gate, a playful “No” page, falling cute effects, mystery notes, a heart-collecting activity, candle blowing, optional music, and a photo finale.

## Repository structure

```text
your-birthday-repository/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── music/
    │   └── birthday-song.mp3       ← add your own MP3 (optional)
    └── photos/
        ├── photo-1.jpg             ← add your own photos (optional)
        ├── photo-2.jpg
        ├── photo-3.jpg
        ├── photo-4.jpg
        ├── photo-5.jpg
        └── photo-6.jpg
```

The empty `assets` folders are included so you can drop in your own music and photos. The site still works before you add them; it shows pretty placeholders in the photo section and keeps the music button quiet.

## Personalise it

Open `script.js` and change only the `birthdayConfig` block at the very top:

- `partnerName` and `yourName`
- `secretCode` — use digits only, up to 8 characters
- `loveNotes` and `heartMemories`
- `finalMessage`
- photo filenames if yours differ from `photo-1.jpg` to `photo-6.jpg`
- `musicFile` if you want a music filename other than `birthday-song.mp3`

The two characters are original cat characters made entirely with HTML and CSS, so the site does not download or hotlink any Dudu Bubu artwork. If you own or have permission to use a Dudu Bubu image/sticker, you can safely replace the original artwork yourself; do not copy artwork from Instagram without permission.

> **Important:** a GitHub Pages site is static, so its passcode is a cute surprise gate, not real security. Anyone who examines the public `script.js` can find it. Do not use a password that protects an account or personal information.

## Add your pictures and music

1. Upload six photos into `assets/photos` using the exact filenames shown above, or update the `photos` list in `script.js`.
2. Upload an MP3 as `assets/music/birthday-song.mp3`, or update `musicFile`.
3. Keep filenames simple: lowercase letters, numbers, hyphens, and `.jpg` / `.mp3` are safest.

## Publish it with GitHub Pages

1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`, and the `assets` folder to its root.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then click **Save**.
5. GitHub will show the public birthday link after the site deploys.

## What to test before sending the link

Use a private/incognito browser tab and confirm that:

- the correct passcode opens the story and a wrong one opens the cute retry page;
- “No” returns to the playful “please choose Yes” page;
- all three hearts unlock the candle page;
- the candle button leads to the finale;
- your photos appear and the music button works after a click.
