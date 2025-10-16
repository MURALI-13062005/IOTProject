// Simulated data for the shelter monitoring system
class ShelterMonitor {
    constructor() {
        this.currentCapacity = 0;
        this.maxCapacity = 50;
        this.peopleIn = 0;
        this.peopleOut = 0;
        this.updateInterval = null;
        this.alertState = 'normal';
        
        this.initializeEventListeners();
        this.startSimulation();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Test alert button
        document.getElementById('test-alert').addEventListener('click', () => {
            this.triggerTestAlert();
        });

        // Silence alert button
        document.getElementById('silence-alert').addEventListener('click', () => {
            this.silenceAlerts();
        });
    }

    startSimulation() {
        // Simulate random changes in capacity
        this.updateInterval = setInterval(() => {
            this.simulateMovement();
            this.updateDisplay();
            this.checkAlerts();
        }, 3000);
    }

    simulateMovement() {
        // Randomly add or remove people
        const change = Math.random();
        
        if (change > 0.6 && this.currentCapacity < this.maxCapacity) {
            // Someone enters
            this.currentCapacity++;
            this.peopleIn++;
        } else if (change < 0.4 && this.currentCapacity > 0) {
            // Someone leaves
            this.currentCapacity--;
            this.peopleOut++;
        }

        // Update timestamp
        document.getElementById('update-time').textContent = new Date().toLocaleTimeString();
    }

    updateDisplay() {
        // Update capacity numbers
        document.getElementById('current-count').textContent = this.currentCapacity;
        document.getElementById('occupied-beds').textContent = this.currentCapacity;
        document.getElementById('available-beds').textContent = this.maxCapacity - this.currentCapacity;
        document.getElementById('people-in').textContent = this.peopleIn;
        document.getElementById('people-out').textContent = this.peopleOut;

        // Update progress circle
        const percentage = (this.currentCapacity / this.maxCapacity) * 100;
        const circumference = 565.48; // 2 * π * 90
        const offset = circumference - (percentage / 100) * circumference;
        document.getElementById('capacity-progress').style.strokeDashoffset = offset;

        // Update current rate (simulated)
        const rate = Math.floor(Math.random() * 5);
        document.getElementById('current-rate').textContent = `${rate}/min`;
    }

    checkAlerts() {
        const percentage = (this.currentCapacity / this.maxCapacity) * 100;
        const capacityAlert = document.getElementById('capacity-alert');
        const alertMode = document.getElementById('alert-mode');
        const capacityMessage = document.getElementById('capacity-message');
        const buzzerStatus = document.getElementById('buzzer-status');

        if (percentage >= 90) {
            this.setAlertState('critical', 'CRITICAL: Shelter at maximum capacity!', 'Evacuate or expand shelter space immediately!');
        } else if (percentage >= 75) {
            this.setAlertState('warning', 'WARNING: High occupancy', 'Shelter approaching maximum capacity. Consider alternatives.');
        } else {
            this.setAlertState('normal', 'Within safe limits', 'Capacity is within acceptable range.');
        }
    }

    setAlertState(state, title, message) {
        if (this.alertState === state) return;

        this.alertState = state;
        const alertMode = document.getElementById('alert-mode');
        const capacityAlert = document.getElementById('capacity-alert');
        const capacityMessage = document.getElementById('capacity-message');
        const buzzerStatus = document.getElementById('buzzer-status');

        // Update alert mode indicator
        alertMode.textContent = state.charAt(0).toUpperCase() + state.slice(1);
        alertMode.className = `mode-indicator ${state}`;

        // Update alert message
        capacityMessage.textContent = message;

        // Update visual states
        switch(state) {
            case 'critical':
                capacityAlert.style.background = '#fed7d7';
                capacityAlert.style.border = '2px solid #fc8181';
                buzzerStatus.querySelector('.alert-message').textContent = 'ACTIVE - Emergency alerts enabled';
                break;
            case 'warning':
                capacityAlert.style.background = '#fefcbf';
                capacityAlert.style.border = '2px solid #f6e05e';
                buzzerStatus.querySelector('.alert-message').textContent = 'Standby - Monitoring closely';
                break;
            case 'normal':
                capacityAlert.style.background = '#f7fafc';
                capacityAlert.style.border = 'none';
                buzzerStatus.querySelector('.alert-message').textContent = 'Ready - Standby Mode';
                break;
        }
    }

    triggerTestAlert() {
        // Simulate a test alert
        alert('TEST ALERT: Shelter monitoring system is functioning correctly. This would trigger buzzer and mobile notifications in a real scenario.');
        
        // Visual feedback
        const testBtn = document.getElementById('test-alert');
        const originalText = testBtn.innerHTML;
        testBtn.innerHTML = '<i class="fas fa-check"></i> Alert Tested';
        testBtn.style.background = '#48bb78';
        
        setTimeout(() => {
            testBtn.innerHTML = originalText;
            testBtn.style.background = '';
        }, 2000);
    }

    silenceAlerts() {
        // Simulate silencing alerts
        const silenceBtn = document.getElementById('silence-alert');
        const originalText = silenceBtn.innerHTML;
        silenceBtn.innerHTML = '<i class="fas fa-check"></i> Alerts Silenced';
        silenceBtn.style.background = '#718096';
        
        setTimeout(() => {
            silenceBtn.innerHTML = originalText;
            silenceBtn.style.background = '';
        }, 3000);
    }
}

// Initialize the shelter monitor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShelterMonitor();
});

// Simulate real-time updates for sensor status
setInterval(() => {
    const sensors = document.querySelectorAll('.sensor-status');
    sensors.forEach(sensor => {
        // Randomly change sensor status for simulation
        if (Math.random() > 0.95) {
            if (sensor.classList.contains('active')) {
                sensor.classList.remove('active');
                sensor.classList.add('standby');
                sensor.textContent = 'Standby';
            } else {
                sensor.classList.remove('standby');
                sensor.classList.add('active');
                sensor.textContent = 'Active';
            }
        }
    });
}, 5000);