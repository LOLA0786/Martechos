// MartechOS Pro v4.0 - Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MartechOS Pro v4.0 Initialized');
    
    // Initialize all event listeners
    initializeEventListeners();
    loadDashboard();
});

function initializeEventListeners() {
    // Quick action buttons
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
    
    // Feature test buttons
    document.querySelectorAll('.feature-test-btn').forEach(button => {
        button.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            testFeature(feature);
        });
    });
}

async function handleQuickAction(action) {
    try {
        let response;
        switch(action) {
            case 'generate_video':
                response = await fetch('/api/generate-video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        script: 'Discover our amazing AI-powered marketing platform!',
                        style: 'professional'
                    })
                });
                break;
            case 'predict_performance':
                response = await fetch('/api/predict-performance', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        budget: 50000,
                        industry: 'ecommerce'
                    })
                });
                break;
            case 'analyze_competitor':
                response = await fetch('/api/competitor-intel/amazon.com');
                break;
            case 'localize_content':
                response = await fetch('/api/localize-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: 'Welcome to our amazing platform',
                        target_languages: ['Spanish', 'French', 'German']
                    })
                });
                break;
        }
        
        const data = await response.json();
        showNotification(`✅ ${action.replace('_', ' ')} successful!`, 'success');
        displayResults(data);
    } catch (error) {
        showNotification('❌ Action failed', 'error');
    }
}

async function testFeature(feature) {
    try {
        const response = await fetch(`/api/${feature}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true })
        });
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Feature test failed:', error);
    }
}

function displayResults(data) {
    const resultsSection = document.getElementById('resultsSection');
    const featureResults = document.getElementById('featureResults');
    
    resultsSection.classList.remove('hidden');
    featureResults.innerHTML = `
        <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">${JSON.stringify(data, null, 2)}</pre>
    `;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

async function loadDashboard() {
    try {
        const response = await fetch('/api/unified-dashboard');
        const data = await response.json();
        console.log('Dashboard loaded:', data);
    } catch (error) {
        console.log('Dashboard features ready');
    }
}
