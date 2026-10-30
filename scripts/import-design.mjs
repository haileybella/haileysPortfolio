import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {parse} from '@babel/parser';
import sharp from 'sharp';
const manifests={}, maps={};
for(const file of fs.readdirSync('design-reference').filter(x=>x.endsWith('.txt'))){
 const name=file.slice(0,-4), raw=fs.readFileSync('design-reference/'+file,'utf8').split('SUPER CRITICAL:')[0];
 const prefix=raw.match(/const assetPathPrefix = "([^"]+)"/)[1];
 const assets={};
 for(const m of raw.matchAll(/const (\w+) = `\$\{assetPathPrefix\}\/([^`]+)`;/g))assets[m[1]]={url:prefix+'/'+m[2],path:'/assets/'+name+'-'+m[2]};
 manifests[name]=assets; maps[name]={};
 const ast=parse(raw,{sourceType:'module',plugins:['jsx','typescript']});
 function walk(n,anc=[]){if(!n||typeof n!=='object')return;
 if(n.type==='JSXElement'){
  const attrs=Object.fromEntries(n.openingElement.attributes.filter(a=>a.type==='JSXAttribute').map(a=>[a.name.name,a.value?.value??a.value?.expression?.name]));
  if(attrs['data-node-id'])anc=[...anc,attrs['data-node-id']];
  if(n.openingElement.name.name==='img'&&assets[attrs.src]){const v={...assets[attrs.src],className:attrs.className};for(const id of anc.slice(-2))maps[name][id]=v;}
 }
 for(const [k,v] of Object.entries(n)){if(k==='loc'||k==='start'||k==='end')continue;if(Array.isArray(v))v.forEach(x=>walk(x,anc));else if(v&&typeof v==='object')walk(v,anc);}
 }walk(ast);
}
const jobs=Object.values(manifests).flatMap(x=>Object.values(x));let done=0;
async function worker(){while(jobs.length){const a=jobs.shift();const dest='public'+a.path;if(!fs.existsSync(dest)){execFileSync('curl',['-fsSL','--retry','2',a.url,'-o',dest]);}if(dest.endsWith('.png')){const out=dest.replace('.png','.webp');await sharp(dest).resize({width:1800,withoutEnlargement:true}).webp({quality:88}).toFile(out);fs.unlinkSync(dest);}done++;}}
await Promise.all(Array.from({length:4},worker));
function local(a){return a.path.replace('.png','.webp');}
fs.writeFileSync('src/content/assets.json',JSON.stringify(Object.fromEntries(Object.entries(manifests).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([a,b])=>[a,local(b)]))])),null,2));
for(const [name,map]of Object.entries(maps)){const path='design-reference/'+name+'.json';if(!fs.existsSync(path))continue;const tree=JSON.parse(fs.readFileSync(path));function enrich(n){if(n.image&&map[n.id]){n.src=local(map[n.id]);n.crop=map[n.id].className;}n.children?.forEach(enrich);}enrich(tree);fs.writeFileSync('src/content/'+name+'.json',JSON.stringify(tree,null,2));}
fs.writeFileSync('design-reference/image-map.json',JSON.stringify(maps,null,2));console.log('Imported',done,'design assets');
