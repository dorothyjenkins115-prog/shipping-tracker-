# shipping-tracker-
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Logistics & Shipping Tracker</title>
  <style>
    :root {
      --primary: #0a2540;
      --secondary: #00d4b2;
      --accent: #f6f9fc;
      --text: #333333;
      --gray: #666666;
      --border: #e6ebf1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    body {
      color: var(--text);
      background-color: #f8fafc;
      line-height: 1.6;
    }

    /* Header & Navigation */
    header {
      background: var(--primary);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logo span {
      color: var(--secondary);
    }

    nav a {
      color: white;
      text-decoration: none;
      margin-left: 1.5rem;
      font-weight: 500;
      transition: color 0.2s;
    }

    nav a:hover {
      color: var(--secondary);
    }

    /* Hero Tracking Section */
    .hero {
      background: linear-gradient(135deg, #0a2540 0%, #1a365d 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .hero p {
      color: #a0aec0;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .tracker-card {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      color: var(--text);
    }

    .search-box {
      display: flex;
      gap: 10px;
    }

    .search-box input {
      flex: 1;
      padding: 1rem;
      border: 2px solid var(--border);
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
    }

    .search-box input:focus {
      border-color: var(--primary);
    }

    .search-box button {
      background: var(--secondary);
      color: var(--primary);
      border: none;
      padding: 1rem 2rem;
      font-weight: 700;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .search-box button:hover {
      background: #00b89c;
    }

    /* Tracking Results Dashboard */
    .tracking-results {
      display: none;
      margin-top: 2rem;
      text-align: left;
      border-top: 1px solid var(--border);
      padding-top: 1.5rem;
    }

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .status-badge {
      background: #e6fffa;
      color: #047857;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    /* Progress Timeline */
    .timeline {
      position: relative;
      margin: 2rem 0;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 5px;
      bottom: 5px;
      width: 2px;
      background: var(--border);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 1.5rem;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: -2rem;
      top: 5px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border);
    }

    .timeline-item.active::before {
      background: var(--secondary);
      border: 3px solid var(--primary);
    }

    .timeline-date {
      font-size: 0.85rem;
      color: var(--gray);
    }

    .timeline-title {
      font-weight: 600;
    }

    /* Services Section */
    .container {
      max-width: 1100px;
      margin: 3rem auto;
      padding: 0 1.5rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .service-card h3 {
      margin-bottom: 0.5rem;
      color: var(--primary);
    }

    /* Calculator Section */
    .calculator-section {
      background: white;
      border: 1px solid var(--border);
      padding: 2rem;
      border-radius: 8px;
      margin-top: 3rem;
    }

    .calc-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .calc-form select, .calc-form input {
      padding: 0.8rem;
      border: 1px solid var(--border);
      border-radius: 6px;
    }

    .calc-result {
      margin-top: 1rem;
      font-weight: bold;
      color: var(--primary);
    }

    footer {
      background: var(--primary);
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 4rem;
    }
  </style>
</head>
<body>

  <!-- Navigation Bar -->
  <header>
    <a href="#" class="logo">📦 <span>Global</span>Track</a>
    <nav>
      <a href="#tracking">Track</a>
      <a href="#services">Services</a>
      <a href="#quote">Get Quote</a>
    </nav>
  </header>

  <!-- Hero Tracking Section -->
  <section class="hero" id="tracking">
    <h1>Track Your Cargo & Shipments</h1>
    <p>Enter your tracking number for real-time location updates</p>

    <div class="tracker-card">
      <div class="search-box">
        <input type="text" id="trackingInput" placeholder="Enter Tracking Number (Try: GT123456 or GT789012)">
        <button onclick="trackPackage()">Track</button>
      </div>

      <!-- Tracking Results Output -->
      <div class="tracking-results" id="trackingResults">
        <div class="status-header">
          <div>
            <h3 id="resTrackingNum">GT123456</h3>
            <p style="color: var(--gray); font-size: 0.9rem;" id="resCarrier">Standard Express Delivery</p>
          </div>
          <span class="status-badge" id="resStatus">In Transit</span>
        </div>

        <p><strong>Estimated Delivery:</strong> <span id="resETA">Tomorrow, 5:00 PM</span></p>
        <p><strong>Destination:</strong> <span id="resDest">New York, USA</span></p>

        <!-- Progress Steps -->
        <div class="timeline" id="timelineContainer">
          <!-- Populated by JavaScript -->
        </div>
      </div>
    </div>
  </section>

  <!-- Core Services -->
  <div class="container" id="services">
    <h2 style="text-align: center; color: var(--primary);">Our Logistics Services</h2>
    <div class="services-grid">
      <div class="service-card">
        <h3>🚢 Ocean Freight</h3>
        <p>Reliable FCL and LCL container shipping across international waters with full customs clearance management.</p>
      </div>
      <div class="service-card">
        <h3>✈️ Air Freight</h3>
        <p>Fast global transit options for urgent packages, high-value goods, and time-sensitive cargo delivery.</p>
      </div>
      <div class="service-card">
        <h3>🚛 Ground Logistics</h3>
        <p>Door-to-door trucking networks providing seamless regional, national, and last-mile deliveries.</p>
      </div>
    </div>

    <!-- Rate Calculator -->
    <div class="calculator-section" id="quote">
      <h2>Instant Shipping Estimator</h2>
      <p>Estimate your shipping cost based on weight and transport type.</p>
      
      <div class="calc-form">
        <select id="transportType">
          <option value="5">Ground Freight ($5/kg)</option>
          <option value="12">Air Freight ($12/kg)</option>
          <option value="8">Ocean Freight ($8/kg)</option>
        </select>
        <input type="number" id="weightInput" placeholder="Weight in kg" min="1" value="10">
        <button onclick="calculateRate()" style="background: var(--primary); color: white; border: none; padding: 0.8rem; border-radius: 6px; cursor: pointer;">Calculate Estimate</button>
      </div>
      <div class="calc-result" id="calcResult"></div>
    </div>
  </div>

  <footer>
    <p>&copy; 2026 GlobalTrack Logistics Network. All rights reserved.</p>
  </footer>

  <script>
    // Demo Database of Tracking Numbers
    const mockDatabase = {
      "GT123456": {
        status: "In Transit",
        eta: "Tomorrow by 5:00 PM",
        carrier: "Global Express Air",
        destination: "New York, USA",
        history: [
          { time: "Today, 08:30 AM", status: "Departed Sorting Facility - Chicago, IL", active: true },
          { time: "Yesterday, 06:15 PM", status: "Arrived at Regional Hub - Chicago, IL", active: false },
          { time: "2 Days Ago, 10:00 AM", status: "Shipment Picked Up - Los Angeles, CA", active: false }
        ]
      },
      "GT789012": {
        status: "Out for Delivery",
        eta: "Today by 2:00 PM",
        carrier: "Local Ground Courier",
        destination: "London, UK",
        history: [
          { time: "Today, 07:00 AM", status: "Loaded onto Delivery Vehicle", active: true },
          { time: "Yesterday, 11:45 PM", status: "Customs Cleared", active: false },
          { time: "3 Days Ago, 02:00 PM", status: "Processed at Export Facility", active: false }
        ]
      }
    };

    function trackPackage() {
      const input = document.getElementById("trackingInput").value.trim().toUpperCase();
      const resultsDiv = document.getElementById("trackingResults");
      const timelineContainer = document.getElementById("timelineContainer");

      if (!input) {
        alert("Please enter a tracking number.");
        return;
      }

      const data = mockDatabase[input];

      if (data) {
        // Populate static details
        document.getElementById("resTrackingNum").innerText = input;
        document.getElementById("resCarrier").innerText = data.carrier;
        document.getElementById("resStatus").innerText = data.status;
        document.getElementById("resETA").innerText = data.eta;
        document.getElementById("resDest").innerText = data.destination;

        // Render timeline items
        timelineContainer.innerHTML = "";
        data.history.forEach(item => {
          const div = document.createElement("div");
          div.className = `timeline-item ${item.active ? 'active' : ''}`;
          div.innerHTML = `
            <div class="timeline-date">${item.time}</div>
            <div class="timeline-title">${item.status}</div>
          `;
          timelineContainer.appendChild(div);
        });

        resultsDiv.style.display = "block";
      } else {
        alert("Tracking number not found. Try GT123456 or GT789012.");
        resultsDiv.style.display = "none";
      }
    }

    function calculateRate() {
      const rate = parseFloat(document.getElementById("transportType").value);
      const weight = parseFloat(document.getElementById("weightInput").value);
      
      if (isNaN(weight) || weight <= 0) {
        document.getElementById("calcResult").innerText = "Please enter a valid weight.";
        return;
      }

      const total = (rate * weight).toFixed(2);
      document.getElementById("calcResult").innerText = `Estimated Shipping Cost: $${total} USD`;
    }
  </script>
</body>
</html>
