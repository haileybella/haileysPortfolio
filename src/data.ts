import assets from './content/assets.json';
import museum from './content/museum.json';
import blueprint from './content/blueprint.json';
import trailwatch from './content/trailwatch.json';
import rowdyhacks from './content/rowdyhacks.json';
import weTeach from './content/we-teach.json';
import stanford from './content/stanford.json';
import aera from './content/aera.json';
import cturc from './content/cturc.json';
import nsf from './content/nsf.json';
import retreat from './content/retreat.json';
import kode from './content/kode.json';
export {assets};
export type StoryNode={id:string;name:string;w:number;h:number;text?:string;size?:number;font?:{family:string;style:string};link?:{type:string;value:string}|null;image?:boolean;cover?:boolean;src?:string;crop?:string;layout?:string;children?:StoryNode[]};
export const projects=[
 {slug:'museum',title:'Museum App & Website',summary:'An eight-week UX project exploring exhibition discovery and visit planning across an app and responsive website.',cta:'Read the case study',cover:assets.projects.imgGalleryMuseumAppWebsite,tree:museum as StoryNode},
 {slug:'blueprint',title:'BluePrint',summary:'A working hackathon project that helps learners discover ideas, build a plan, and keep making—with AI guidance along the way.',cta:'Explore the build',cover:assets.projects.imgGalleryBluePrint,tree:blueprint as StoryNode},
 {slug:'trailwatch',title:'TrailWatch',summary:'A personal mobile UI exploration inspired by getting outdoors and noticing changes along local trails.',cta:'See the exploration',cover:'/assets/trail-cover.webp',tree:trailwatch as StoryNode}
];
export const events=[
 {slug:'rowdyhacks',title:'RowdyHacks XII',date:'October 1–4, 2026',type:'Hackathon',tree:rowdyhacks as StoryNode},
 {slug:'we-teach',title:'We_Teach CS Summit',date:'June 15–16, 2026',type:'Conference',tree:weTeach as StoryNode},
 {slug:'stanford',title:'Stanford Young Scientist Institute',date:'May 25–30, 2026',type:'Program',tree:stanford as StoryNode},
 {slug:'aera',title:'AERA 2026',date:'April 8–12, 2026',type:'Conference',tree:aera as StoryNode},
 {slug:'cturc',title:'CTURC Conference 2026',date:'March 28, 2026',type:'Conference',tree:cturc as StoryNode},
 {slug:'nsf',title:'NSF AI Spring School 2026',date:'February 23–25, 2026',type:'Conference',tree:nsf as StoryNode},
 {slug:'retreat',title:'Three-Day Scholar Retreat – UTSA Honors College',date:'July 28–30, 2025',type:'Leadership',tree:retreat as StoryNode},
 {slug:'kode',title:'Kode with Klossy Data Science Camp',date:'June 2–13, 2025',type:'Program',tree:kode as StoryNode}
];
export const socials=[['Figma','https://www.figma.com/@haileymbella'],['GitHub','https://github.com/haileybella'],['LinkedIn','https://www.linkedin.com/in/haileymuniz']];
export const stampImages:Record<string,string>={Hackathon:assets.events.imgGroup,Conference:assets.events.imgGroup1,Program:assets.events.imgGroup2,Leadership:assets.events.imgGroup3};
export const storyLinks:Record<string,string>={'108:121':'https://rowdy-hacks-xii.devpost.com/','108:122':'https://github.com/William-Chen07/Blueprint','108:123':'https://devpost.com/software/blueprint-t06bg5','108:407':'https://www.youtube.com/watch?v=dzJ2XNWp56o&t=1s','108:1050':'https://bit.ly/44oSGEk','108:1051':'https://lnkd.in/dsHM5KcD'};
export function texts(n:StoryNode):string[]{return n.text?[n.text]:(n.children??[]).flatMap(texts)}
export function images(n:StoryNode):StoryNode[]{return n.src?[n]:(n.children??[]).flatMap(images)}
