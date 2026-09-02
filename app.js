const systems = {
  ENGINE: {
    status: 'NOMINAL',
    copy: 'Powertrain overview. Intended home for live OBD-II RPM, coolant temperature, throttle position and calculated load.'
  },
  DRIVELINE: {
    status: '2WD HIGH',
    copy: 'Transmission, transfer case and axle display. Most values can remain decorative until a useful sensor source exists.'
  },
  CABIN: {
    status: 'LINKED',
    copy: 'Bluetooth audio, phone transport controls and cabin-interface status live here.'
  },
  CARGO: {
    status: 'SECURE',
    copy: 'Cargo and rear-body subsystem. A good home for deliberately theatrical vehicle-status animations.'
  }
};

const list = document.querySelector('#system-list');
for (const [name, data] of Object.entries(systems)) {
  const row = document.createElement('li');
  row.innerHTML = `<span>${name}</span><b>${data.status}</b>`;
  list.append(row);
}

const title = document.querySelector('#detail-title');
const status = document.querySelector('#detail-status');
const copy = document.querySelector('#detail-copy');
const bars = document.querySelector('#detail-bars');

for (let i = 0; i < 8; i++) bars.append(document.createElement('i'));

document.querySelectorAll('.hotspot').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.hotspot').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const name = button.dataset.system;
    title.textContent = name;
    status.textContent = systems[name].status;
    copy.textContent = systems[name].copy;
  });
});

function updateClock() {
  const now = new Date();
  document.querySelector('#clock').textContent = now.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}

function idleTelemetry() {
  const t = performance.now() / 1000;
  document.querySelector('#rpm').textContent = String(Math.round(825 + Math.sin(t * .8) * 18)).padStart(4, '0');
  document.querySelector('#voltage').textContent = `${(13.8 + Math.sin(t * .31) * .08).toFixed(1)}V`;
}

updateClock();
setInterval(updateClock, 1000);
(function animate() { idleTelemetry(); requestAnimationFrame(animate); })();
