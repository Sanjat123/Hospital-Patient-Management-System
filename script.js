// Simulating the C program's data structure and functions in JavaScript
let head = null;

class Patient {
    constructor(id, name, age, disease, priority) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.disease = disease;
        this.priority = priority;
        this.next = null;
        this.admissionDate = new Date();
    }
}

// Initialize with some sample data
function initializeSampleData() {
    if (head === null) {
        addPatientToSystem(1001, "Ritesh Kumar", 20, "Heart Attack", 1);
        addPatientToSystem(1002, "Shayam Babu", 22, "Broken Arm", 2);
        addPatientToSystem(1003, "Sanjat Kumar", 21, "Fever", 3);
        addPatientToSystem(1004, "Mohan Lal", 30, "Stroke", 1);
        addPatientToSystem(1005, "Manik Mehra", 50, "Severe Asthma", 2);
        updateStats();
    }
}

function addPatientToSystem(id, name, age, disease, priority) {
    const newPatient = new Patient(id, name, age, disease, priority);
    
    if (head === null || newPatient.priority < head.priority) {
        newPatient.next = head;
        head = newPatient;
    } else {
        let temp = head;
        while (temp.next !== null && temp.next.priority <= newPatient.priority) {
            temp = temp.next;
        }
        newPatient.next = temp.next;
        temp.next = newPatient;
    }
}

function addPatient() {
    const id = parseInt(document.getElementById('add-id').value);
    const name = document.getElementById('add-name').value.trim();
    const age = parseInt(document.getElementById('add-age').value);
    const disease = document.getElementById('add-disease').value.trim();
    const priority = parseInt(document.getElementById('add-priority').value);
    const alert = document.getElementById('add-alert');
    
    if (!id || !name || !age || !disease || !priority) {
        showAlert(alert, 'Please fill in all required fields.', 'danger');
        return;
    }
    
    // Check if ID already exists
    let temp = head;
    while (temp !== null) {
        if (temp.id === id) {
            showAlert(alert, `Patient with ID ${id} already exists.`, 'danger');
            return;
        }
        temp = temp.next;
    }
    
    const newPatient = new Patient(id, name, age, disease, priority);
    
    if (head === null || newPatient.priority < head.priority) {
        newPatient.next = head;
        head = newPatient;
    } else {
        let temp = head;
        while (temp.next !== null && temp.next.priority <= newPatient.priority) {
            temp = temp.next;
        }
        newPatient.next = temp.next;
        temp.next = newPatient;
    }
    
    // Clear form
    document.getElementById('add-id').value = '';
    document.getElementById('add-name').value = '';
    document.getElementById('add-age').value = '';
    document.getElementById('add-disease').value = '';
    document.getElementById('add-priority').value = '1';
    
    showAlert(alert, `Patient ${name} added successfully!`, 'success');
    updateStats();
}

function displayPatients() {
    const patientList = document.getElementById('patient-list');
    patientList.innerHTML = '';
    
    if (head === null) {
        patientList.innerHTML = '<div class="alert"><i class="fas fa-info-circle"></i> No patient records found.</div>';
        return;
    }
    
    let temp = head;
    while (temp !== null) {
        patientList.appendChild(createPatientCard(temp));
        temp = temp.next;
    }
}

function showRecentPatients() {
    const recentPatients = document.getElementById('recent-patients');
    recentPatients.innerHTML = '';
    
    if (head === null) {
        recentPatients.innerHTML = '<div class="alert"><i class="fas fa-info-circle"></i> No patient records found.</div>';
        return;
    }
    
    let count = 0;
    let temp = head;
    while (temp !== null && count < 6) {
        recentPatients.appendChild(createPatientCard(temp));
        temp = temp.next;
        count++;
    }
}

function createPatientCard(patient) {
    const priorityClass = getPriorityClass(patient.priority);
    const priorityText = getPriorityText(patient.priority);
    const priorityBadgeClass = getPriorityBadgeClass(patient.priority);
    
    const patientCard = document.createElement('div');
    patientCard.className = `patient-card ${priorityClass}`;
    patientCard.innerHTML = `
        <div class="patient-header">
            <h3 class="patient-name">${patient.name}</h3>
            <div class="patient-id">
                <i class="fas fa-id-card"></i> ID: ${patient.id}
            </div>
        </div>
        <div class="patient-body">
            <div class="patient-detail">
                <div class="patient-detail-label">Age:</div>
                <div class="patient-detail-value">${patient.age}</div>
            </div>
            <div class="patient-detail">
                <div class="patient-detail-label">Condition:</div>
                <div class="patient-detail-value">${patient.disease}</div>
            </div>
            <div class="patient-detail">
                <div class="patient-detail-label">Priority:</div>
                <div class="patient-detail-value">
                    <span class="priority-badge ${priorityBadgeClass}">${priorityText}</span>
                </div>
            </div>
            <div class="patient-detail">
                <div class="patient-detail-label">Admitted:</div>
                <div class="patient-detail-value">${formatDate(patient.admissionDate)}</div>
            </div>
        </div>
    `;
    return patientCard;
}

function searchPatient() {
    const id = parseInt(document.getElementById('search-id').value);
    const resultContainer = document.getElementById('search-result');
    const alert = document.getElementById('search-alert');
    
    if (!id) {
        showAlert(alert, 'Please enter a patient ID.', 'danger');
        return;
    }
    
    let temp = head;
    while (temp !== null) {
        if (temp.id === id) {
            resultContainer.innerHTML = '';
            resultContainer.appendChild(createPatientCard(temp));
            alert.classList.add('hidden');
            return;
        }
        temp = temp.next;
    }
    
    resultContainer.innerHTML = '';
    showAlert(alert, `Patient with ID ${id} not found.`, 'danger');
}

