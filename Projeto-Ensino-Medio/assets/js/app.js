import { registry } from './registry.js';
import { renderForm, readFormValues, renderResult } from './ui.js';

const categoryNav = document.getElementById('category-nav');
const calcList = document.getElementById('calculator-list');
const panel = document.getElementById('calculator-panel');
const form = document.getElementById('calc-form');
const resultBox = document.getElementById('calc-result');
const title = document.getElementById('calc-title');
const subtitle = document.getElementById('calc-subtitle');
const backBtn = document.getElementById('back-to-list');
const search = document.getElementById('search');

let currentCalc = null;
let currentCategory = 'algebra';

function setActiveCategory(cat){
  currentCategory = cat;
  [...categoryNav.querySelectorAll('button')].forEach(b=>b.classList.toggle('active', b.dataset.cat===cat));
  renderList();
}

function renderCategories(){
  const cats = [...new Set(registry.map(c=>c.category))];
  categoryNav.innerHTML = cats.map(cat=>`<button data-cat="${cat}">${label(cat)}</button>`).join('');
  categoryNav.addEventListener('click',(e)=>{
    const btn = e.target.closest('button[data-cat]');
    if(!btn) return;
    setActiveCategory(btn.dataset.cat);
  });
  setActiveCategory(cats[0]||'algebra');
}

function label(cat){
  const map = { algebra:'Álgebra', geometria:'Geometria', trigonometria:'Trigonometria', estatistica:'Estatística', combinatoria:'Combinatória', probabilidade:'Probabilidade', financas:'Finanças' };
  return map[cat] || cat;
}

function renderList(){
  const q = (search.value||'').toLowerCase();
  const items = registry.filter(c=>c.category===currentCategory && (c.id.includes(q) || c.name.toLowerCase().includes(q)));
  calcList.innerHTML = items.map(c=>`
    <div class="calc-card">
      <h3>${c.name}</h3>
      <p>${c.summary}</p>
      <button class="btn" data-open="${c.id}">Abrir</button>
    </div>
  `).join('') || '<p>Nenhuma calculadora encontrada.</p>';
}

calcList.addEventListener('click',(e)=>{
  const btn = e.target.closest('button[data-open]');
  if(!btn) return;
  openCalc(btn.dataset.open);
});

function openCalc(id){
  const calc = registry.find(c=>c.id===id);
  if(!calc) return;
  currentCalc = calc;
  title.textContent = calc.name;
  subtitle.textContent = calc.summary;
  renderForm(form, calc.inputs);
  resultBox.hidden = true;
  panel.hidden = false;
  calcList.hidden = true;
}

backBtn.addEventListener('click',()=>{
  panel.hidden = true;
  calcList.hidden = false;
  resultBox.hidden = true;
  form.reset();
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(!currentCalc) return;
  const values = readFormValues(form);
  try{
    const output = currentCalc.calculate(values);
    renderResult(resultBox, output);
    resultBox.hidden = false;
  }catch(err){
    renderResult(resultBox, { error: err.message || String(err) });
    resultBox.hidden = false;
  }
});

search.addEventListener('input', ()=> renderList());

renderCategories();
