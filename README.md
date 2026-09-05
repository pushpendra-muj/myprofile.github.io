# Dr. Pushpendra Singh Sisodia — Portfolio Website

A single-page, minimal & modern portfolio site built from your resume: hero, about, skills,
experience (with expandable project details), education, publications, and contact —
with a light/dark theme toggle and mobile-friendly layout. Pure HTML/CSS/JS, no build step,
so it deploys directly on GitHub Pages.

## Files

```
index.html        Main page (all content lives here)
css/styles.css     All styling (light + dark theme)
js/main.js         Theme toggle, mobile nav, scroll-spy, reveal animations
images/profile.jpg Headshot (extracted from your resume)
assets/resume.pdf  Your resume, linked from the "Download Resume" button
```

## 1. Publish it on GitHub Pages

**Option A — new dedicated repo (recommended, gives you `https://<username>.github.io`)**

1. Create a new GitHub repo named exactly `<your-username>.github.io` (e.g. `pushpendrasisodia.github.io`).
2. Upload all the files in this folder to the repo root (keep the folder structure: `css/`, `js/`, `images/`, `assets/`).
3. Go to the repo's **Settings → Pages**. Under "Build and deployment", make sure the source is your default branch (`main`) and root folder — for a `<username>.github.io` repo this is usually automatic.
4. Your site will be live at `https://<your-username>.github.io` within a minute or two.

**Option B — any repo name (site lives at a sub-path)**

1. Create any repo, e.g. `portfolio`.
2. Upload these files to the repo root.
3. Go to **Settings → Pages**, set source to the `main` branch, `/ (root)` folder, and save.
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.

### Using git from the command line

```bash
cd portfolio-site
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then enable Pages as described above.

## 2. Put the link on your resume

Once live, add the URL (e.g. `https://<your-username>.github.io`) next to your LinkedIn
link in the resume header.

## 3. Customizing later

- **Content**: everything is plain text inside `index.html` — search for the section you
  want to change (`<!-- ================= EXPERIENCE ================= -->` etc.).
- **Colors**: edit the CSS variables at the top of `css/styles.css` (`--accent`, `--bg`, etc.)
  for both the light theme (`:root`) and dark theme (`:root[data-theme="dark"]`).
- **Resume file**: replace `assets/resume.pdf` with an updated version any time — the
  filename should stay `resume.pdf`, or update the link in `index.html`'s "Download Resume" button.
- **Photo**: replace `images/profile.jpg` with a higher-resolution headshot if you have one —
  the extracted version from your resume is small, so a fresh photo will look sharper.

## 4. Local preview

No build tools needed — just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
