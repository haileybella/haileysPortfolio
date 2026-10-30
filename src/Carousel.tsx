import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {assets,projects} from './data';

const HOLD = 500;
const TRAVEL = 1500;
const STEP = HOLD + TRAVEL;
const cards = [0,1,2,0,1,2];

export default function Carousel(){
 const stage=useRef<HTMLDivElement>(null);
 const pausedRef=useRef(false);
 const [paused,setPaused]=useState(false);
 const [selection,setSelection]=useState(0);
 const [moving,setMoving]=useState(false);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,elapsed=0,last=performance.now(),previousSlot=-1,previousMoving=false;
  const draw=(now:number)=>{
   if(!pausedRef.current&&!reduced.matches&&!document.hidden) elapsed+=Math.min(now-last,100);
   last=now;
   const step=Math.floor(elapsed/STEP);
   const within=elapsed%STEP;
   const movingNow=within>=HOLD;
   const progress=movingNow?(within-HOLD)/TRAVEL:0;
   const ease=progress*progress*(3-2*progress);
   const slot=step%cards.length;
   if(slot!==previousSlot){setSelection(cards[slot]);previousSlot=slot;}
   if(movingNow!==previousMoving){setMoving(movingNow);previousMoving=movingNow;}
   stage.current?.querySelectorAll<HTMLElement>('.orbit-card').forEach((el,i)=>{
    const angle=(i-step-ease)*Math.PI/3;
    const depth=(Math.cos(angle)+1)/2;
    const scale=.56+.44*depth;
    const x=650*Math.sin(angle);
    const y=-32*(1-depth);
    el.style.transform=`translate(${x}px,${y}px) rotate(${8*Math.sin(angle)}deg) scale(${scale*(.62+.38*Math.abs(Math.cos(angle)))},${scale})`;
    el.style.opacity=depth<.26?'0':String(.32+.68*depth);
    el.style.zIndex=String(Math.round(depth*10)+1);
    const active=i===slot&&!movingNow;
    el.style.pointerEvents=active?'auto':'none';
    el.tabIndex=active?0:-1;
    el.setAttribute('aria-hidden',String(!active));
    el.dataset.centered=String(active);
   });
   frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);
  return()=>cancelAnimationFrame(frame);
 },[]);
 function toggle(){pausedRef.current=!pausedRef.current;setPaused(pausedRef.current);}
 return <><div className="carousel-viewport"><div ref={stage} className="carousel-stage"><img className="mac" src={assets.projects.imgImage28} alt=""/>{cards.map((index,i)=>{
  const p=projects[index];
  return <Link key={i} className="orbit-card" data-motion={i===0?'35:59':String(i)} to={'/projects/'+p.slug} aria-label={`Open ${p.title} case study`} tabIndex={i===0?0:-1} style={{left:375,top:77,width:524,height:283,opacity:i===0?1:0,transformOrigin:'center',zIndex:i===0?11:1}}><img src={p.cover} alt={p.title}/></Link>;
 })}</div></div><div className="carousel-controls"><button className="text-button" onClick={toggle}>{paused?'Play carousel':'Pause carousel'}</button><span>{paused?'Carousel paused':moving?'Next project…':'Click the screen to explore'}</span><Link to={'/projects/'+projects[selection].slug}>Explore {projects[selection].title}</Link></div></>;
}