function updatePatient() {
    const id = parseInt(document.getElementById('update-id').value);
    const name = document.getElementById('update-name').value.trim();
    const age = parseInt(document.getElementById('update-age').value);
    const disease = document.getElementById('update-disease').value.trim();
    const priority = document.getElementById('update-priority').value ? parseInt(document.getElementById('update-priority').value) : null;
    const alert = document.getElementById('update-alert');
    
    if (!id) {
        showAlert(alert, 'Please enter a patient ID.', 'danger');
        return;
    }
    
    let temp = head;
    while (temp !== null) {
        if (temp.id === id) {
            if (name) temp.name = name;
            if (age) temp.age = age;
            if (disease) temp.disease = disease;
            
            // If priority changed, we need to re-sort the list
            if (priority && priority !== temp.priority) {
                const oldPriority = temp.priority;
                temp.priority = priority;
                
                // Remove from current position
                if (head === temp) {
                    head = head.next;
                } else {
                    let prev = head;
                    while (prev.next !== temp) {
                        prev = prev.next;
                    }
                    prev.next = temp.next;
                }
                
                // Re-insert with new priority
                if (head === null || temp.priority < head.priority) {
                    temp.next = head;
                    head = temp;
                } else {
                    let current = head;
                    while (current.next !== null && current.next.priority <= temp.priority) {
                        current = current.next;
                    }
                    temp.next = current.next;
                    current.next = temp;
                }
            }
            
            // Clear form
            document.getElementById('update-id').value = '';
            document.getElementById('update-name').value = '';
            document.getElementById('update-age').value = '';
            document.getElementById('update-disease').value = '';
            document.getElementById('update-priority').value = '';
            
            showAlert(alert, `Patient record updated successfully!`, 'success');
            updateStats();
            return;
        }
        temp = temp.next;
    }
    
    showAlert(alert, `Patient with ID ${id} not found.`, 'danger');
}

function deletePatient() {
    const id = parseInt(document.getElementById('delete-id').value);
    const alert = document.getElementById('delete-alert');
    
    if (!id) {
        showAlert(alert, 'Please enter a patient ID.', 'danger');
        return;
    }
    
    if (head === null) {
        showAlert(alert, 'Patient not found.', 'danger');
        return;
    }
    
    if (head.id === id) {
        const patientName = head.name;
        head = head.next;
        showAlert(alert, `Patient ${patientName} (ID: ${id}) discharged successfully.`, 'success');
        updateStats();
        return;
    }
    
    let temp = head;
    let prev = null;
    
    while (temp !== null && temp.id !== id) {
        prev = temp;
        temp = temp.next;
    }
    
    if (temp === null) {
        showAlert(alert, `Patient with ID ${id} not found.`, 'danger');
        return;
    }
    
    const patientName = temp.name;
    prev.next = temp.next;
    showAlert(alert, `Patient ${patientName} (ID: ${id}) discharged successfully.`, 'success');
    updateStats();
}

function updateStats() {
    let emergency = 0;
    let serious = 0;
    let normal = 0;
    
    let temp = head;
    while (temp !== null) {
        if (temp.priority === 1) emergency++;
        else if (temp.priority === 2) serious++;
        else if (temp.priority === 3) normal++;
        temp = temp.next;
    }
    
    document.getElementById('emergency-count').textContent = emergency;
    document.getElementById('serious-count').textContent = serious;
    document.getElementById('normal-count').textContent = normal;
    
    showRecentPatients();
}

function getPriorityText(priority) {
    switch(priority) {
        case 1: return 'Emergency';
        case 2: return 'Serious';
        case 3: return 'Normal';
        default: return 'Unknown';
    }
}

function getPriorityClass(priority) {
    switch(priority) {
        case 1: return 'priority-emergency';
        case 2: return 'priority-serious';
        case 3: return 'priority-normal';
        default: return '';
    }
}

function getPriorityBadgeClass(priority) {
    switch(priority) {
        case 1: return 'badge-emergency';
        case 2: return 'badge-serious';
        case 3: return 'badge-normal';
        default: return '';
    }
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showAlert(element, message, type) {
    element.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    element.className = `alert alert-${type}`;
    element.classList.remove('hidden');
    
    // Hide alert after 5 seconds
    setTimeout(() => {
        element.classList.add('hidden');
    }, 5000);
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the corresponding nav link
    let navLink;
    switch(sectionId) {
        case 'dashboard-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'dashboard-section\')"]'); break;
        case 'add-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'add-section\')"]'); break;
        case 'display-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'display-section\')"]'); break;
        case 'search-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'search-section\')"]'); break;
        case 'update-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'update-section\')"]'); break;
        case 'delete-section': navLink = document.querySelector('.nav-link[onclick="showSection(\'delete-section\')"]'); break;
    }
    
    if (navLink) navLink.classList.add('active');
    
    // Refresh content if needed
    if (sectionId === 'display-section') {
        displayPatients();
    } else if (sectionId === 'dashboard-section') {
        updateStats();
    }
    
    // Clear all alerts
    document.querySelectorAll('.alert').forEach(alert => {
        alert.classList.add('hidden');
    });
}

// Initialize the application
window.onload = function() {
    initializeSampleData();
    showSection('dashboard-section');
};