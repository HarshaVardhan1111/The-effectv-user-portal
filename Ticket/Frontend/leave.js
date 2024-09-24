const leaveHistory = [];
const approvedLeaveHistory = []; 

// Leave balances
const leaveBalances = {
    sick: 5,
    casual: 4,
    compOff: 2,
    earned: 3
};

// Function to fetch user details and store in local storage
function fetchUserDetails() {
    const userDetails = {
        userName: 'Harshaavardhan S',
        employeeId: '10433152',
        emailId: 'harshaavardhan_subramani@comcast.com',
        dob: '2001-01-11',
        doj: '2023-03-13',
        experience: '1.5'
    };

    // Store user details in local storage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Populate fields
    document.getElementById('userName').textContent = userDetails.userName;
    document.getElementById('employeeId').textContent = userDetails.employeeId;
    document.getElementById('employeeName').value = userDetails.userName;

    document.getElementById('emailId').textContent = userDetails.emailId;
    document.getElementById('dob').textContent = userDetails.dob;
    document.getElementById('doj').textContent = userDetails.doj;
    document.getElementById('experience').textContent = userDetails.experience;
}

// Function to initialize leave balances from local storage
function initializeLeaveBalances() {
    const storedBalances = localStorage.getItem('leaveBalances');
    if (storedBalances) {
        Object.assign(leaveBalances, JSON.parse(storedBalances));
    } else {
        // If no stored balances, initialize them
        leaveBalances.sick = 5;
        leaveBalances.casual = 4;
        leaveBalances.compOff = 2;
        leaveBalances.earned = 3;
    }
    updateLeaveBalancesDisplay();
}

// Function to check leave balance
function checkLeaveBalance(leaveType, noOfDays) {
    return leaveBalances[leaveType] >= noOfDays;
}

// Event listener for leave request form submission
document.getElementById('leaveForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;

    const noOfDays = calculateDays(startDate, endDate);

    // Check if leave can be granted based on balance
    if (!checkLeaveBalance(leaveType, noOfDays)) {
        alert(`Insufficient ${leaveType} balance! Available: ${leaveBalances[leaveType]} Days.`);
        return;
    }

    const employeeId = document.getElementById('employeeId').textContent;
    const employeeName = document.getElementById('employeeName').value;
    const appliedDate = new Date().toISOString().split('T')[0];
    const actionBy = "Manager"; // Placeholder
    const applicationStatus = "Pending"; // Placeholder

    // Deduct the leave balance
    leaveBalances[leaveType] -= noOfDays;
    localStorage.setItem('leaveBalances', JSON.stringify(leaveBalances)); // Update local storage

    // Add the new leave request to the history
    leaveHistory.push({
        appliedDate,
        employeeId,
        employeeName,
        startDate,
        endDate,
        leaveType,
        noOfDays,
        reason,
        actionBy,
        applicationStatus
    });

    // Update the leave history table and leave balances
    updateLeaveHistoryTable();
    updateLeaveBalancesDisplay();

    // Display response message
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = `Leave request submitted for ${employeeName} (${leaveType}) from ${startDate} to ${endDate}.`;
    responseMessage.classList.remove('hidden');

    // Clear the form
    document.getElementById('leaveForm').reset();
});

// Function to calculate number of days between two dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Inclusive of both start and end date
}

// Function to update the leave history table
function updateLeaveHistoryTable() {
    const historyTableBody = document.getElementById('historyTableBody');
    historyTableBody.innerHTML = ''; // Clear existing entries

    leaveHistory.forEach(request => {
        // Only show pending requests
        if (request.applicationStatus === "Pending") {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.appliedDate}</td>
                <td>${request.employeeId}</td>
                <td>${request.employeeName}</td>
                <td>${request.startDate}</td>
                <td>${request.endDate}</td>
                <td>${request.leaveType}</td>
                <td>${request.noOfDays}</td>
                <td>${request.reason}</td>
                <td>${request.actionBy}</td>
                <td>${request.applicationStatus}</td>
            `;
            historyTableBody.appendChild(row);
        }
    });
    localStorage.setItem('leaveHistory', JSON.stringify(leaveHistory)); // Update local storage
}

// Function to update leave balances display
function updateLeaveBalancesDisplay() {
    document.getElementById('sickLeaveBalance').textContent = leaveBalances.sick;
    document.getElementById('casualLeaveBalance').textContent = leaveBalances.casual;
    document.getElementById('compOffBalance').textContent = leaveBalances.compOff;
    document.getElementById('earnedLeaveBalance').textContent = leaveBalances.earned;
}

// Function to load leave history from local storage
function loadLeaveHistory() {
    const storedHistory = localStorage.getItem('leaveHistory');
    if (storedHistory) {
        leaveHistory.push(...JSON.parse(storedHistory));
    }
}

// Add event listener for the approval button
document.getElementById('approveButton').addEventListener('click', function() {
    approveLeaveRequests();
});

// Function to approve leave requests
function approveLeaveRequests() {
    leaveHistory.forEach(request => {
        if (request.applicationStatus === "Pending") {
            request.applicationStatus = "Approved";
            approvedLeaveHistory.push(request); // Move to approved history
        }
    });
    updateLeaveHistoryTable();
    updateApprovedLeaveHistoryTable();
}

// Update the approved leave history table
function updateApprovedLeaveHistoryTable() {
    const approvedHistoryTableBody = document.getElementById('approvedHistoryTableBody');
    approvedHistoryTableBody.innerHTML = ''; // Clear existing entries

    approvedLeaveHistory.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.appliedDate}</td>
            <td>${request.employeeId}</td>
            <td>${request.employeeName}</td>
            <td>${request.startDate}</td>
            <td>${request.endDate}</td>
            <td>${request.leaveType}</td>
            <td>${request.noOfDays}</td>
            <td>${request.reason}</td>
            <td>${request.actionBy}</td>
            <td>${request.applicationStatus}</td>
        `;
        approvedHistoryTableBody.appendChild(row);
    });
}

// Initialize user details and setup event listeners
loadLeaveHistory();
initializeLeaveBalances();
fetchUserDetails();
