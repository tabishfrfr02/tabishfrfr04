# Tabish — Portfolio

Personal portfolio site for video editing (UI/motion animation, DaVinci Resolve) and content writing.

**Live sections:**
- Hero with animated gradient title + typewriter role list
- Featured project: **UI Game Animation Ad** — built from static PNG assets in DaVinci Resolve
- Sub-projects: NFT Society Edit, Pulse Feed, Drop Cycle
- About / skills
- Writing → links to [Medium](https://medium.com/@tabishmueen)
- Contact → links to [LinkedIn](https://www.linkedin.com/in/tabish-moin-b29935426)

## Structure

```
index.html
style.css
script.js
assets/
  video/    → project video clips (mp4)
  thumbs/   → poster/thumbnail images for videos
  img/      → raw PNG asset screenshots used in the "featured build" section
```

## Running locally

No build step — just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying on GitHub Pages

1. Push this folder to a GitHub repo (e.g. `tabish-portfolio`).
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

## Notes

- Videos are pre-compressed (H.264, faststart) to keep the repo lightweight and load fast.
- All animation respects `prefers-reduced-motion`.
- Update the project titles/descriptions or swap videos in `assets/video/` + `index.html` as your reel grows.
