// Registro de calculadoras
// Cada calculadora possui: id, name, summary, category, inputs[], calculate(values)

export const registry = [
  // Álgebra
  {
    id:'bhaskara',
    name:'Bhaskara (Equação do 2º grau)',
    summary:'Resolve ax² + bx + c = 0, discriminante Δ e raízes reais/complexas.',
    category:'algebra',
    inputs:[
      { name:'a', label:'a', type:'number', step:'any', placeholder:'Coeficiente a' },
      { name:'b', label:'b', type:'number', step:'any', placeholder:'Coeficiente b' },
      { name:'c', label:'c', type:'number', step:'any', placeholder:'Coeficiente c' },
    ],
    calculate({a,b,c}){
      if([a,b,c].some(v=>isNaN(v))) throw new Error('Informe valores numéricos para a, b e c.');
      if(a===0) throw new Error('a não pode ser 0 em uma equação do 2º grau.');
      const delta = b*b - 4*a*c;
      const steps = [
        `Δ = b² - 4ac = (${b})² - 4·(${a})·(${c}) = ${delta}`,
      ];
      let result;
      if(delta > 0){
        const x1 = (-b + Math.sqrt(delta))/(2*a);
        const x2 = (-b - Math.sqrt(delta))/(2*a);
        steps.push(`x₁ = (-b + √Δ) / (2a) = ${x1}`);
        steps.push(`x₂ = (-b - √Δ) / (2a) = ${x2}`);
        result = `x₁ = ${x1}, x₂ = ${x2}`;
      } else if(delta === 0){
        const x = -b/(2*a);
        steps.push(`x = -b / (2a) = ${x}`);
        result = `x = ${x}`;
      } else {
        const real = (-b)/(2*a);
        const imag = Math.sqrt(-delta)/(2*a);
        result = `x₁ = ${real} + ${imag}i, x₂ = ${real} - ${imag}i`;
        steps.push('Raízes complexas (Δ < 0).');
      }
      return { result, steps };
    }
  },
  {
    id:'sistema2x2',
    name:'Sistema linear 2x2',
    summary:'Resolve sistema 2x2 por eliminação (ax+by=c; dx+ey=f).',
    category:'algebra',
    inputs:[
      { name:'a', label:'a', type:'number', step:'any' },
      { name:'b', label:'b', type:'number', step:'any' },
      { name:'c', label:'c', type:'number', step:'any' },
      { name:'d', label:'d', type:'number', step:'any' },
      { name:'e', label:'e', type:'number', step:'any' },
      { name:'f', label:'f', type:'number', step:'any' },
    ],
    calculate({a,b,c,d,e,f}){
      const vals = [a,b,c,d,e,f].map(Number);
      if(vals.some(v=>isNaN(v))) throw new Error('Informe valores numéricos.');
      const D = a*e - b*d;
      if(D===0) throw new Error('Sistema indeterminado ou impossível (determinante 0).');
      const Dx = c*e - b*f;
      const Dy = a*f - c*d;
      const x = Dx/D; const y = Dy/D;
      const steps = [
        `D = ae - bd = ${D}`,
        `Dx = ce - bf = ${Dx}`,
        `Dy = af - cd = ${Dy}`,
        `x = Dx/D = ${x}`,
        `y = Dy/D = ${y}`,
      ];
      return { result:`x = ${x}, y = ${y}`, steps };
    }
  },
  {
    id:'pa',
    name:'Progressão Aritmética (PA)',
    summary:'Termo geral, soma dos n termos e enésimo termo.',
    category:'algebra',
    inputs:[
      { name:'a1', label:'a₁ (primeiro termo)', type:'number', step:'any' },
      { name:'r', label:'r (razão)', type:'number', step:'any' },
      { name:'n', label:'n (número de termos)', type:'number', min:1, step:1 },
    ],
    calculate({a1,r,n}){
      if([a1,r,n].some(v=>isNaN(v))) throw new Error('Informe a₁, r e n.');
      if(n<1) throw new Error('n deve ser ≥ 1.');
      const an = a1 + (n-1)*r;
      const Sn = (n*(a1+an))/2;
      const steps = [
        `aₙ = a₁ + (n-1)·r = ${an}`,
        `Sₙ = n(a₁ + aₙ)/2 = ${Sn}`,
      ];
      return { result:`aₙ = ${an}, Sₙ = ${Sn}`, steps };
    }
  },
  {
    id:'pg',
    name:'Progressão Geométrica (PG)',
    summary:'Termo geral e soma dos n termos (q≠1).',
    category:'algebra',
    inputs:[
      { name:'a1', label:'a₁ (primeiro termo)', type:'number', step:'any' },
      { name:'q', label:'q (razão)', type:'number', step:'any' },
      { name:'n', label:'n (número de termos)', type:'number', min:1, step:1 },
    ],
    calculate({a1,q,n}){
      if([a1,q,n].some(v=>isNaN(v))) throw new Error('Informe a₁, q e n.');
      if(n<1) throw new Error('n deve ser ≥ 1.');
      const an = a1*Math.pow(q, n-1);
      let Sn;
      if(q===1){ Sn = a1*n; }
      else { Sn = a1*(Math.pow(q,n)-1)/(q-1); }
      const steps = [
        `aₙ = a₁·qⁿ⁻¹ = ${an}`,
        `Sₙ = a₁ (qⁿ - 1) / (q - 1) = ${Sn}`,
      ];
      return { result:`aₙ = ${an}, Sₙ = ${Sn}`, steps };
    }
  },

  // Geometria
  {
    id:'pitagoras',
    name:'Teorema de Pitágoras',
    summary:'Calcula cateto/hipotenusa em triângulo retângulo.',
    category:'geometria',
    inputs:[
      { name:'a', label:'Cateto a', type:'number', step:'any' },
      { name:'b', label:'Cateto b', type:'number', step:'any' },
      { name:'c', label:'Hipotenusa c (deixe em branco para calcular)', type:'number', step:'any' },
    ],
    calculate({a,b,c}){
      a = Number(a); b = Number(b); c = Number(c);
      const known = [!isNaN(a), !isNaN(b), !isNaN(c)].filter(Boolean).length;
      if(known < 2) throw new Error('Informe pelo menos dois lados.');
      let result, steps=[];
      if(isNaN(c)){
        const hip = Math.sqrt(a*a + b*b);
        steps.push(`c = √(a² + b²) = ${hip}`);
        result = `c = ${hip}`;
      } else if (isNaN(a)){
        const ca = Math.sqrt(c*c - b*b);
        steps.push(`a = √(c² - b²) = ${ca}`);
        result = `a = ${ca}`;
      } else if (isNaN(b)){
        const cb = Math.sqrt(c*c - a*a);
        steps.push(`b = √(c² - a²) = ${cb}`);
        result = `b = ${cb}`;
      } else {
        const ok = Math.abs(c*c - (a*a+b*b)) < 1e-9;
        result = ok ? 'O triângulo satisfaz Pitágoras.' : 'Os valores não satisfazem Pitágoras.';
      }
      return { result, steps };
    }
  },
  {
    id:'area-circulo',
    name:'Área do círculo',
    summary:'Calcula área do círculo a partir do raio.',
    category:'geometria',
    inputs:[ { name:'r', label:'Raio (r)', type:'number', step:'any', min:0 } ],
    calculate({r}){
      if(isNaN(r) || r<0) throw new Error('Informe um raio válido (r ≥ 0).');
      const A = Math.PI*r*r;
      return { result:`A = ${A.toFixed(4)}`, steps:[`A = π·r² = ${A}`] };
    }
  },
  {
    id:'area-triangulo',
    name:'Área do triângulo',
    summary:'Calcula área pela fórmula A = (b·h)/2.',
    category:'geometria',
    inputs:[ { name:'b', label:'Base (b)', type:'number', step:'any', min:0 }, { name:'h', label:'Altura (h)', type:'number', step:'any', min:0 } ],
    calculate({b,h}){
      if([b,h].some(v=>isNaN(v)||v<0)) throw new Error('Informe b e h válidos (≥ 0).');
      const A = (b*h)/2; return { result:`A = ${A}`, steps:[`A = (b·h)/2 = ${A}`] };
    }
  },
  {
    id:'area-retangulo',
    name:'Área do retângulo',
    summary:'A = b·h (base x altura).',
    category:'geometria',
    inputs:[ { name:'b', label:'Base (b)', type:'number', step:'any', min:0 }, { name:'h', label:'Altura (h)', type:'number', step:'any', min:0 } ],
    calculate({b,h}){
      if([b,h].some(v=>isNaN(v)||v<0)) throw new Error('Informe b e h válidos (≥ 0).');
      const A = b*h; return { result:`A = ${A}`, steps:[`A = b·h = ${A}`] };
    }
  },

  // Trigonometria
  {
    id:'graus-radianos',
    name:'Conversor graus ↔ radianos',
    summary:'Converte entre graus e radianos.',
    category:'trigonometria',
    inputs:[
      { name:'valor', label:'Valor', type:'number', step:'any' },
      { name:'modo', label:'Modo', type:'select', options:[
        {label:'Graus → Radianos', value:'g2r'},
        {label:'Radianos → Graus', value:'r2g'}
      ]}
    ],
    calculate({valor,modo}){
      if(isNaN(valor)) throw new Error('Informe um valor.');
      if(modo==='g2r'){
        const rad = (valor*Math.PI)/180;
        return { result:`${rad}`, steps:[`${valor}° × π/180 = ${rad}`] };
      } else {
        const deg = (valor*180)/Math.PI;
        return { result:`${deg}`, steps:[`${valor} rad × 180/π = ${deg}`] };
      }
    }
  },

  // Estatística
  {
    id:'media-mediana-moda',
    name:'Média, Mediana e Moda',
    summary:'Calcula medidas de tendência central da amostra.',
    category:'estatistica',
    inputs:[ { name:'lista', label:'Lista (separe por vírgula)', type:'text', placeholder:'ex: 1, 2, 2, 3, 10' } ],
    calculate({lista}){
      const arr = (lista||'').split(',').map(s=>Number(s.trim())).filter(v=>!isNaN(v));
      if(!arr.length) throw new Error('Informe uma lista de números.');
      const n = arr.length;
      const media = arr.reduce((a,b)=>a+b,0)/n;
      const ord = [...arr].sort((a,b)=>a-b);
      const mediana = n%2? ord[(n-1)/2] : (ord[n/2-1]+ord[n/2])/2;
      const freq = new Map(); ord.forEach(v=>freq.set(v,(freq.get(v)||0)+1));
      const maxF = Math.max(...freq.values());
      const moda = [...freq.entries()].filter(([,f])=>f===maxF).map(([v])=>v).join(', ');
      const steps = [
        `n = ${n}`,
        `média = ${media}`,
        `mediana = ${mediana}`,
        `moda = ${moda}`
      ];
      return { result:`média = ${media}, mediana = ${mediana}, moda = ${moda}`, steps };
    }
  },
  {
    id:'desvio-padrao',
    name:'Desvio padrão (população e amostra)',
    summary:'Calcula σ (pop) e s (amostral).',
    category:'estatistica',
    inputs:[ { name:'lista', label:'Lista (separe por vírgula)', type:'text', placeholder:'ex: 5, 7, 7, 9' } ],
    calculate({lista}){
      const x = (lista||'').split(',').map(s=>Number(s.trim())).filter(v=>!isNaN(v));
      if(!x.length) throw new Error('Informe uma lista de números.');
      const n = x.length; const media = x.reduce((a,b)=>a+b,0)/n;
      const variPop = x.reduce((s,v)=>s+(v-media)**2,0)/n;
      const variAmo = x.reduce((s,v)=>s+(v-media)**2,0)/(n-1);
      const sigma = Math.sqrt(variPop);
      const s = Math.sqrt(variAmo);
      return { result:`σ = ${sigma}, s = ${s}`, steps:[`média = ${media}`, `σ² = ${variPop}`, `s² = ${variAmo}`] };
    }
  },

  // Combinatória e Probabilidade
  {
    id:'permutacao',
    name:'Permutação (Pₙ)',
    summary:'Pₙ = n! (n fatorial).',
    category:'combinatoria',
    inputs:[ { name:'n', label:'n', type:'number', min:0, step:1 } ],
    calculate({n}){
      if(isNaN(n) || n<0) throw new Error('n deve ser inteiro ≥ 0.');
      n = Math.floor(n);
      const fact = (k)=> k<=1?1:k*fact(k-1);
      const P = fact(n);
      return { result:`Pₙ = ${P}`, steps:[`n! = ${P}`] };
    }
  },
  {
    id:'arranjo',
    name:'Arranjo (Aₙᵖ)',
    summary:'Aₙᵖ = n!/(n-p)!',
    category:'combinatoria',
    inputs:[ { name:'n', label:'n', type:'number', min:0, step:1 }, {name:'p', label:'p', type:'number', min:0, step:1} ],
    calculate({n,p}){
      n = Number(n); p = Number(p);
      if([n,p].some(v=>isNaN(v))) throw new Error('Informe n e p.');
      if(n<0||p<0||p>n) throw new Error('Respeite 0 ≤ p ≤ n.');
      const fact = (k)=> k<=1?1:k*fact(k-1);
      const A = fact(n)/fact(n-p);
      return { result:`Aₙᵖ = ${A}`, steps:[`n!/(n-p)! = ${A}`] };
    }
  },
  {
    id:'combinacao',
    name:'Combinação (Cₙᵖ)',
    summary:'Cₙᵖ = n!/(p!(n-p)!)',
    category:'combinatoria',
    inputs:[ { name:'n', label:'n', type:'number', min:0, step:1 }, {name:'p', label:'p', type:'number', min:0, step:1} ],
    calculate({n,p}){
      n = Number(n); p = Number(p);
      if([n,p].some(v=>isNaN(v))) throw new Error('Informe n e p.');
      if(n<0||p<0||p>n) throw new Error('Respeite 0 ≤ p ≤ n.');
      const fact = (k)=> k<=1?1:k*fact(k-1);
      const C = fact(n)/(fact(p)*fact(n-p));
      return { result:`Cₙᵖ = ${C}`, steps:[`n!/(p!(n-p)!) = ${C}`] };
    }
  },
  {
    id:'prob-simples',
    name:'Probabilidade simples',
    summary:'P(E) = casos favoráveis / casos possíveis.',
    category:'probabilidade',
    inputs:[ { name:'favo', label:'Casos favoráveis', type:'number', min:0, step:1 }, { name:'poss', label:'Casos possíveis', type:'number', min:1, step:1 } ],
    calculate({favo,poss}){
      favo = Number(favo); poss = Number(poss);
      if([favo,poss].some(v=>isNaN(v)) || poss<=0) throw new Error('Informe valores válidos.');
      const P = favo/poss;
      return { result:`P(E) = ${P}`, steps:[`favo/poss = ${P}`] };
    }
  },

  // Finanças e Porcentagem
  {
    id:'juros-simples',
    name:'Juros simples',
    summary:'J = P·i·t, M = P + J.',
    category:'financas',
    inputs:[
      { name:'P', label:'Capital (P)', type:'number', step:'any', min:0 },
      { name:'i', label:'Taxa i (em %)', type:'number', step:'any', min:0 },
      { name:'t', label:'Tempo (t)', type:'number', step:'any', min:0 },
    ],
    calculate({P,i,t}){
      [P,i,t] = [P,i,t].map(Number);
      if([P,i,t].some(v=>isNaN(v)||v<0)) throw new Error('Informe P, i e t válidos (≥ 0).');
      const J = P*(i/100)*t; const M = P+J;
      return { result:`J = ${J}, M = ${M}`, steps:[`J = P·i·t = ${J}`, `M = P + J = ${M}`] };
    }
  },
  {
    id:'juros-compostos',
    name:'Juros compostos',
    summary:'M = P·(1+i)^t; J = M - P.',
    category:'financas',
    inputs:[
      { name:'P', label:'Capital (P)', type:'number', step:'any', min:0 },
      { name:'i', label:'Taxa i (em %)', type:'number', step:'any', min:0 },
      { name:'t', label:'Tempo (t)', type:'number', step:'any', min:0 },
    ],
    calculate({P,i,t}){
      [P,i,t] = [P,i,t].map(Number);
      if([P,i,t].some(v=>isNaN(v)||v<0)) throw new Error('Informe P, i e t válidos (≥ 0).');
      const M = P*Math.pow(1+(i/100), t); const J = M-P;
      return { result:`M = ${M}, J = ${J}`, steps:[`M = P·(1+i)^t = ${M}`, `J = M - P = ${J}`] };
    }
  },
  {
    id:'porcentagem',
    name:'Porcentagem e regra de três',
    summary:'Calcula X% de Y e faz regra de três simples.',
    category:'financas',
    inputs:[
      { name:'x', label:'X (%)', type:'number', step:'any' },
      { name:'y', label:'Y (valor)', type:'number', step:'any' },
    ],
    calculate({x,y}){
      [x,y] = [x,y].map(Number);
      if([x,y].some(v=>isNaN(v))) throw new Error('Informe X e Y numéricos.');
      const v = (x/100)*y;
      return { result:`${x}% de ${y} = ${v}`, steps:[`${x}/100 × ${y} = ${v}`] };
    }
  },
];
