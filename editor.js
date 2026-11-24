const q=id=>document.getElementById(id),items=structuredClone(cases);
q('ko').value=brand.ko;q('en').value=brand.en;
items.forEach((c,i)=>q('choice').add(new Option(c.title,i)));
function edit(){const c=items[Number(q('choice').value)],root=q('entry');root.replaceChildren();
 for(const [key,title] of Object.entries({title:'사례명',type:'업종',size:'면적(평)',background:'의뢰 배경',question:'공간에서 풀어야 할 질문',layout:'배치 제안과 그 이유',mood:'브랜드 무드보드',alt:'공간 이미지 설명'})){
 const label=document.createElement('label');label.textContent=title;
 let input;if(key==='type'){input=document.createElement('select');['카페','음식점','소매점'].forEach(x=>input.add(new Option(x,x)))}else{input=document.createElement(['background','question','layout','mood'].includes(key)?'textarea':'input');if(key==='size'){input.type='number';input.min='0.1';input.step='any'}}
 input.value=c[key];input.required=true;input.oninput=()=>{c[key]=key==='size'?Number(input.value):input.value};label.append(input);root.append(label)}}
q('choice').onchange=edit;edit();document.querySelector('form').onsubmit=e=>{e.preventDefault();const data='const brand='+JSON.stringify({ko:q('ko').value,en:q('en').value},null,2)+';\nconst cases='+JSON.stringify(items,null,2)+';\n';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'text/javascript'}));a.download='content.js';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);document.querySelector('[role=status]').textContent='내려받은 content.js를 배포 소스에 반영해 주세요.'}
