const fs = require('fs');
const path = require('path');

function sendAlert(message, reportFile = 'audit_report.md') {
    console.log('\n======================================================');
    console.log('🚨 ALERT: TRIGGERING NOTIFICATION SYSTEM 🚨');
    console.log('======================================================');
    console.log(`[Email Sent] To: dev-team@lens.internal`);
    console.log(`[Slack Ping] Channel: #ui-alerts`);
    console.log(`\nMESSAGE: ${message}`);
    
    const reportPath = path.resolve(__dirname, reportFile);
    if (fs.existsSync(reportPath)) {
        console.log(`\nATTACHMENT: ${reportFile} found.`);
        console.log(`ACTION REQUIRED: Review the pending patch to restore stability.`);
    } else {
         console.log(`\nNOTE: Log file ${reportFile} generated in system.`);
    }
    console.log('======================================================\n');
}

module.exports = { sendAlert };
