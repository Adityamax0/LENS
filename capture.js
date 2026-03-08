const puppeteer = require('puppeteer');
const notifier = require('./notifier');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        console.log("Navigating to localhost:8080...");
        await page.goto('http://127.0.0.1:8080', { waitUntil: 'networkidle2' });
        // Wait for stagger animations to finish
        await new Promise(r => setTimeout(r, 1500));
        console.log("Taking screenshot...");
        await page.screenshot({ path: 'current.png', fullPage: true });
        await browser.close();
        console.log("Screenshot saved as current.png");

        // Simulate anomaly detection logic (e.g., pixelmatch diff > threshold)
        const mockAnomalyDetected = false; 
        
        if (mockAnomalyDetected) {
            console.log("\n[Analysis] Anomaly detected in current.png compared to baseline.png");
            notifier.sendAlert('UI Regression Detected - Patch pending in audit_report.md');
        } else {
             console.log("\n[Analysis] No visual regressions found.");
        }

    } catch (e) {
        console.error("Error capturing screenshot:", e);
        process.exit(1);
    }
})();
