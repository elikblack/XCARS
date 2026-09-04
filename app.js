const systems = {
  'CARGO BAY': ['CARGO', 'AFT STORAGE COMPARTMENT // SECURE'],
  'AFT SENSOR ARRAY': ['SENSORS', 'REARWARD OBSERVATION ARRAY // PASSIVE'],
  'GUEST QUARTERS': ['CABIN', 'PRIMARY OCCUPANT COMPARTMENT // NOMINAL'],
  'ESCAPE PODS': ['RECOVERY', 'EMERGENCY EGRESS / RECOVERY SYSTEM // STANDBY'],
  'SICKBAY': ['MEDICAL', 'FIELD TRIAGE MODULE // READY'],
  'AFT NAVIGATIONAL DEFLECTOR': ['AFT NAV', 'REAR DEFLECTION ASSEMBLY // STABLE'],
  'SECONDARY INERTIAL DAMPER': ['SUSPENSION', 'REAR DAMPING FIELD // NOMINAL'],
  'OBSERVATION LOUNGE': ['ROOF', 'ELEVATED EXTERNAL VIEWING PLATFORM // ACTIVE'],
  'PRIMARY SENSOR ARRAY': ['MIRROR', 'LATERAL SENSOR CLUSTER // TRACKING'],
  'FORWARD SHIELD GRID': ['GLASS', 'WINDSHIELD ASSEMBLY // NOMINAL'],
  'PRECIPITATION COMPENSATOR': ['WIPERS', 'FORWARD PRECIPITATION CONTROL // STANDBY'],
  'FUSION GENERATOR': ['ENGINE', 'VG33E POWERPLANT // ONLINE'],
  'BUSSARD HOODSCOOP': ['HOOD', 'FORWARD INTAKE COWL // NOMINAL'],
  'FORWARD PHOTON EMITTER': ['HEADLAMPS', 'FORWARD LIGHT EMISSION ARRAY // ONLINE'],
  'NAVIGATIONAL DEFLECTOR': ['FRONT CLIP', 'FORWARD NAV DEFLECTION SYSTEM // READY'],
  'INERTIAL DAMPER': ['FRONT SUSPENSION', 'PRIMARY DAMPING FIELD // NOMINAL']
};

/* Keep the line corner logic explicit. Position and length stay in callouts.css
   so both sides share the same visual rules while remaining easy to tune. */
document.querySelectorAll('.callouts-left button').forEach((button, i) => {
  const dirs = ['down', 'down', 'flat', 'flat', 'flat', 'flat', 'down'];
  button.dataset.dir = dirs[i];
});

document.querySelectorAll('.callouts-right button').forEach((button, i) => {
  const dirs = ['down', 'down', 'down', 'down', 'down', 'down', 'flat', 'flat', 'flat'];
  button.dataset.dir = dirs[i];
});

const title = document.querySelector('#detail-title');
const copy = document.querySelector('#detail-copy');
const kicker = document.querySelector('#detail-kicker');
const allInteractive = [...document.querySelectorAll('[data-system]')];

function selectSystem(name) {
  const system = systems[name] || [name, 'SYSTEM RESPONSE // NOMINAL'];
  allInteractive.forEach(el => el.classList.toggle('active', el.dataset.system === name));

  if (kicker) kicker.textContent = 'SYSTEM SELECT';
  if (title) title.textContent = system[0];
  if (copy) copy.textContent = system[1];
}

allInteractive.forEach(el => {
  el.addEventListener('click', () => selectSystem(el.dataset.system));
});

const activity = document.querySelector('#activity');
if (activity) {
  for (let i = 0; i < 6; i++) activity.append(document.createElement('i'));
}

function updateClock() {
  const clock = document.querySelector('#clock');
  if (!clock) return;

  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}

function idleTelemetry() {
  const t = performance.now() / 1000;
  const rpm = document.querySelector('#rpm');
  const voltage = document.querySelector('#voltage');

  if (rpm) rpm.textContent = String(Math.round(825 + Math.sin(t * .75) * 16)).padStart(4, '0');
  if (voltage) voltage.textContent = `${(13.8 + Math.sin(t * .29) * .08).toFixed(1)}V`;

  if (activity) {
    [...activity.children].forEach((bar, i) => {
      const pulse = 42 + 30 * Math.sin(t * (.35 + i * .035) + i * .9);
      bar.style.opacity = String(.42 + (pulse / 100) * .55);
    });
  }
}

updateClock();
setInterval(updateClock, 1000);
(function animate() {
  idleTelemetry();
  requestAnimationFrame(animate);
})();
