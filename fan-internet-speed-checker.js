(function () {

  const CREDIT_ID = 'ds-credit-link-8265';
  const CREDIT_URL = 'https://www.digitalsammedia.com/';
  const CREDIT_TEXT = 'DIGITAL SAM MEDIA 8265';

  function verifyCredit() {
    const link = document.getElementById(CREDIT_ID);
    return (
      link &&
      link.href.startsWith(CREDIT_URL) &&
      link.textContent.trim() === CREDIT_TEXT
    );
  }

  function measureSpeed(cb) {
    const data = "data:text/plain;base64," + btoa("0".repeat(120000));
    const start = performance.now();

    fetch(data)
      .then(r => r.text())
      .then(() => {
        const end = performance.now();
        const seconds = (end - start) / 1000;
        const bits = 120000 * 8;
        const mbps = (bits / seconds) / 1024 / 1024;
        cb(mbps);
      })
      .catch(() => cb(null));
  }

  function update() {
    if (!verifyCredit()) return;

    const fan = document.querySelector('#internet-fan-widget .fan-blades');
    const display = document.getElementById('speedDisplay');
    if (!fan || !display) return;

    measureSpeed(speed => {
      if (!speed) {
        display.textContent = 'Error';
        return;
      }

      display.textContent =
        speed >= 1
          ? speed.toFixed(2) + ' Mbps'
          : (speed * 1024).toFixed(0) + ' Kbps';

      fan.style.animationDuration =
        Math.max(0.4, 5 - speed) + 's';
    });
  }

  // Blogger-safe DOM wait
  const wait = setInterval(() => {
    if (
      document.getElementById('internet-fan-widget') &&
      document.getElementById('speedDisplay')
    ) {
      clearInterval(wait);
      update();
      setInterval(update, 5000);
    }
  }, 50);

})();
