const systems = {
  'OBSERVATION LOUNGE': ['CABIN', 'PRIMARY OCCUPANT COMPARTMENT // ENVIRONMENT NOMINAL'],
  'LATERAL SENSOR ARRAY': ['BODY', 'DOOR / SIDE APERTURE ARRAY // PASSIVE'],
  'FORWARD SHIELD GRID': ['GLASS', 'WINDSHIELD ASSEMBLY // STRUCTURAL INTEGRITY NOMINAL'],
  'PRECIPITATION DEFLECTOR': ['WIPERS', 'FORWARD WIPER SYSTEM // STANDBY'],
  'FUSION GENERATOR': ['DRIVELINE', 'VG33E POWERPLANT / TRANSMISSION PATH // ONLINE'],
  'BUSSARD HOODSCOOP': ['INTAKE', 'FORWARD AIR INDUCTION PATH // NOMINAL'],
  'FORWARD PHOTON EMITTER': ['ENGINE', 'HEADLAMP / ENGINE BAY SYSTEMS // ONLINE'],
  'CARGO BAY': ['CARGO', 'AFT STORAGE COMPARTMENT // SECURE']
};

const title = document.querySelector('#detail-title');
const copy = document.querySelector('#detail-copy');
const kicker = document.querySelector('#detail-kicker');
const allInteractive = [...document.querySelectorAll('[data-system]')];

function selectSystem(name) {
  const system = systems[name] || [name, 'SYSTEM RESPONSE // NOMINAL'];
  allInteractive.forEach(el => el.classList.toggle('active', el.dataset.system === name));
  kicker.textContent = 'SYSTEM SELECT';
  title.textContent = system[0];
  copy.textContent = system[1];
}

allInteractive.forEach(el => {
  el.addEventListener('click', () => selectSystem(el.dataset.system));
});

const activity = document.querySelector('#activity');
for (let i = 0; i < 6; i++) activity.append(document.createElement('i'));

function updateClock() {
  const now = new Date();
  document.querySelector('#clock').textContent = now.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}

function idleTelemetry() {
  const t = performance.now() / 1000;
  document.querySelector('#rpm').textContent = String(Math.round(825 + Math.sin(t * .75) * 16)).padStart(4, '0');
  document.querySelector('#voltage').textContent = `${(13.8 + Math.sin(t * .29) * .08).toFixed(1)}V`;
  [...activity.children].forEach((bar, i) => {
    const pulse = 42 + 30 * Math.sin(t * (.35 + i * .035) + i * .9);
    bar.style.opacity = String(.42 + (pulse / 100) * .55);
  });
}

updateClock();
setInterval(updateClock, 1000);
(function animate() {
  idleTelemetry();
  requestAnimationFrame(animate);
})();
