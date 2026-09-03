const systems = {
  'OBSERVATION LOUNGE': ['CABIN', 'PRIMARY OCCUPANT COMPARTMENT // ENVIRONMENT NOMINAL'],
  'LATERAL SENSOR ARRAY': ['BODY', 'DOOR / SIDE APERTURE ARRAY // PASSIVE'],
  'FORWARD SHIELD GRID': ['GLASS', 'WINDSHIELD ASSEMBLY // STRUCTURAL INTEGRITY NOMINAL'],
  'PRECIPITATION DEFLECTOR': ['WIPERS', 'FORWARD WIPER SYSTEM // STANDBY'],
  'FUSION GENERATOR': ['DRIVELINE', 'VG33E POWERPLANT / TRANSMISSION PATH // ONLINE'],
  'BUSSARD HOODSCOOP': ['INTAKE', 'FORWARD AIR INDUCTION PATH // NOMINAL'],
  'FORWARD PHOTON EMITTER': ['ENGINE', 'HEADLAMP / ENGINE BAY SYSTEMS // ONLINE'],
  'CARGO BAY': ['CARGO', 'AFT STORAGE COMPARTMENT // SECURE'],
  'ESCAPE PODS': ['RECOVERY', 'AFT TOW / RECOVERY POINTS // STANDBY']
};

/*
 * Hand-tuned MSD callout map.
 *
 * top   = label position within the right-side callout field
 * lead  = horizontal distance from the label dot to the bend
 * stem  = vertical distance from the bend to the vehicle feature
 * dir   = whether that feature is above or below the label
 * left  = optional departure from the common dot/label column
 *
 * The targets, in order:
 * roof rack, mirror, windshield, wipers, engine, hood, headlight,
 * bumper, then a deliberately non-specific underside recovery point.
 */
const calloutLayout = {
  'OBSERVATION LOUNGE':      { top: '1.5%',  lead: '41.5cqw', stem: '8.3cqh',  dir: 'down' },
  'LATERAL SENSOR ARRAY':    { top: '10.5%', lead: '34.8cqw', stem: '13.2cqh', dir: 'down' },
  'FORWARD SHIELD GRID':     { top: '19.0%', lead: '32.5cqw', stem: '1.9cqh',  dir: 'down' },
  'PRECIPITATION DEFLECTOR': { top: '35.2%', lead: '28.2cqw', stem: '1.1cqh',  dir: 'up' },
  'FUSION GENERATOR':        { top: '41.3%', lead: '25.0cqw', stem: '1.1cqh',  dir: 'down' },
  'BUSSARD HOODSCOOP':       { top: '48.4%', lead: '21.0cqw', stem: '8.3cqh',  dir: 'up' },
  'FORWARD PHOTON EMITTER':  { top: '60.8%', lead: '17.2cqw', stem: '10.0cqh', dir: 'up' },
  'CARGO BAY':               { top: '69.7%', lead: '15.0cqw', stem: '10.5cqh', dir: 'up' },
  'ESCAPE PODS':             { top: '89.4%', lead: '26.9cqw', stem: '10.2cqh', dir: 'up', left: '48%' }
};

const calloutButtons = [...document.querySelectorAll('.callouts [data-system]')];
calloutButtons.forEach(button => {
  const layout = calloutLayout[button.dataset.system];
  if (!layout) return;

  button.style.top = layout.top;
  button.style.setProperty('--lead', layout.lead);
  button.style.setProperty('--stem', layout.stem);
  button.dataset.leadDir = layout.dir;

  if (layout.left) button.style.left = layout.left;
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
