// Check if user is logged in
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if this is a shared capsule view
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCapsuleId = urlParams.get('capsule');

    if (sharedCapsuleId) {
      loadSharedCapsule(sharedCapsuleId);
      return;
    }

    // If no user is logged in, redirect to login page
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }

    // Set up user profile
    const profileName = document.getElementById('profile-name');
    const profileInitial = document.getElementById('profile-initial');
    // Set profile name
    profileName.textContent = currentUser.name;

    // Set profile initial or image
    if (currentUser.profileImage) {
      profileInitial.style.display = 'none';
      const img = document.createElement('img');
      img.src = currentUser.profileImage;
      img.alt = 'Profile Picture';
      profilePicture.appendChild(img);
    } else {
      profileInitial.textContent = currentUser.name.charAt(0).toUpperCase();
    }

    // Toggle profile dropdown
    const userProfile = document.getElementById('user-profile');
    const profileDropdown = document.getElementById('profile-dropdown');

    userProfile.addEventListener('click', function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
      profileDropdown.classList.remove('active');
    });

    // Logout functionality
    document.getElementById('logout-button').addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });

    // Edit Profile functionality
    document.getElementById('edit-profile-button').addEventListener('click', function (e) {
      e.preventDefault();
      openProfileModal();
    });

    // Navigation
    document.getElementById('create-button').addEventListener('click', function () {
      navigateTo('create-page');
    });

    document.getElementById('view-button').addEventListener('click', function () {
      navigateTo('view-page');
      loadCapsules();
    });

    document.getElementById('create-back-button').addEventListener('click', function (e) {
      e.preventDefault();
      navigateTo('home-page');
    });

    document.getElementById('view-back-button').addEventListener('click', function (e) {
      e.preventDefault();
      navigateTo('home-page');
    });

    document.getElementById('create-first-capsule-btn').addEventListener('click', function () {
      navigateTo('create-page');
    });

    // Tab functionality
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });

    async function updateUser(userId, updatedData) {
      try {
        // First attempt to update on server
        const response = await fetch(`https://timecap.glitch.me/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          // If server update fails, don't throw error, just log and continue with local update
          console.warn('Server update failed, updating locally only');
        } else {
          const result = await response.json();
          console.log('User updated successfully on server:', result);
        }

        // Always update locally regardless of server response
        // Update in localStorage - both users array and currentUser
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedData };
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Update currentUser in localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.id === userId) {
          const updatedUser = { ...currentUser, ...updatedData };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }

        return true; // Return success regardless of server response
      } catch (error) {
        console.error('Error in updateUser function:', error);

        // Still update locally even if there was an error in the try block
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedData };
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Update currentUser in localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.id === userId) {
          const updatedUser = { ...currentUser, ...updatedData };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }

        return true; // Return success even if there was an error
      }
    }

    // Photo upload
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const selectPhotosBtn = document.getElementById('select-photos-btn');

    // Store uploaded photos
    let uploadedPhotos = [];

    selectPhotosBtn.addEventListener('click', function () {
      photoInput.click();
    });

    photoInput.addEventListener('change', function (e) {
      if (e.target.files.length > 0) {
        photoPreview.innerHTML = '';
        photoPreview.style.display = 'grid';

        // Process each file
        Array.from(e.target.files).forEach(file => {
          const reader = new FileReader();

          reader.onload = (event) => {
            const imageData = event.target.result;

            // Add to preview
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            previewItem.innerHTML = `<img src="${imageData}" alt="Preview">`;
            photoPreview.appendChild(previewItem);

            // Store the image data
            uploadedPhotos.push(imageData);
          };

          reader.readAsDataURL(file);
        });
      }
    });

    // Video recording
    const startRecordingBtn = document.getElementById('start-recording');
    const stopRecordingBtn = document.getElementById('stop-recording');
    const recordAgainBtn = document.getElementById('record-again');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoRecording = document.getElementById('video-recording');
    const videoPreviewContainer = document.getElementById('video-preview-container');
    const recordingPreview = document.getElementById('recording-preview');
    const videoPreview = document.getElementById('video-preview');

    let mediaRecorder;
    let recordedChunks = [];
    let videoDataUrl = null;

    startRecordingBtn.addEventListener('click', async function () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        recordingPreview.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = function () {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          videoDataUrl = URL.createObjectURL(blob);
          videoPreview.src = videoDataUrl;

          videoRecording.style.display = 'none';
          videoPreviewContainer.style.display = 'block';
        };

        mediaRecorder.start();
        videoPlaceholder.style.display = 'none';
        videoRecording.style.display = 'block';
      } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Unable to access your camera. Please check permissions.');
      }
    });

    stopRecordingBtn.addEventListener('click', function () {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        recordingPreview.srcObject.getTracks().forEach(track => track.stop());
      }
    });

    recordAgainBtn.addEventListener('click', function () {
      videoPreviewContainer.style.display = 'none';
      videoPlaceholder.style.display = 'block';
      videoDataUrl = null;
    });

    // Create capsule form submission
    const createCapsuleForm = document.getElementById('create-capsule-form');

    createCapsuleForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const recipient = document.getElementById('recipient').value;
      const deliveryDate = document.getElementById('delivery-date').value;
      const message = document.getElementById('message').value;

      if (!title || !deliveryDate) {
        alert('Please provide a title and delivery date.');
        return;
      }

      // Generate a unique ID for the capsule
      const capsuleId = `capsule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('title', title);
      formData.append('recipient', recipient);
      formData.append('deliveryDate', new Date(deliveryDate).toISOString());
      formData.append('message', message);
      formData.append('userId', currentUser.id);
      formData.append('userName', currentUser.name);

      // Add photos if any
      if (uploadedPhotos.length > 0) {
        uploadedPhotos.forEach((photoData) => {
          // Convert base64 to blob
          const byteString = atob(photoData.split(',')[1]);
          const mimeString = photoData.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });

          // Use 'photo' as the field name for ALL photos
          formData.append('photo', blob, `photo_${Date.now()}.jpg`);
        });
        formData.append('hasImages', 'true');
      } else {
        formData.append('hasImages', 'false');
      }

      // Add video if recorded - this part is already correct
      if (videoDataUrl) {
        // Fetch the blob from the URL
        const response = await fetch(videoDataUrl);
        const videoBlob = await response.blob();
        formData.append('video', videoBlob, 'video.webm');
        formData.append('hasVideo', 'true');
      } else {
        formData.append('hasVideo', 'false');
      }

      try {
        // Send data to server
        const response = await fetch('https://timecap.glitch.me/api/capsules', {
          method: 'POST',
          body: formData
        });

        // Validate the response
        if (!response.ok) {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create time capsule');
          } else {
            const rawError = await response.text();
            console.error('Raw server error response:', rawError);
            throw new Error('Server returned an invalid response');
          }
        }

        const result = await response.json();

        // For backward compatibility, also store in localStorage
        const capsule = {
          id: result.capsuleId || capsuleId,
          title,
          message,
          recipient,
          createdAt: new Date().toISOString(),
          deliveryDate: new Date(deliveryDate).toISOString(),
          photos: [...uploadedPhotos],
          videoData: videoDataUrl,
          hasImages: uploadedPhotos.length > 0,
          hasVideo: videoDataUrl !== null,
          userId: currentUser.id,
          userName: currentUser.name
        };

        const existingCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
        localStorage.setItem('timeCapsules', JSON.stringify([...existingCapsules, capsule]));

        alert('Time Capsule created successfully!');

        // Reset form
        createCapsuleForm.reset();
        photoPreview.innerHTML = '';
        photoPreview.style.display = 'none';
        uploadedPhotos = [];
        videoDataUrl = null;
        videoPreviewContainer.style.display = 'none';
        videoPlaceholder.style.display = 'block';

        // Navigate to view page
        navigateTo('view-page');
        loadCapsules();
      } catch (error) {
        console.error('Error creating capsule:', error);
        alert(error.message || 'Failed to create time capsule. Please try again.');
      }

    });

    // Load user's capsules
    async function loadCapsules() {
      const capsulesContainer = document.getElementById('capsules-container');
      const noCapsules = document.getElementById('no-capsules');

      try {
        // Try to fetch capsules from server
        const response = await fetch(`https://timecap.glitch.me/api/capsules?userId=${currentUser.id}`);

        let userCapsules = [];

        if (response.ok) {
          userCapsules = await response.json();
        } else {
          // Fallback to localStorage if server request fails
          const allCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
          userCapsules = allCapsules.filter(capsule => capsule.userId === currentUser.id);
        }

        if (userCapsules.length === 0) {
          noCapsules.style.display = 'block';
          return;
        }

        noCapsules.style.display = 'none';

        // Clear previous capsules
        const existingCapsules = capsulesContainer.querySelectorAll('.capsule-card');
        existingCapsules.forEach(capsule => capsule.remove());

        // Sort capsules by creation date (newest first)
        userCapsules.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Create capsule cards
        userCapsules.forEach(capsule => {
          const isDelivered = new Date(capsule.deliveryDate) <= new Date();

          const capsuleCard = document.createElement('div');
          capsuleCard.className = 'capsule-card';

          let contentTypes = '';
          if (capsule.message) {
            contentTypes += `
              <div class="capsule-content-type">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Letter
              </div>
            `;
          }

          if (capsule.hasImages) {
            contentTypes += `
              <div class="capsule-content-type">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photos
              </div>
            `;
          }

          if (capsule.hasVideo) {
            contentTypes += `
              <div class="capsule-content-type">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </div>
            `;
          }

          capsuleCard.innerHTML = `
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h2 class="text-xl font-semibold text-forest-green-800">${capsule.title}</h2>
                  <div class="capsule-status ${isDelivered ? 'status-delivered' : 'status-sealed'}">
                    ${isDelivered ? 'Delivered' : 'Sealed'}
                  </div>
                </div>
                
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" style="margin-right: 0.25rem;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    Created: ${new Date(capsule.createdAt).toLocaleDateString()} | Delivery: ${new Date(capsule.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-4">
                  ${contentTypes}
                </div>
              </div>
              
              <div class="flex gap-3" style="gap: 0.8rem;">
                <button class="btn btn-outline btn-sm view-capsule-btn" data-id="${capsule.id}" ${!isDelivered ? 'disabled' : ''}>
                  ${isDelivered ? 'View' : 'Sealed'}
                </button>
                <button class="btn btn-outline btn-sm share-capsule-btn" data-id="${capsule.id}">
                  Share
                </button>
                <button class="btn btn-danger btn-sm delete-capsule-btn" data-id="${capsule.id}">
                  Delete
                </button>
              </div>
            </div>
          `;

          capsulesContainer.appendChild(capsuleCard);
        });

        // Add event listeners to view, share, and delete buttons
        document.querySelectorAll('.view-capsule-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            const capsuleId = this.getAttribute('data-id');
            viewCapsule(capsuleId);
          });
        });

        document.querySelectorAll('.share-capsule-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            const capsuleId = this.getAttribute('data-id');
            openShareModal(capsuleId);
          });
        });

        document.querySelectorAll('.delete-capsule-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            const capsuleId = this.getAttribute('data-id');
            openDeleteModal(capsuleId);
          });
        });
      } catch (error) {
        console.error('Error loading capsules:', error);
        alert('Failed to load your time capsules. Please try again later.');
      }
    }

    // View capsule
    async function viewCapsule(capsuleId) {
      try {
        // Try to fetch capsule from server
        const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}`);

        let capsule;

        if (response.ok) {
          capsule = await response.json();
        } else {
          // Fallback to localStorage if server request fails
          const allCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
          capsule = allCapsules.find(c => c.id === capsuleId);
        }

        if (!capsule) {
          return;
        }

      } catch (error) {
        console.error('Error viewing capsule:', error);
        alert('Failed to view time capsule. Please try again later.');
      }
    }

    // Load shared capsule
    async function loadSharedCapsule(capsuleId) {
      try {
        // Try to fetch capsule from server
        const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}/shared`);

        let capsule;

        if (response.ok) {
          capsule = await response.json();
        } else {
          // Fallback to localStorage if server request fails
          const allCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
          capsule = allCapsules.find(c => c.id === capsuleId);
        }

        if (!capsule) {
          alert('Capsule not found or has been deleted.');
          window.location.href = 'index.html';
          return;
        }

        // Check if capsule is delivered
        const isDelivered = new Date(capsule.deliveryDate) <= new Date();
        if (!isDelivered) {
          alert('This time capsule has not been delivered yet. Please check back after the delivery date.');
          window.location.href = 'index.html';
          return;
        }

        // Show shared capsule page
        document.querySelectorAll('.page').forEach(page => {
          page.classList.remove('active');
        });
        document.getElementById('shared-capsule-page').classList.add('active');

        // Set capsule title
        document.getElementById('shared-capsule-title').textContent = capsule.title;

        // Set owner info
        const ownerInitial = document.querySelector('#shared-capsule-owner .profile-initial');
        const ownerName = document.querySelector('#shared-capsule-owner .profile-name');

        ownerInitial.textContent = capsule.userName.charAt(0).toUpperCase();
        ownerName.textContent = capsule.userName;

        // Load capsule content
        const contentContainer = document.getElementById('shared-capsule-content');
        contentContainer.innerHTML = '';

        // Add message if exists
        if (capsule.message) {
          const messageSection = document.createElement('div');
          messageSection.className = 'mb-6';
          messageSection.innerHTML = `
            <div class="content-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3>Message</h3>
            </div>
            <div class="bg-forest-green-50 p-4 rounded-lg">
              <p style="white-space: pre-wrap;">${capsule.message}</p>
            </div>
          `;
          contentContainer.appendChild(messageSection);
        }

        // Add photos if exist
        if (capsule.hasImages && Array.isArray(capsule.photos) && capsule.photos.length > 0) {
          const photosSection = document.createElement('div');
          photosSection.className = 'mb-6';

          let photosHTML = `
            <div class="content-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3>Photos</h3>
            </div>
            <div class="image-gallery">
          `;

          capsule.photos.forEach(photo => {
            photosHTML += `
              <div class="gallery-item">
                <img src="${photo}" alt="Time Capsule Photo">
              </div>
            `;
          });

          photosHTML += `</div>`;
          photosSection.innerHTML = photosHTML;
          contentContainer.appendChild(photosSection);
        }

        // Add video if exists
        if (capsule.hasVideo && capsule.videoData) {
          const videoSection = document.createElement('div');
          videoSection.className = 'mb-6';
          videoSection.innerHTML = `
            <div class="content-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3>Video Message</h3>
            </div>
            <div class="video-container">
              <video controls src="${capsule.videoData}"></video>
            </div>
          `;
          contentContainer.appendChild(videoSection);
        }
      } catch (error) {
        console.error('Error loading shared capsule:', error);
        alert('Failed to load shared time capsule. Please try again later.');
        window.location.href = 'index.html';
      }
    }

    // Delete modal
    let capsuleToDelete = null;
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

    function openDeleteModal(capsuleId) {
      capsuleToDelete = capsuleId;
      deleteModal.classList.add('active');
    }

    function closeDeleteModal() {
      deleteModal.classList.remove('active');
      capsuleToDelete = null;
    }

    confirmDeleteBtn.addEventListener('click', async function () {
      if (capsuleToDelete) {
        try {
          // Try to delete from server
          const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleToDelete}`, {
            method: 'DELETE'
          });

          // Also delete from localStorage for backward compatibility
          const allCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
          const updatedCapsules = allCapsules.filter(c => c.id !== capsuleToDelete);
          localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));

          // Close modal and reload capsules
          closeDeleteModal();
          loadCapsules();

          alert('Time Capsule deleted successfully.');
        } catch (error) {
          console.error('Error deleting capsule:', error);
          alert('Failed to delete time capsule. Please try again later.');
        }
      }
    });

    // Share modal
    let capsuleToShare = null;
    const shareModal = document.getElementById('share-modal');
    const shareLink = document.getElementById('share-link');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    function openShareModal(capsuleId) {
      capsuleToShare = capsuleId;

      // Generate share link
      const shareUrl = `${window.location.origin}${window.location.pathname}?capsule=${capsuleId}`;
      shareLink.value = shareUrl;

      // Show modal
      shareModal.classList.add('active');
    }

    function closeShareModal() {
      shareModal.classList.remove('active');
      capsuleToShare = null;
    }

    window.addEventListener('click', function (event) { if (event.target === shareModal) { closeShareModal(); } });

    // Add this function to your JavaScript code
    function closeProfileModal() {
      const profileEditModal = document.getElementById('profile-edit-modal');
      profileEditModal.classList.remove('active');

      // Clear any error messages
      const profileErrorMessage = document.getElementById('profile-error-message');
      if (profileErrorMessage) {
        profileErrorMessage.style.display = 'none';
      }
    }

    // Add this event listener for the profile edit modal
    window.addEventListener('click', function (event) {
      const profileEditModal = document.getElementById('profile-edit-modal');
      if (event.target === profileEditModal) {
        closeProfileModal();
      }
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', function () {
      shareLink.select();
      document.execCommand('copy');

      // Change button text temporarily
      const originalText = copyLinkBtn.innerHTML;
      copyLinkBtn.innerHTML = 'Copied!';
      setTimeout(() => {
        copyLinkBtn.innerHTML = originalText;
      }, 2000);
    });

    // Share options
    document.getElementById('copy-link-option').addEventListener('click', function () {
      shareLink.select();
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    });

    document.getElementById('email-share-option').addEventListener('click', function () {
      const subject = 'Check out my Time Capsule';
      const body = `I've created a Time Capsule that will be delivered in the future. Check it out here: ${shareLink.value}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    document.getElementById('social-share-option').addEventListener('click', function () {
      alert('In a real app, this would open social media sharing options.');
    });

    // Profile Edit Modal
    const profileEditModal = document.getElementById('profile-edit-modal');
    const profileNameInput = document.getElementById('profile-name');
    const profileEmailInput = document.getElementById('profile-email');
    const profileModalInitial = document.getElementById('profile-modal-initial');
    const profileModalImage = document.getElementById('profile-modal-image');
    const profileImageInput = document.getElementById('profile-image-input');
    const profileImageUpload = document.getElementById('profile-image-upload');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const profileErrorMessage = document.getElementById('profile-error-message');

    function openProfileModal() {
      // Fill form with current user data
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      profileNameInput.value = currentUser.name || '';
      profileEmailInput.value = currentUser.email || '';

      // Set profile image or initial
      if (currentUser.profileImage) {
        profileModalInitial.style.display = 'none';
        profileModalImage.style.display = 'block';
        profileModalImage.src = currentUser.profileImage;
      } else {
        profileModalInitial.style.display = 'block';
        profileModalImage.style.display = 'none';
        profileModalInitial.textContent = currentUser.name.charAt(0).toUpperCase();
      }

      // Show modal
      profileEditModal.classList.add('active');
    }

    profileImageInput.addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
          profileModalInitial.style.display = 'none';
          profileModalImage.style.display = 'block';
          profileModalImage.src = event.target.result;
        };

        reader.readAsDataURL(e.target.files[0]);
      }
    });

    // Save profile changes
    // Add this to your save profile button event handler
    saveProfileBtn.addEventListener('click', async function () {
      const name = profileNameInput.value.trim();
      const email = profileEmailInput.value.trim();
      const profileImage = profileModalImage.style.display === 'block' ? profileModalImage.src : null;

      if (!name) {
        profileErrorMessage.textContent = 'Name is required';
        profileErrorMessage.style.display = 'block';
        return;
      }

      if (!email) {
        profileErrorMessage.textContent = 'Email is required';
        profileErrorMessage.style.display = 'block';
        return;
      }

      try {
        // Get current user data
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // Update user data
        const updatedUser = {
          ...currentUser,
          name,
          email,
          profileImage
        };

        // Skip server update and only update locally
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Also update in users array if it exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser };
          localStorage.setItem('users', JSON.stringify(users));
        }

        // IMPORTANT: Update userName in all capsules created by this user
        const allCapsules = JSON.parse(localStorage.getItem('timeCapsules') || '[]');
        const updatedCapsules = allCapsules.map(capsule => {
          if (capsule.userId === currentUser.id) {
            return { ...capsule, userName: name };
          }
          return capsule;
        });
        localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));

        // Update UI
        document.getElementById('profile-name').textContent = name;

        if (profileImage) {
          document.getElementById('profile-initial').style.display = 'none';

          // Check if profile picture already has an image
          let profileImg = document.querySelector('#profile-picture img');

          if (!profileImg) {
            profileImg = document.createElement('img');
            profileImg.alt = 'Profile Picture';
            document.getElementById('profile-picture').appendChild(profileImg);
          }

          profileImg.src = profileImage;
        } else {
          document.getElementById('profile-initial').style.display = 'block';
          document.getElementById('profile-initial').textContent = name.charAt(0).toUpperCase();

          const profileImg = document.querySelector('#profile-picture img');
          if (profileImg) {
            profileImg.remove();
          }
        }

        // Update shared capsule owner name if currently viewing a shared capsule
        const sharedCapsuleOwnerName = document.querySelector('#shared-capsule-owner .profile-name');
        if (sharedCapsuleOwnerName) {
          const urlParams = new URLSearchParams(window.location.search);
          const sharedCapsuleId = urlParams.get('capsule');

          if (sharedCapsuleId) {
            const capsule = updatedCapsules.find(c => c.id === sharedCapsuleId);
            if (capsule && capsule.userId === currentUser.id) {
              sharedCapsuleOwnerName.textContent = name;

              // Also update the initial
              const sharedCapsuleOwnerInitial = document.querySelector('#shared-capsule-owner .profile-initial');
              if (sharedCapsuleOwnerInitial) {
                sharedCapsuleOwnerInitial.textContent = name.charAt(0).toUpperCase();
              }
            }
          }
        }

        // Close modal
        closeProfileModal();

        // Show success message
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        profileErrorMessage.textContent = 'Failed to update profile. Please try again.';
        profileErrorMessage.style.display = 'block';
      }
    });

    // Navigation function
    function navigateTo(pageId) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });

      // Show the selected page
      document.getElementById(pageId).classList.add('active');

      // Handle View Capsule to load shared content
      document.addEventListener('click', async (event) => {
        const target = event.target;

        // Check if the View button was clicked
        if (target.classList.contains('view-capsule-btn') && target.dataset.id) {
          const capsuleId = target.dataset.id;

          // Load and display the capsule content
          await loadSharedCapsule(capsuleId);
        }
      });

      // Scroll to top
      window.scrollTo(0, 0);
    }

    // Footer links
    const privacyLinks = document.querySelectorAll('[id^="privacy-link"]');
    const termsLinks = document.querySelectorAll('[id^="terms-link"]');
    const contactLinks = document.querySelectorAll('[id^="contact-link"]');

    privacyLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Privacy & Security page would open here.');
      });
    });

    termsLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Terms of Service page would open here.');
      });
    });

    contactLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Contact Us page would open here.');
      });
    });
  });

  // Blob Background Animation
  (function () {
    const canvas = document.getElementById('blob-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Blob parameters
    const blobs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 200, color: 'rgba(47, 133, 90, 0.1)', speed: 0.5 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: 'rgba(47, 133, 90, 0.08)', speed: 0.3 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 300, color: 'rgba(184, 151, 60, 0.07)', speed: 0.4 },
    ];

    let angle = 0;

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angle += 0.01;

      blobs.forEach((blob, index) => {
        // Update blob position with a gentle floating motion
        const offsetX = Math.sin(angle * blob.speed + index) * 30;
        const offsetY = Math.cos(angle * blob.speed + index) * 30;

        // Draw blob
        ctx.beginPath();
        ctx.fillStyle = blob.color;

        // Create a more organic shape using bezier curves
        const points = 8;
        const angleStep = (Math.PI * 2) / points;
        const variationAmount = blob.radius * 0.2;

        for (let i = 0; i <= points; i++) {
          const pointAngle = i * angleStep;
          const variation = Math.sin(angle * 2 + i) * variationAmount;
          const radius = blob.radius + variation;

          const x = blob.x + offsetX + Math.cos(pointAngle) * radius;
          const y = blob.y + offsetY + Math.sin(pointAngle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevPointAngle = (i - 1) * angleStep;
            const prevVariation = Math.sin(angle * 2 + (i - 1)) * variationAmount;
            const prevRadius = blob.radius + prevVariation;

            const prevX = blob.x + offsetX + Math.cos(prevPointAngle) * prevRadius;
            const prevY = blob.y + offsetY + Math.sin(prevPointAngle) * prevRadius;

            const cp1x = prevX + (Math.cos(prevPointAngle - Math.PI / 2) * radius * 0.4);
            const cp1y = prevY + (Math.sin(prevPointAngle - Math.PI / 2) * radius * 0.4);
            const cp2x = x + (Math.cos(pointAngle + Math.PI / 2) * radius * 0.4);
            const cp2y = y + (Math.sin(pointAngle + Math.PI / 2) * radius * 0.4);

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          }
        }

        ctx.closePath();
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  })();