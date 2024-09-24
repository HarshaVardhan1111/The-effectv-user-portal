let timerInterval;
let startTime;
let endTime;

function showPage(pageId) {
    document.querySelectorAll('div[id]').forEach(div => div.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

function startTimer() {
    startTime = new Date();
    localStorage.setItem('startTime', startTime.toISOString()); // Store start time
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    endTime = new Date();
    localStorage.setItem('endTime', endTime.toISOString()); // Store end time
    updateEndTimeField();
}

function updateTimer() {
    const elapsedTime = new Date() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateEndTimeField() {
    const endTime = new Date(localStorage.getItem('endTime') || new Date().toISOString()).toLocaleTimeString();
    document.getElementById('end-time').value = endTime;
}

function nextStep() {
    const ticketNumber = document.getElementById('ticket-number').value.trim();
    const totalOrder = document.getElementById('total-order').value.trim();
    const option = document.getElementById('select-option').value;

    // Debugging output
    console.log('Ticket Number:', ticketNumber);
    console.log('Total Order:', totalOrder);
    console.log('Selected Option:', option);

    if (!ticketNumber || !totalOrder || !option) {
        alert('Please fill all required fields.');
        return;
    }

    const data = {
        ticketNumber,
        totalOrder,
        option,
        timeElapsed: document.getElementById('timer').textContent
    };

    localStorage.setItem('ticketData', JSON.stringify(data));

    showPage('ticket-details');
    loadForm(option);
}

function loadForm(option) {
    const detailsDiv = document.getElementById('ticket-details');
    detailsDiv.innerHTML = '';

    const commonFields = `
        <label for="date">Date:</label>
        <input type="text" id="date" value="${new Date().toLocaleDateString()}" readonly>
        <label for="month">Month:</label>
        <input type="text" id="month" value="${new Date().toLocaleString('default', { month: 'long' })}" readonly>
        <label for="name">Name:</label>
        <input type="text" id="name" value="Harshaavardhan Subramani" readonly>
        <label for="ticket-number">Ticket Number:</label>
        <input type="text" id="ticket-number" value="${JSON.parse(localStorage.getItem('ticketData')).ticketNumber}" readonly>
        <label for="total-order">Total Order:</label>
        <input type="number" id="total-order" .value="${JSON.parse(localStorage.getItem('ticketData')).totalOrder}" readonly>
        <label for="start-time">Start Time:</label>
        <input type="text" id="start-time" readonly>
        <label for="end-time">End Time:</label>
        <input type="text" id="end-time" readonly>
    `;

    switch (option) {
        case 'national-uploads':
            detailsDiv.innerHTML = `
                <h2>National Uploads</h2>
                <form id="national-uploads-form">
                    ${commonFields}
                    <label for="client-name">Client Name:</label>
                    <input type="text" id="client-name" required>
                    <label for="pending-response">Pending Response Reason:</label>
                    <select id="pending-response" required>
                        <option value="dropdownCSM">CSM - Confirmation of Product/ syscodes/ Estimate & Instruction</option>
                        <option value="due-date-miscoded">CSM - Due date Miscoded</option>
                        <option value="future-orders">CSM - Future Orders added to the ticket</option>
                        <option value="incorrect-ad-copy">CSM - Incorrect Ad copy Length</option>
                        <option value="missing-order">CSM - Missing order/Instructions</option>
                        <option value="revised-traffic">CSM - Revised Traffic arrived</option>
                        <option value="spots-not-matched">CSM - Spots not matched</option>
                        <option value="confirm-order">CSM - To confirm order/ AMP/ TIM/ CID</option>
                        <option value="correct-ticket-type">CSM - To correct the Ticket type</option>
                        <option value="digital-order">Digital Order</option>
                        <option value="duplicate-order">Duplicate Order/ ticket</option>
                        <option value="expired-order">Expired Order</option>
                        <option value="validation-error">Validation Error</option>
                        <option value="others">Others</option>
                        <option value="start-date-end-date">Start date and end date confirmation</option>
                        <option value="cioc-confirmation">CIOC - Confirmation of Product/ syscodes/ Estimate & Instruction</option>
                        <option value="confirmation-limits">Confirmation of Limits</option>
                    </select>
                    <label for="ticket-difficulty">Ticket Difficulty:</label>
                    <input type="text" id="ticket-difficulty" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'retail-uploads':
            detailsDiv.innerHTML = `
                <h2>Retail Uploads</h2>
                <form id="retail-uploads-form">
                    ${commonFields}
                    <label for="ticket-product">Ticket Product:</label>
                    <select id="ticket-product" required>
                        <option value="adcopy">Ad Copy</option>
                        <option value="digital&linearadcopy">Digital & Linear Ad copy</option>
                        <option value="digitaladcopy">Digital Ad copy</option>
                        <option value="ploitical">Political</option>
                        <option value="adcopy">Ad Copy VIP</option>
                        <option value="dish>Dish</option>
                        <option value="sweeps">Sweeps</option>
                        </select>
                    <label for="region">Region:</label>
                    <select id="region" required>
                        <option value="atlanta">Atlanta</option>
                        <option value="california">California</option>
                        <option value="nashville">Nashville</option>
                        <option value="jacksonville">Jacksonville</option>
                        <option value="new-england">New England</option>
                        <option value="new-york">New York</option>
                        <option value="mountain">Mountain</option>
                        <option value="chicago">Chicago</option>
                        <option value="detroit">Detroit</option>
                        <option value="chat-knox">Chat/Knox</option>
                        <option value="twin-cities">Twin Cities</option>
                        <option value="mid-atlantic">Mid-Atlantic</option>
                        <option value="liberty">Liberty</option>
                        <option value="south-florida">South Florida</option>
                        <option value="jackson">Jackson</option>
                        <option value="sarasota">Sarasota</option>
                        <option value="northwest">Northwest</option>
                        <option value="houston">Houston</option>
                        <option value="memphis-lr">Memphis LR</option>
                        <option value="small-business">Small Business</option>
                    </select>
                    <label for="total-order-uploaded">Total Order Uploaded:</label>
                    <input type="number" id="total-order-uploaded" required>
                    <label for="dig-billing">Dig Billing:</label>
                    <select id="dig-billing" required>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <label for="dex-orders-uploaded">Dex Orders Uploaded:</label>
                    <input type="number" id="dex-orders-uploaded" required>
                    <label for="reason-pending-csm">Reason for Pending CSM:</label>
                    <select id="reason-pending-csm" required>
                        <option value="spots-not-matched">CSM - Spots not matched</option>
                        <option value="start-date-end-date">Start date and end date confirmation</option>
                        <option value="asked-for-confirmation">Asked for the confirmation of spots.</option>
                        <option value="error-pop-up">Error pop up while validating - Tim Error / DEX Error</option>
                        <option value="update-ticket-type">CSM - Update ticket type / Billing type</option>
                        <option value="others">Others</option>
                        <option value="confirmation-rotation">Confirmation on rotation/limits</option>
                        <option value="url-dex-id">CSM - URL/DEX ID not mentioned</option>
                        <option value="ad-copy-group">Ad copy group not available for instructions provided</option>
                        <option value="missing-order">CSM - Missing order/Instructions</option>
                        <option value="spot-expires-soon">Spot expires soon/expired</option>
                        <option value="incorrect-tim">Incorrect TIM/ Mismatch between TS and body of the ticket</option>
                        <option value="copy-applied">Copy was already applied</option>
                        <option value="digital-greyed-lines">Digital Greyed out lines</option>
                        <option value="due-date-miscoded">CSM - Due date Miscoded</option>
                        <option value="duplicate-order">Duplicate Order</option>
                        <option value="confirmation-estimate">Confirmation of Estimate/EST were Different</option>
                        <option value="future-orders">CSM - Future Orders added to the ticket</option>
                        <option value="unable-to-access-tims">Not able to access tims in ACW</option>
                        <option value="client-id-mismatch">Client Id is not matching</option>
                        <option value="closed-incorrect-instruction">Closed due to incorrect instruction/revision</option>
                        <option value="no-contract-tim">No contract/Tim number in ticket field</option>
                        <option value="missing-instructions">Missing instructions for ad copy groups in ACW</option>
                        <option value="cioc-spot-not-matched">CIOC - Spot not matched</option>
                        <option value="confirmation-bookend">Confirmation on the bookend pair</option>
                        <option value="dex-start-date-revision">DEX - Start date revision</option>
                    /select>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'national-qc':
            detailsDiv.innerHTML = `
                <h2>National QC</h2>
                <form id="national-qc-form">
                    ${commonFields}
                    <label for="ticket-product">Ticket Product:</label>
                    <input type="text" id="ticket-product" required>
                    <label for="qc-review">QC Review:</label>
                    <input type="text" id="qc-review" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'retail-qc':
            detailsDiv.innerHTML = `
                <h2>Retail QC</h2>
                <form id="retail-qc-form">
                    ${commonFields}
                    <label for="ticket-product">Ticket Product:</label>
                    <input type="text" id="ticket-product" required>
                    <label for="qc-review">QC Review:</label>
                    <input type="text" id="qc-review" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'enterprise-uploads':
            detailsDiv.innerHTML = `
                <h2>Enterprise Uploads</h2>
                <form id="enterprise-uploads-form">
                    ${commonFields}
                    <label for="total-order-uploaded">Total Orders Uploaded:</label>
                    <input type="number" id="total-order" required>
                    <label for="ticket-product">Ticket Product:</label>
                    <input type="text" id="ticket-product" required>
                    <label for="pending-response-csm">Pending Response - CSM Reason:</label>
                    <input type="text" id="pending-response-csm" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        case 'enterprise-qc':
            detailsDiv.innerHTML = `
                <h2>Enterprise QC</h2>
                <form id="enterprise-qc-form">
                    ${commonFields}
                    <label for="total-order">Total Orders Uploaded:</label>
                    <input type="number" id="total-order" required>
                    <label for="ticket-product">Ticket Product:</label>
                    <input type="text" id="ticket-product" required>
                    <label for="pending-response-csm">Pending Response - CSM Reason:</label>
                    <input type="text" id="pending-response-csm" required>
                    <button type="submit">Submit</button>
                </form>
            `;
            break;
        default:
            break;
    }
    
    const ticketData = JSON.parse(localStorage.getItem('ticketData')) || {};
    const startTime = new Date(localStorage.getItem('startTime') || new Date().toISOString()).toLocaleTimeString();
    const endTime = new Date(localStorage.getItem('endTime') || new Date().toISOString()).toLocaleTimeString();
    

    document.getElementById('ticket-number').value = ticketData.ticketNumber || '';
    // document.getElementById('total-order').value = ticketData.totalOrder || '';
    document.getElementById('start-time').value = startTime;
    document.getElementById('end-time').value = endTime;
    document.getElementById('date').value = new Date().toLocaleDateString();
    document.getElementById('month').value = new Date().toLocaleString('default', { month: 'long' });
    document.getElementById('name').value = "User Profile";
//     document.getElementById('ticket-number').value = JSON.parse(localStorage.getItem('ticketData')).ticketNumber;
    document.getElementById('total-order').value = JSON.parse(localStorage.getItem('ticketData')).totalOrder;
//     document.getElementById('start-time').value = JSON.parse(localStorage.getItem('ticketData')).timeElapsed;

}



function notifyHighValueClient() {
    alert('High Value Client Alert!');
}
