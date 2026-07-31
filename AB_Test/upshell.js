(function () {
  'use strict';

  // 1. CONFIGURATION
    //   Stores all upgrade rules in one place.
    //   Maps the selected plan to the recommended upgrade plan.
    //   Makes the script easy to maintain and extend.
  const UPGRADE_MAP = {
    'price-option-209': { // Medication Only
      targetTestId: 'price-option-1',   // Monthly Auto-Refill
      currentLabel: 'Medication Only',
      targetLabel: 'Monthly Auto-Refill'
    },
    'price-option-1': { // Monthly Auto-Refill
      targetTestId: 'price-option-221', // 3-Month Supply
      currentLabel: 'Monthly Auto-Refill',
      targetLabel: '3-Month Supply'
    }
  };

    //Avoids an infinite popup loop.
  let bypassIntercept = false;


  // 2. BUILD & SHOW THE POPUP
  
  function buildPopup(triggerTestId) {
    const config = UPGRADE_MAP[triggerTestId];
    if (!config) return;

    closePopup(); // Remove any existing popup before showing a new one

    const overlay = document.createElement('div');
    overlay.id = 'upsell-overlay';

    overlay.innerHTML = `
      <style>
        #upsell-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
          padding: 16px;
          box-sizing: border-box;
        }

        #upsell-card {
          background: #fff;
          border-radius: 14px;
          max-width: 420px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        }

        #upsell-card .upsell-tag {
          background: #111;
          color: #fff;
          padding: 10px;
          text-align: center;
          font-size: 13px;
        }

        #upsell-card .upsell-body {
          padding: 24px;
        }

        #upsell-card h2 {
          margin: 12px 0 6px;
          font-size: 20px;
          line-height: 1.3;
        }

        #upsell-card .upsell-highlight {
          color: #5a8f3c;
        }

        #upsell-card p {
          font-size: 13px;
          color: #555;
          margin-bottom: 16px;
        }

        #upsell-upgrade-btn {
          width: 100%;
          background: #2e5c34;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
        }

        #upsell-decline-btn {
          background: none;
          border: none;
          text-decoration: underline;
          color: #666;
          cursor: pointer;
          font-size: 13px;
          margin-top: 12px;
        }

        /* Responsive: smaller padding and text on narrow screens */
        @media (max-width: 480px) {
          #upsell-card .upsell-body {
            padding: 18px;
          }
          #upsell-card h2 {
            font-size: 17px;
          }
        }
      </style>

      <div id="upsell-card">
        <div class="upsell-tag"> RECOMMENDED PLAN UPGRADE</div>
        <div class="upsell-body">
          <h2>Commit to Results & <span class="upsell-highlight">Save Instantly</span></h2>
          <p>Upgrade from <strong>${config.currentLabel}</strong> to <strong>${config.targetLabel}</strong>.</p>
          <button id="upsell-upgrade-btn">UPGRADE MY PLAN</button>
          <div style="text-align:center;">
            <button id="upsell-decline-btn">No thanks, keep ${config.currentLabel}</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Upgrade button: select the higher plan
    document.getElementById('upsell-upgrade-btn').addEventListener('click', function () {
      closePopup();
      selectPlan(config.targetTestId);
    });

    // Decline button: keep the plan the user originally clicked
    document.getElementById('upsell-decline-btn').addEventListener('click', function () {
      closePopup();
      selectPlan(triggerTestId);
    });
  }


  // 3. CLOSE THE POPUP

  function closePopup() {
    const el = document.getElementById('upsell-overlay');
    if (el) el.remove();
  }


  // 4. SELECT A PLAN ON THE REAL PAGE

  //   Programmatically selects a pricing plan.

  function selectPlan(testId) {
    const btn = document.querySelector(`[data-testid="${testId}"]`);
    if (btn) {
      bypassIntercept = true; // let this one click pass through untouched
      btn.click();
    }
  }


  // 5. WATCH FOR CLICKS ON THE WHOLE PAGE (event delegation)
    // Uses Event Delegation by attaching one listener to the document.
    // Continues working even if React re-renders the pricing buttons.
    // Detects clicks on elements whose data-testid starts with.

  document.addEventListener('click', function (event) {

    if (bypassIntercept) {
      bypassIntercept = false;
      return;
    }

    const target = event.target.closest('[data-testid^="price-option-"]');
    if (!target) return;

    const testId = target.getAttribute('data-testid');

    if (UPGRADE_MAP[testId]) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      buildPopup(testId);
    }

  }, true);

  console.log(' Upsell script loaded and watching for clicks');

})();