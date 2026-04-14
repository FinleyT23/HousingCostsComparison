const rows = [
  { type:'on', name:'UW-W — Triple', unit:'Triple room', costMin:2203, costStr:'$2,203', utils:true, parking:'Campus', furnished:false, distance:'On campus' },
  { type:'on', name:'UW-W — Double', unit:'Double room', costMin:2515, costStr:'$2,515', utils:true, parking:'Campus', furnished:false, distance:'On campus' },
  { type:'off', name:'Wegner Apts', unit:'4 bed', costMin:2260, costStr:'$2,260', utils:true, parking:'Lot', furnished:true, distance:'1 block' },
  { type:'off', name:'Cambridge Apts', unit:'2 bed', costMin:2500, costStr:'$2,500', utils:true, parking:'Included', furnished:true, distance:'Walk' }
];

let currentFilter = 'all';

function getBand(min) {
  if (min < 2515) return 'cheaper';
  if (min <= 3397) return 'similar';
  return 'pricier';
}

function barHtml(min) {
  const pct = Math.min(100, Math.round((min / 5500) * 100));
  let cls = "mid-bar";
  if (min < 2515) cls = "low-bar";
  else if (min > 3397) cls = "high-bar";

  return `<div class="price-bar ${cls}" style="width:${pct}%"></div>`;
}

function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

function render() {
  const tbody = document.getElementById('table-body');
  let data = rows.filter(r => {
    if (currentFilter === 'on') return r.type === 'on';
    if (currentFilter === 'off') return r.type === 'off';
    return true;
  });

  tbody.innerHTML = data.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.unit}</td>
      <td class="cost ${getBand(r.costMin)}">${r.costStr}${barHtml(r.costMin)}</td>
      <td>${r.utils ? 'Yes' : 'No'}</td>
      <td>${r.parking}</td>
      <td>${r.furnished ? 'Yes' : 'No'}</td>
      <td>${r.distance}</td>
    </tr>
  `).join('');
}

render();
