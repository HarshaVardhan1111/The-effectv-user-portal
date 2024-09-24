document.addEventListener('DOMContentLoaded', function () {
    fetchUserDetails();

    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const profilePhotoInput = document.getElementById('profilePhotoInput');
        const file = profilePhotoInput.files[0];
        if (file) {
            uploadProfilePhoto(file);
        } else {
            alert('Please select a file to upload.');
        }
    });
});

function fetchUserDetails() {
    // Simulated backend data
    const userDetails = {
        userName: 'Harshaavardhan S',
        employeeId: '10433152',
        emailId: 'harshaavardhan_subramani@comcast.com',
        dob: '2001-01-11',
        doj: '2023-03-13',
        experience: '1.5'
    };

    document.getElementById('userName').textContent = userDetails.userName;
    document.getElementById('employeeId').textContent = userDetails.employeeId;
    document.getElementById('emailId').textContent = userDetails.emailId;
    document.getElementById('dob').textContent = userDetails.dob;
    document.getElementById('doj').textContent = userDetails.doj;
    document.getElementById('experience').textContent = userDetails.experience;
}

function uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append('profilePhoto', file);

    fetch('/api/uploadProfilePhoto', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('profileImage').src = data.profileImageUrl;
        } else {
            alert(data.message || 'Failed to upload profile photo. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error uploading profile photo:', error);
        alert('An error occurred while uploading the profile photo.');
    });
}
