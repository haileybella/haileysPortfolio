import fs from "node:fs";
const input = JSON.parse(fs.readFileSync("design-reference/motion.json"));
const result = input.nodes.map((n) => {
  const s = n.codeSnippets.motionDev;
  const initial = s.match(/initial=\{\{([\s\S]*?)\}\}/)[1];
  const animate = s.match(/animate=\{\{([\s\S]*?)\}\}/)[1];
  const transition = s
    .match(/transition=\{\{([\s\S]*?)\}\}/)[1]
    .replaceAll('\\"', '"');
  return {
    id: n.nodeId,
    initial: Function("return ({" + initial + "})")(),
    animate: Function("return ({" + animate + "})")(),
    transition: Function("return ({" + transition + "})")(),
  };
});
fs.writeFileSync("src/content/motion.json", JSON.stringify(result));
