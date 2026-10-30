import fs from "node:fs";
import { render } from "../.ssr/entry-server.js";
const routes = {
  "/": "Hailey Muñiz — Portfolio",
  "/about": "About Me",
  "/projects": "Selected Works",
  "/contact": "Contact",
  "/research": "Research",
  "/events": "Postcards",
  "/projects/museum": "Museum App & Website",
  "/projects/blueprint": "BluePrint",
  "/projects/trailwatch": "TrailWatch",
  "/events/rowdyhacks": "RowdyHacks XII",
  "/events/we-teach": "We_Teach CS Summit",
  "/events/stanford": "Stanford Young Scientist Institute",
  "/events/aera": "AERA 2026",
  "/events/cturc": "CTURC Conference 2026",
  "/events/nsf": "NSF AI Spring School 2026",
  "/events/retreat": "Three-Day Scholar Retreat",
  "/events/kode": "Kode with Klossy Data Science Camp",
};
const template = fs.readFileSync("dist/index.html", "utf8");
for (const [route, title] of Object.entries(routes)) {
  let html = template
    .replace(
      '<div id="root"></div>',
      '<div id="root">' + render(route) + "</div>"
    )
    .replace(
      /<title>.*?<\/title>/,
      "<title>" + title + (route === "/" ? "" : " | Hailey Muñiz") + "</title>"
    );
  const dir = "dist" + (route === "/" ? "" : route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + "/index.html", html);
}
console.log("Pre-rendered", Object.keys(routes).length, "pages");
