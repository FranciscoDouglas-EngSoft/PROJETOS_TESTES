export function renderForm(form, inputs){
  form.innerHTML = inputs.map(field=>{
    const id = `f_${field.name}`;
    const attrs = [];
    if(field.min!=null) attrs.push(`min="${field.min}"`);
    if(field.max!=null) attrs.push(`max="${field.max}"`);
    if(field.step!=null) attrs.push(`step="${field.step}"`);
    if(field.placeholder) attrs.push(`placeholder="${field.placeholder}"`);
    const base = `<div class="form-field"><label for="${id}">${field.label}</label>`;
    let inputHtml = '';
    if(field.type==='select'){
      inputHtml = `<select id="${id}" name="${field.name}">${field.options.map(o=>`<option value="${o.value}">${o.label}</option>`).join('')}</select>`;
    }else{
      const t = field.type||'number';
      inputHtml = `<input id="${id}" name="${field.name}" type="${t}" ${attrs.join(' ')} />`;
    }
    return `${base}${inputHtml}</div>`;
  }).join('') + `<div><button class="btn" type="submit">Calcular</button></div>`;
}

export function readFormValues(form){
  const data = new FormData(form);
  const out = {};
  for(const [k,v] of data.entries()){
    const el = form.querySelector(`[name="${k}"]`);
    if(el && (el.type==='number' || el.type==='range')){
      out[k] = v===''? NaN : Number(v);
    } else if(el && el.tagName==='SELECT'){
      out[k] = isFinite(+v) && v!=='' ? Number(v) : v;
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function renderResult(box, payload){
  if(payload.error){
    box.innerHTML = `<p style="color:#ef4444">${payload.error}</p>`;
    return;
  }
  const lines = [];
  if(payload.steps && payload.steps.length){
    lines.push('<div class="katex-block">Passos:</div>');
    lines.push('<ol>');
    for(const s of payload.steps){ lines.push(`<li>${s}</li>`); }
    lines.push('</ol>');
  }
  if(payload.result!=null){
    lines.push(`<p><strong>Resultado:</strong> ${payload.result}</p>`);
  }
  if(payload.extra){
    lines.push(`<div class="katex-block">${payload.extra}</div>`);
  }
  box.innerHTML = lines.join('');
}
