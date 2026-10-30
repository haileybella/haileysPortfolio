import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const names=['museum','blueprint','trailwatch','rowdyhacks','we-teach','stanford','aera','cturc','nsf','retreat','kode'];
const trees=names.map(n=>JSON.parse(fs.readFileSync('src/content/'+n+'.json')));
function walk(n,fn){fn(n);n.children?.forEach(c=>walk(c,fn))}
test('Every story image is mapped to a non-empty local asset',()=>{let count=0;trees.forEach(t=>walk(t,n=>{if(n.image){assert.ok(n.src,`${n.id} has an asset`);assert.ok(fs.statSync('public'+n.src).size>0);count++}}));assert.ok(count>=50)});
test('Museum case study retains the required research and testing content',()=>{let text='';walk(trees[0],n=>text+=' '+(n.text??''));for(const s of ['Introduction & platform','Problem','Goals','My role','Timeline','Weeks 1–2','Week 8','Early ideation','User testing','Final designs','Impact'])assert.ok(text.includes(s),s)});
test('Every page pre-renders its title and real content',()=>{for(const name of names){const path=(['museum','blueprint','trailwatch'].includes(name)?'projects/':'events/')+name;const html=fs.readFileSync('dist/'+path+'/index.html','utf8');assert.ok(html.includes('<h1'));assert.ok(html.includes('Hailey Muñiz'));assert.ok(!html.includes('www.figma.com/api/mcp/asset/'))}});
test('All exported asset references exist locally',()=>{const assets=JSON.parse(fs.readFileSync('src/content/assets.json'));for(const group of Object.values(assets))for(const p of Object.values(group))assert.ok(fs.statSync('public'+p).size>0,p)});
