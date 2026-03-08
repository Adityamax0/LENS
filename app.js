document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for LENS
    const mockErrors = [
        { id: 'ERR-001', component: 'Nav Header', description: 'Layout shift on mobile viewport. Elements overlapping.', severity: 'high', status: 'pending' },
        { id: 'ERR-002', component: 'Hero Section', description: 'Button text color contrast fails WCAG guidelines.', severity: 'medium', status: 'pending' },
        { id: 'ERR-003', component: 'Footer Links', description: 'Alignment broken after recent CSS refactor.', severity: 'medium', status: 'pending' }
    ];

    const tbody = document.getElementById('error-table-body');
    const totalErrorsEl = document.getElementById('total-errors');
    const resolvedIssuesEl = document.getElementById('resolved-issues');
    
    // Initialize UI
    function init() {
        renderTable();
        animateCounters();
    }
    
    function renderTable() {
        tbody.innerHTML = '';
        mockErrors.forEach((err, index) => {
            const tr = document.createElement('tr');
            tr.style.opacity = '0';
            tr.style.transform = 'translateY(10px)';
            tr.innerHTML = `
                <td><strong>${err.id}</strong></td>
                <td>${err.component}</td>
                <td>${err.description}</td>
                <td><span class="badge ${err.severity}">${err.severity.toUpperCase()}</span></td>
                <td><span class="badge ${err.status}">${err.status.toUpperCase()}</span></td>
                <td><button class="btn-sm" onclick="inspectError('${err.id}')">Inspect</button></td>
            `;
            tbody.appendChild(tr);
            
            // Staggered animation
            setTimeout(() => {
                tr.style.transition = 'all 0.4s ease';
                tr.style.opacity = '1';
                tr.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    function animateCounters() {
        let count = 0;
        const target = mockErrors.length;
        const interval = setInterval(() => {
            if(count < target) {
                count++;
                totalErrorsEl.textContent = count;
            } else {
                clearInterval(interval);
            }
        }, 300);
        
        resolvedIssuesEl.textContent = '14'; // Mock resolved count
    }

    window.inspectError = function(id) {
        console.log(`Inspecting Error: ${id}`);
        alert(`Initiating Visual QA for ${id}... Sentinel-AI taking control.`);
    };

    // Refresh btn
    document.getElementById('refresh-btn').addEventListener('click', () => {
        const btn = document.getElementById('refresh-btn');
        btn.innerHTML = 'Scanning <span style="display:inline-block;animation:spin 1s linear infinite">🔄</span>';
        setTimeout(() => {
            btn.innerHTML = 'Refresh Audit';
            init(); // re-render
        }, 1500);
    });

    init();
});

// Add keyframes for spinner programmatically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
