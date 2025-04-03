// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Profile Edit Modal elements - moved to the top
  const profileEditModal = document.getElementById("profile-edit-modal")
  const profileNameInput = document.getElementById("profile-name")
  const profileEmailInput = document.getElementById("profile-email")
  const profileModalInitial = document.getElementById("profile-modal-initial")
  const profileModalImage = document.getElementById("profile-modal-image")
  const profileImageInput = document.getElementById("profile-image-input")
  const saveProfileBtn = document.getElementById("save-profile-btn")
  const profileErrorMessage = document.getElementById("profile-error-message")

  // Check if this is a shared capsule view
  const urlParams = new URLSearchParams(window.location.search)
  const sharedCapsuleId = urlParams.get("capsule")

  if (sharedCapsuleId) {
    loadSharedCapsule(sharedCapsuleId)
    return
  }

  // If no user is logged in, redirect to login page
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Set up user profile
  const profileName = document.getElementById("profile-name")
  const profileInitial = document.getElementById("profile-initial")
  const profilePicture = document.getElementById("profile-picture") // Declare profilePicture

  // Set profile name
  if (profileName) {
    profileName.textContent = currentUser.name
  }

  // Set profile initial or image
  if (profileInitial && profilePicture) {
    if (currentUser.profileImage) {
      profileInitial.style.display = "none"
      const img = document.createElement("img")
      img.src = currentUser.profileImage
      img.alt = "Profile Picture"
      profilePicture.appendChild(img)
    } else {
      profileInitial.textContent = currentUser.name.charAt(0).toUpperCase()
    }
  }

  // Add notification button to the header
  const userProfileElement = document.getElementById("user-profile")
  if (userProfileElement) {
    // Get the header element
    const headerElement =
      document.querySelector("header") || userProfileElement.closest("header") || userProfileElement.parentNode

    // Create a container for the profile section (notification + user profile)
    const profileSection = document.createElement("div")
    profileSection.className = "profile-section"
    profileSection.style.display = "flex"
    profileSection.style.alignItems = "center"

    // Create notification button
    const notificationButton = document.createElement("div")
    notificationButton.className = "notification-button"
    notificationButton.id = "notification-button"
    notificationButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    <span class="notification-badge" id="notification-badge" style="display: none;">0</span>
  `

    // Create notification dropdown
    const notificationDropdown = document.createElement("div")
    notificationDropdown.className = "notification-dropdown"
    notificationDropdown.id = "notification-dropdown"

    // Remove user profile from its current position
    const userProfileParent = userProfileElement.parentNode
    userProfileParent.removeChild(userProfileElement)

    // Add both elements to the profile section
    profileSection.appendChild(notificationButton)
    profileSection.appendChild(userProfileElement)

    // Add the profile section to the header (or parent element)
    headerElement.appendChild(profileSection)
    document.body.appendChild(notificationDropdown)

    // Add event listener to toggle notification dropdown
    notificationButton.addEventListener("click", (e) => {
      e.stopPropagation()
      notificationDropdown.classList.toggle("active")

      // If opening the dropdown, mark notifications as read
      if (notificationDropdown.classList.contains("active")) {
        markNotificationsAsRead()

        // Position the dropdown relative to the notification button
        const buttonRect = notificationButton.getBoundingClientRect()

        // For desktop (larger screens), position it relative to the button
        if (window.innerWidth >= 768) {
          notificationDropdown.style.right = window.innerWidth - buttonRect.right + 10 + "px"
          notificationDropdown.style.left = "auto"
          notificationDropdown.style.top = buttonRect.bottom + 10 + "px"
        } else {
          // For mobile, center it
          notificationDropdown.style.top = buttonRect.bottom + 10 + "px"
          notificationDropdown.style.right = "5%"
          notificationDropdown.style.left = "5%"
        }

        // Ensure the dropdown is visible within the viewport
        const dropdownRect = notificationDropdown.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (dropdownRect.bottom > viewportHeight) {
          // If dropdown would go off the bottom of the screen, position it above the button
          notificationDropdown.style.top = buttonRect.top - dropdownRect.height - 10 + "px"
        }
      }
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      notificationDropdown.classList.remove("active")
    })

    // Add CSS for notification button and dropdown
    const notificationStyles = document.createElement("style")
    notificationStyles.textContent = `
  .profile-section {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  
  .notification-button {
    position: relative;
    margin-right: 0.5rem;
    cursor: pointer;
    color: #3d7059;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ef4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .notification-dropdown {
    position: fixed;
    width: 300px;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    max-height: 80vh;
    overflow-y: auto;
    display: none;
    padding: 1rem;
  }

@media (max-width: 768px) {
  .notification-dropdown {
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
  }
}
  
  .notification-dropdown.active {
    display: block;
  }
  
  .notification-item {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
  }
  
  .notification-item:last-child {
    border-bottom: none;
  }
  
  .notification-item:hover {
    background-color: #f9fafb;
  }
  
  .notification-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #1f2937;
  }
  
  .notification-message {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .notification-time {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }
  
  .notification-item.unread {
    background-color: #f2f7f4;
  }
  
  .notification-item.unread .notification-title {
    color: #3d7059;
  }
  
  .no-notifications {
    text-align: center;
    padding: 1rem;
    color: #6b7280;
  }
`
    document.head.appendChild(notificationStyles)
  }

  // Function to check for new notifications
  async function checkForNewNotifications() {
    try {
      // Try to fetch capsules from server
      const response = await fetch(`https://timecap.glitch.me/api/capsules?userId=${currentUser.id}`)

      let userCapsules = []

      if (response.ok) {
        userCapsules = await response.json()
      } else {
        // Fallback to localStorage if server request fails
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        userCapsules = allCapsules.filter(
          (capsule) => capsule.recipients && capsule.recipients.some((recipient) => recipient.id === currentUser.id),
        )
      }

      // Filter only capsules shared with the user
      const sharedCapsules = userCapsules.filter(
        (capsule) =>
          capsule.recipients &&
          capsule.recipients.some((recipient) => recipient.id === currentUser.id) &&
          capsule.isSharedWithMe === true,
      )

      // Get read notifications from localStorage
      const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")

      // Filter unread notifications
      const unreadNotifications = sharedCapsules.filter((capsule) => !readNotifications.includes(capsule.id))

      // Update notification badge
      updateNotificationBadge(unreadNotifications.length)

      // Update notification dropdown content
      updateNotificationDropdown(sharedCapsules, readNotifications)

      return unreadNotifications.length
    } catch (error) {
      console.error("Error checking for notifications:", error)
      return 0
    }
  }

  // Function to update notification badge
  function updateNotificationBadge(count) {
    const badge = document.getElementById("notification-badge")
    if (!badge) return

    if (count > 0) {
      badge.textContent = count > 9 ? "9+" : count
      badge.style.display = "flex"
    } else {
      badge.style.display = "none"
    }
  }

  // Function to update notification dropdown content
  function updateNotificationDropdown(notifications, readNotifications) {
    const dropdown = document.getElementById("notification-dropdown")
    if (!dropdown) return

    if (notifications.length === 0) {
      dropdown.innerHTML = `<div class="no-notifications">No notifications</div>`
      return
    }

    // Sort notifications by creation date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    let notificationsHTML = `<div class="notification-header">
      <h3>Notifications</h3>
    </div>`

    notifications.forEach((notification) => {
      const isRead = readNotifications.includes(notification.id)
      const timeAgo = getTimeAgo(new Date(notification.createdAt))

      notificationsHTML += `
        <div class="notification-item ${isRead ? "" : "unread"}" data-id="${notification.id}">
          <div class="notification-title">New Time Capsule Shared</div>
          <div class="notification-message">${notification.userName} shared "${notification.title}" with you</div>
          <div class="notification-time">${timeAgo}</div>
        </div>
      `
    })

    dropdown.innerHTML = notificationsHTML

    // Add event listeners to notification items
    dropdown.querySelectorAll(".notification-item").forEach((item) => {
      item.addEventListener("click", () => {
        const capsuleId = item.getAttribute("data-id")
        viewCapsule(capsuleId)
        markNotificationAsRead(capsuleId)
      })
    })
  }

  // Function to mark all notifications as read
  function markNotificationsAsRead() {
    const notificationItems = document.querySelectorAll(".notification-item.unread")
    const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")

    notificationItems.forEach((item) => {
      const capsuleId = item.getAttribute("data-id")
      if (!readNotifications.includes(capsuleId)) {
        readNotifications.push(capsuleId)
      }
      item.classList.remove("unread")
    })

    localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(readNotifications))
    updateNotificationBadge(0)
  }

  // Function to mark a specific notification as read
  function markNotificationAsRead(capsuleId) {
    const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")

    if (!readNotifications.includes(capsuleId)) {
      readNotifications.push(capsuleId)
      localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(readNotifications))
    }

    // Update UI
    const notificationItem = document.querySelector(`.notification-item[data-id="${capsuleId}"]`)
    if (notificationItem) {
      notificationItem.classList.remove("unread")
    }

    // Recount unread notifications
    const unreadCount = document.querySelectorAll(".notification-item.unread").length
    updateNotificationBadge(unreadCount)
  }

  // Helper function to format time ago
  function getTimeAgo(date) {
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`
  }

  // Check for notifications when the page loads
  checkForNewNotifications()

  // Set up periodic notification check (every 60 seconds)
  setInterval(checkForNewNotifications, 60000)

  // Toggle profile dropdown
  const userProfile = document.getElementById("user-profile")
  const profileDropdown = document.getElementById("profile-dropdown")

  if (userProfile && profileDropdown) {
    userProfile.addEventListener("click", (e) => {
      e.stopPropagation()
      profileDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      profileDropdown.classList.remove("active")
    })
  }

  // Logout functionality
  const logoutButton = document.getElementById("logout-button")
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("currentUser")
      window.location.href = "login.html"
    })
  }

  // Edit Profile functionality
  const editProfileButton = document.getElementById("edit-profile-button")
  if (editProfileButton) {
    editProfileButton.addEventListener("click", (e) => {
      e.preventDefault()
      openProfileModal()
    })
  }

  // Navigation
  const createButton = document.getElementById("create-button")
  if (createButton) {
    createButton.addEventListener("click", () => {
      navigateTo("create-page")
    })
  }

  const viewButton = document.getElementById("view-button")
  if (viewButton) {
    viewButton.addEventListener("click", () => {
      navigateTo("view-page")
      loadCapsules()
    })
  }

  // Add event listener for the view archived capsules button
  const viewArchivedButton = document.getElementById("view-archived-button")
  if (viewArchivedButton) {
    viewArchivedButton.addEventListener("click", () => {
      navigateTo("view-page")
      loadArchivedCapsules()
    })
  }

  const createBackButton = document.getElementById("create-back-button")
  if (createBackButton) {
    createBackButton.addEventListener("click", (e) => {
      e.preventDefault()
      navigateTo("home-page")
    })
  }

  const viewBackButton = document.getElementById("view-back-button")
  if (viewBackButton) {
    viewBackButton.addEventListener("click", (e) => {
      e.preventDefault()
      navigateTo("home-page")
    })
  }

  const createFirstCapsuleBtn = document.getElementById("create-first-capsule-btn")
  if (createFirstCapsuleBtn) {
    createFirstCapsuleBtn.addEventListener("click", () => {
      navigateTo("create-page")
    })
  }

  // Tab functionality
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active")
      const tabId = tab.getAttribute("data-tab")
      const tabContent = document.getElementById(`${tabId}-tab`)
      if (tabContent) {
        tabContent.classList.add("active")
      }
    })
  })

  async function updateUser(userId, updatedData) {
    try {
      // First attempt to update on server
      const response = await fetch(`https://timecap.glitch.me/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        // If server update fails, don't throw error, just log and continue with local update
        console.warn("Server update failed, updating locally only")
      } else {
        const result = await response.json()
        console.log("User updated successfully on server:", result)
      }

      // Always update locally regardless of server response
      // Update in localStorage - both users array and currentUser
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u) => u.id === userId)

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData }
        localStorage.setItem("users", JSON.stringify(users))
      }

      // Update currentUser in localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      if (currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updatedData }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      }

      return true // Return success regardless of server response
    } catch (error) {
      console.error("Error in updateUser function:", error)

      // Still update locally even if there was an error in the try block
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u) => u.id === userId)

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData }
        localStorage.setItem("users", JSON.stringify(users))
      }

      // Update currentUser in localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      if (currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updatedData }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      }

      return true // Return success even if there was an error
    }
  }

  // Photo upload
  const photoInput = document.getElementById("photo-input")
  const photoPreview = document.getElementById("photo-preview")
  const selectPhotosBtn = document.getElementById("select-photos-btn")

  // Store uploaded photos
  let uploadedPhotos = []

  if (selectPhotosBtn && photoInput) {
    selectPhotosBtn.addEventListener("click", () => {
      photoInput.click()
    })
  }

  if (photoInput && photoPreview) {
    photoInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        // Check if adding these files would exceed the 6 photo limit
        if (uploadedPhotos.length + e.target.files.length > 6) {
          alert("You can only upload a maximum of 6 photos. Please remove some photos first or select fewer photos.")
          return
        }

        photoPreview.style.display = "grid"

        // Process each file
        Array.from(e.target.files).forEach((file) => {
          const reader = new FileReader()

          reader.onload = (event) => {
            const imageData = event.target.result

            // Add to preview
            const previewItem = document.createElement("div")
            previewItem.className = "file-preview-item"

            // Create a unique ID for this photo
            const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

            previewItem.innerHTML = `
              <img src="${imageData}" alt="Preview">
              <button class="remove-photo-btn" data-id="${photoId}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            `

            photoPreview.appendChild(previewItem)

            // Add event listener to remove button
            previewItem.querySelector(".remove-photo-btn").addEventListener("click", (e) => {
              e.preventDefault()
              const id = e.currentTarget.getAttribute("data-id")
              // Remove from uploadedPhotos array
              const index = uploadedPhotos.findIndex((photo) => photo.id === id)
              if (index !== -1) {
                uploadedPhotos.splice(index, 1)
              }
              // Remove from UI
              previewItem.remove()

              // Hide preview container if no photos left
              if (uploadedPhotos.length === 0) {
                photoPreview.style.display = "none"
              }
            })

            // Store the image data with its ID
            uploadedPhotos.push({
              id: photoId,
              data: imageData,
            })
          }

          reader.readAsDataURL(file)
        })
      }
    })
  }

  // Add CSS for the remove photo button
  const style = document.createElement("style")
  style.textContent = `
    .file-preview-item {
      position: relative;
    }
    
    .remove-photo-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: rgba(255, 255, 255, 0.8);
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      color: #ef4444;
    }
    
    .remove-photo-btn:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  `
  document.head.appendChild(style)

  // Video upload functionality
  const videoInput = document.getElementById("video-input")
  const videoUploadArea = document.getElementById("video-upload-area")
  const selectVideoBtn = document.getElementById("select-video-btn")
  const videoPlaceholder = document.getElementById("video-upload-area")
  const videoPreviewContainer = document.getElementById("video-preview-container")
  const videoPreview = document.getElementById("video-preview")
  const changeVideoBtn = document.getElementById("change-video")
  const removeVideoBtn = document.getElementById("remove-video")
  const removeVideoBtnX = document.querySelector(".remove-video-btn")

  // Store the video data URL
  let videoDataUrl = null

  // Click handler for the select video button
  if (selectVideoBtn && videoInput) {
    selectVideoBtn.addEventListener("click", () => {
      videoInput.click()
    })
  }

  // Change handler for the video input
  if (videoInput) {
    videoInput.addEventListener("change", (e) => {
      handleVideoFile(e.target.files[0])
    })
  }

  // Function to handle the video file
  function handleVideoFile(file) {
    if (!file || !videoPreview || !videoUploadArea || !videoPreviewContainer) return

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert("Video file is too large. Please select a file smaller than 100MB.")
      return
    }

    // Create a URL for the video file
    videoDataUrl = URL.createObjectURL(file)

    // Set the video source and show the preview
    videoPreview.src = videoDataUrl
    videoUploadArea.style.display = "none" // Fixed reference
    videoPreviewContainer.style.display = "block"
  }

  // Change video button handler
  if (changeVideoBtn && videoInput) {
    changeVideoBtn.addEventListener("click", () => {
      videoInput.click()
    })
  }

  // Remove video button handlers (both the X icon and the button)
  function removeVideo() {
    if (!videoPreview || !videoPreviewContainer || !videoUploadArea) return

    videoDataUrl = null
    videoPreview.src = ""
    videoPreviewContainer.style.display = "none"
    videoUploadArea.style.display = "block" // Fixed reference
  }

  if (removeVideoBtn) {
    removeVideoBtn.addEventListener("click", removeVideo)
  }

  if (removeVideoBtnX) {
    removeVideoBtnX.addEventListener("click", removeVideo)
  }

  // Add drag and drop functionality for videos
  if (videoUploadArea) {
    videoUploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      videoUploadArea.classList.add("drag-over")
    })

    videoUploadArea.addEventListener("dragleave", () => {
      videoUploadArea.classList.remove("drag-over")
    })

    videoUploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      videoUploadArea.classList.remove("drag-over")

      if (e.dataTransfer.files.length > 0) {
        handleVideoFile(e.dataTransfer.files[0])
      }
    })
  }

  // Add CSS for the video removal button and drag-over effect
  const videoStyleCSS = document.createElement("style")
  videoStyleCSS.textContent = `
  .video-container {
    position: relative;
  }
  
  .remove-video-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    color: #ef4444;
    z-index: 10;
  }
  
  .remove-video-btn:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  
  .drag-over {
    border-color: #3d7059;
    background-color: rgba(61, 112, 89, 0.05);
  }
`
  document.head.appendChild(videoStyleCSS)

  // Recipients functionality
  const recipientInput = document.getElementById("recipient")
  const recipientDropdown = document.getElementById("recipient-dropdown")
  const recipientTags = document.getElementById("recipient-tags")
  let selectedRecipients = []

  // Update the recipient input event listener to fetch users from server
  if (recipientInput && recipientDropdown) {
    recipientInput.addEventListener("input", async () => {
      const query = recipientInput.value.trim().toLowerCase()

      if (query.length < 2) {
        recipientDropdown.innerHTML = ""
        recipientDropdown.classList.remove("active")
        return
      }

      try {
        // Fetch users from server
        const response = await fetch(`https://timecap.glitch.me/api/users/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error("Failed to search users")
        }

        const { users } = await response.json()

        // Display results
        if (users && users.length > 0) {
          recipientDropdown.innerHTML = ""

          users.forEach((user) => {
            // Skip if already selected
            if (selectedRecipients.some((r) => r.id === user.id)) return

            const item = document.createElement("div")
            item.className = "recipient-dropdown-item"
            item.innerHTML = `
            <div class="recipient-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="recipient-info">
              <div class="recipient-name">${user.name}</div>
              <div class="recipient-email">${user.email}</div>
            </div>
          `

            item.addEventListener("click", () => {
              addRecipient(user)
              recipientInput.value = ""
              recipientDropdown.innerHTML = ""
              recipientDropdown.classList.remove("active")
            })

            recipientDropdown.appendChild(item)
          })

          recipientDropdown.classList.add("active")
        } else {
          recipientDropdown.innerHTML = ""
          recipientDropdown.classList.remove("active")
        }
      } catch (error) {
        console.error("Error searching users:", error)

        // Fallback to local search if server search fails
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const filteredUsers = allUsers.filter(
          (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
        )

        if (filteredUsers.length > 0) {
          recipientDropdown.innerHTML = ""

          filteredUsers.forEach((user) => {
            // Skip if already selected
            if (selectedRecipients.some((r) => r.id === user.id)) return

            const item = document.createElement("div")
            item.className = "recipient-dropdown-item"
            item.innerHTML = `
            <div class="recipient-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="recipient-info">
              <div class="recipient-name">${user.name}</div>
              <div class="recipient-email">${user.email}</div>
            </div>
          `

            item.addEventListener("click", () => {
              addRecipient(user)
              recipientInput.value = ""
              recipientDropdown.innerHTML = ""
              recipientDropdown.classList.remove("active")
            })

            recipientDropdown.appendChild(item)
          })

          recipientDropdown.classList.add("active")
        } else {
          recipientDropdown.innerHTML = ""
          recipientDropdown.classList.remove("active")
        }
      }
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        recipientInput &&
        recipientDropdown &&
        !recipientInput.contains(e.target) &&
        !recipientDropdown.contains(e.target)
      ) {
        recipientDropdown.classList.remove("active")
      }
    })
  }

  // Add recipient
  function addRecipient(user) {
    if (!recipientTags) return

    if (selectedRecipients.some((r) => r.id === user.id)) return

    selectedRecipients.push(user)

    const tag = document.createElement("div")
    tag.className = "recipient-tag"
    tag.innerHTML = `
      <span>${user.name}</span>
      <span class="recipient-tag-remove" data-id="${user.id}">×</span>
    `

    tag.querySelector(".recipient-tag-remove").addEventListener("click", () => {
      removeRecipient(user.id)
    })

    recipientTags.appendChild(tag)
  }

  // Remove recipient
  function removeRecipient(userId) {
    if (!recipientTags) return

    selectedRecipients = selectedRecipients.filter((r) => r.id !== userId)

    const tags = recipientTags.querySelectorAll(".recipient-tag")
    tags.forEach((tag) => {
      const removeBtn = tag.querySelector(".recipient-tag-remove")
      if (removeBtn && removeBtn.getAttribute("data-id") === userId) {
        tag.remove()
      }
    })
  }

  // Create capsule form submission
  const createCapsuleForm = document.getElementById("create-capsule-form")

  // Load user's capsules
  async function loadCapsules() {
    const capsulesContainer = document.getElementById("capsules-container")
    const noCapsules = document.getElementById("no-capsules")

    if (!capsulesContainer || !noCapsules) return

    try {
      // Try to fetch capsules from server
      const response = await fetch(`https://timecap.glitch.me/api/capsules?userId=${currentUser.id}`)

      let userCapsules = []

      if (response.ok) {
        userCapsules = await response.json()
      } else {
        // Fallback to localStorage if server request fails
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        userCapsules = allCapsules.filter((capsule) => capsule.userId === currentUser.id)
      }

      if (userCapsules.length === 0) {
        noCapsules.style.display = "block"
        return
      }

      noCapsules.style.display = "none"

      // Clear previous capsules
      const existingCapsules = capsulesContainer.querySelectorAll(".capsule-card")
      existingCapsules.forEach((capsule) => capsule.remove())

      // Sort capsules by creation date (newest first)
      userCapsules.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Create capsule cards
      userCapsules.forEach((capsule) => {
        const isDelivered = new Date(capsule.deliveryDate) <= new Date()
        const isSharedWithMe = capsule.isSharedWithMe === true
        const isArchived = capsule.isArchived === true

        // Skip archived capsules
        if (isArchived) return

        const capsuleCard = document.createElement("div")
        capsuleCard.className = "capsule-card"

        let contentTypes = ""
        if (capsule.message) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Letter
            </div>
          `
        }

        if (capsule.hasImages) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photos
            </div>
          `
        }

        if (capsule.hasVideo) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </div>
          `
        }

        // Show recipients count if any
        let recipientsInfo = ""
        if (capsule.recipients && capsule.recipients.length > 0) {
          recipientsInfo = `
          <div class="capsule-recipients">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Shared with ${capsule.recipients.length} ${capsule.recipients.length === 1 ? "person" : "people"}
          </div>
        `
        }

        // Add shared badge if this capsule was shared with the current user
        let sharedBadge = ""
        if (isSharedWithMe) {
          sharedBadge = `
          <div class="capsule-shared-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Shared with you by ${capsule.userName}</span>
          </div>
        `
        }

        capsuleCard.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h2 class="text-xl font-semibold text-forest-green-800">${capsule.title}</h2>
                <div class="capsule-status ${isDelivered ? "status-delivered" : "status-sealed"}">
                  ${isDelivered ? "Delivered" : "Sealed"}
                </div>
              </div>
              
              ${sharedBadge}
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" style="margin-right: 0.25rem;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  Created: ${new Date(capsule.createdAt).toLocaleDateString()} | Delivery: ${new Date(capsule.deliveryDate).toLocaleDateString()}
                </span>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-2">
                ${contentTypes}
              </div>
              
              ${recipientsInfo}
            </div>
            
            <div class="flex gap-3" style="gap: 0.8rem;">
              <button class="btn btn-outline btn-sm view-capsule-btn" data-id="${capsule.id}" ${!isDelivered ? "disabled" : ""}>
                ${isDelivered ? "View" : "Sealed"}
              </button>
              ${
                !isSharedWithMe
                  ? `
                <button class="btn btn-danger btn-sm delete-capsule-btn" data-id="${capsule.id}">
                  Delete
                </button>
              `
                  : `
                <button class="btn btn-secondary btn-sm archive-capsule-btn" data-id="${capsule.id}">
                  Archive
                </button>
              `
              }
            </div>
          </div>
        `

        capsulesContainer.appendChild(capsuleCard)
      })

      // Add event listeners to view, delete, and archive buttons
      document.querySelectorAll(".view-capsule-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          viewCapsule(capsuleId)
        })
      })

      document.querySelectorAll(".delete-capsule-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          openDeleteModal(capsuleId)
        })
      })

      document.querySelectorAll(".archive-capsule-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          archiveCapsule(capsuleId)
        })
      })
    } catch (error) {
      console.error("Error loading capsules:", error)
      alert("Failed to load your time capsules. Please try again later.")
    }
  }

  // Add the function to load archived capsules
  async function loadArchivedCapsules() {
    const capsulesContainer = document.getElementById("capsules-container")
    const noCapsules = document.getElementById("no-capsules")

    if (!capsulesContainer || !noCapsules) return

    try {
      // Try to fetch capsules from server
      const response = await fetch(`https://timecap.glitch.me/api/capsules?userId=${currentUser.id}`)

      let userCapsules = []

      if (response.ok) {
        userCapsules = await response.json()
      } else {
        // Fallback to localStorage if server request fails
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        userCapsules = allCapsules.filter((capsule) => capsule.userId === currentUser.id)
      }

      // Filter only archived capsules
      const archivedCapsules = userCapsules.filter((capsule) => capsule.isArchived === true)

      if (archivedCapsules.length === 0) {
        noCapsules.style.display = "block"
        noCapsules.innerHTML = `
          <h2 class="mb-4">No Archived Capsules</h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">You don't have any archived capsules yet.</p>
          <button class="btn btn-primary" id="view-active-capsules-btn">View Active Capsules</button>
        `

        // Add event listener for the view active capsules button
        const viewActiveCapsules = document.getElementById("view-active-capsules-btn")
        if (viewActiveCapsules) {
          viewActiveCapsules.addEventListener("click", () => {
            loadCapsules()
          })
        }

        return
      }

      noCapsules.style.display = "none"

      // Clear previous capsules
      const existingCapsules = capsulesContainer.querySelectorAll(".capsule-card")
      existingCapsules.forEach((capsule) => capsule.remove())

      // Sort capsules by creation date (newest first)
      archivedCapsules.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Create capsule cards
      archivedCapsules.forEach((capsule) => {
        const isDelivered = new Date(capsule.deliveryDate) <= new Date()
        const isSharedWithMe = capsule.isSharedWithMe === true

        const capsuleCard = document.createElement("div")
        capsuleCard.className = "capsule-card"

        let contentTypes = ""
        if (capsule.message) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Letter
            </div>
          `
        }

        if (capsule.hasImages) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photos
            </div>
          `
        }

        if (capsule.hasVideo) {
          contentTypes += `
            <div class="capsule-content-type">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </div>
          `
        }

        // Show recipients count if any
        let recipientsInfo = ""
        if (capsule.recipients && capsule.recipients.length > 0) {
          recipientsInfo = `
          <div class="capsule-recipients">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Shared with ${capsule.recipients.length} ${capsule.recipients.length === 1 ? "person" : "people"}
          </div>
        `
        }

        // Add shared badge if this capsule was shared with the current user
        let sharedBadge = ""
        if (isSharedWithMe) {
          sharedBadge = `
          <div class="capsule-shared-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Shared with you by ${capsule.userName}</span>
          </div>
        `
        }

        // Add archived badge
        const archivedBadge = `
          <div class="capsule-archived-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Archived</span>
          </div>
        `

        capsuleCard.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h2 class="text-xl font-semibold text-forest-green-800">${capsule.title}</h2>
                <div class="capsule-status ${isDelivered ? "status-delivered" : "status-sealed"}">
                  ${isDelivered ? "Delivered" : "Sealed"}
                </div>
              </div>
              
              ${sharedBadge}
              ${archivedBadge}
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" style="margin-right: 0.25rem;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  Created: ${new Date(capsule.createdAt).toLocaleDateString()} | Delivery: ${new Date(capsule.deliveryDate).toLocaleDateString()}
                </span>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-2">
                ${contentTypes}
              </div>
              
              ${recipientsInfo}
            </div>
            
            <div class="flex gap-3" style="gap: 0.8rem;">
              <button class="btn btn-outline btn-sm view-capsule-btn" data-id="${capsule.id}" ${!isDelivered ? "disabled" : ""}>
                ${isDelivered ? "View" : "Sealed"}
              </button>
              <button class="btn btn-primary btn-sm unarchive-capsule-btn" data-id="${capsule.id}">
                Unarchive
              </button>
            </div>
          </div>
        `

        capsulesContainer.appendChild(capsuleCard)
      })

      // Add event listeners to view and unarchive buttons
      document.querySelectorAll(".view-capsule-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          viewCapsule(capsuleId)
        })
      })

      document.querySelectorAll(".unarchive-capsule-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          unarchiveCapsule(capsuleId)
        })
      })

      // Add a button to switch back to active capsules
      const switchButton = document.createElement("div")
      switchButton.className = "text-center mt-4"
      switchButton.innerHTML = `
        <button class="btn btn-outline" id="view-active-capsules-btn">View Active Capsules</button>
      `
      capsulesContainer.appendChild(switchButton)

      const viewActiveCapsules = document.getElementById("view-active-capsules-btn")
      if (viewActiveCapsules) {
        viewActiveCapsules.addEventListener("click", () => {
          loadCapsules()
        })
      }
    } catch (error) {
      console.error("Error loading archived capsules:", error)
      alert("Failed to load your archived capsules. Please try again later.")
    }
  }

  // Add the archive capsule function
  async function archiveCapsule(capsuleId) {
    try {
      const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to archive capsule")
      }

      // Show success message
      alert("Capsule archived successfully")

      // Reload the entire page
      window.location.reload()
    } catch (error) {
      console.error("Error archiving capsule:", error)
      alert("Failed to archive capsule. Please try again later.")

      // Fallback to local storage if server fails
      try {
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        const capsuleIndex = allCapsules.findIndex((c) => c.id === capsuleId)

        if (capsuleIndex !== -1) {
          allCapsules[capsuleIndex].isArchived = true
          localStorage.setItem("timeCapsules", JSON.stringify(allCapsules))
          loadCapsules()
        }
      } catch (localError) {
        console.error("Error with local archive fallback:", localError)
      }
    }
  }

  // Add the unarchive capsule function
  async function unarchiveCapsule(capsuleId) {
    try {
      const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}/unarchive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to unarchive capsule")
      }

      // Show success message
      alert("Capsule unarchived successfully")

      // Reload the entire page
      window.location.reload()
    } catch (error) {
      console.error("Error unarchiving capsule:", error)
      alert("Failed to unarchive capsule. Please try again later.")

      // Fallback to local storage if server fails
      try {
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        const capsuleIndex = allCapsules.findIndex((c) => c.id === capsuleId)

        if (capsuleIndex !== -1) {
          allCapsules[capsuleIndex].isArchived = false
          localStorage.setItem("timeCapsules", JSON.stringify(allCapsules))
          loadArchivedCapsules()
        }
      } catch (localError) {
        console.error("Error with local unarchive fallback:", localError)
      }
    }
  }

  // Fix the create capsule form submission to properly handle file uploads
  if (createCapsuleForm) {
    createCapsuleForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const title = document.getElementById("title")?.value
      const deliveryDate = document.getElementById("delivery-date")?.value
      const message = document.getElementById("message")?.value

      if (!title || !deliveryDate) {
        alert("Please provide a title and delivery date.")
        return
      }

      // Show loading indicator or disable submit button
      const submitButton = e.target.querySelector('button[type="submit"]')
      const originalButtonText = submitButton ? submitButton.textContent : ""
      if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = "Creating..."
      }

      try {
        // Generate a unique ID for the capsule
        const capsuleId = `capsule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Create FormData for file uploads
        const formData = new FormData()
        formData.append("title", title)
        formData.append("deliveryDate", new Date(deliveryDate).toISOString())
        formData.append("message", message || "")
        formData.append("userId", currentUser.id)
        formData.append("userName", currentUser.name)

        // Add recipients
        if (selectedRecipients.length > 0) {
          formData.append("recipients", JSON.stringify(selectedRecipients))
        }

        // Add photos if any
        if (uploadedPhotos.length > 0) {
          for (let i = 0; i < uploadedPhotos.length; i++) {
            const photoData = uploadedPhotos[i].data // Access the data property
            // Convert base64 to blob
            const byteString = atob(photoData.split(",")[1])
            const mimeString = photoData.split(",")[0].split(":")[1].split(";")[0]
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let j = 0; j < byteString.length; j++) {
              ia[j] = byteString.charCodeAt(j)
            }
            const blob = new Blob([ab], { type: mimeString })

            // Use 'photo' as the field name for ALL photos
            formData.append("photo", blob, `photo_${Date.now()}_${i}.jpg`)
          }
          formData.append("hasImages", "true")
        } else {
          formData.append("hasImages", "false")
        }

        // Add video if uploaded
        if (videoDataUrl) {
          try {
            // Fetch the blob from the URL
            const response = await fetch(videoDataUrl)
            const videoBlob = await response.blob()
            formData.append("video", videoBlob, `video_${Date.now()}.webm`)
            formData.append("hasVideo", "true")
          } catch (videoError) {
            console.error("Error processing video:", videoError)
            formData.append("hasVideo", "false")
          }
        } else {
          formData.append("hasVideo", "false")
        }

        // Log the form data for debugging
        console.log("Sending form data to server...")
        for (const pair of formData.entries()) {
          if (pair[0] !== "photo" && pair[0] !== "video") {
            console.log(`${pair[0]}: ${pair[1]}`)
          } else {
            console.log(`${pair[0]}: [Binary data]`)
          }
        }

        // Send data to server
        const response = await fetch("https://timecap.glitch.me/api/capsules", {
          method: "POST",
          body: formData,
        })

        // Validate the response
        if (!response.ok) {
          const contentType = response.headers.get("Content-Type")
          if (contentType && contentType.includes("application/json")) {
            const error = await response.json()
            throw new Error(error.error || "Failed to create time capsule")
          } else {
            const rawError = await response.text()
            console.error("Raw server error response:", rawError)
            throw new Error("Server returned an invalid response")
          }
        }

        const result = await response.json()
        console.log("Server response:", result)

        // For backward compatibility, also store in localStorage
        const capsule = {
          id: result.capsuleId || capsuleId,
          title,
          message,
          recipients: selectedRecipients,
          createdAt: new Date().toISOString(),
          deliveryDate: new Date(deliveryDate).toISOString(),
          photos: [...uploadedPhotos],
          videoData: videoDataUrl,
          hasImages: uploadedPhotos.length > 0,
          hasVideo: videoDataUrl !== null,
          userId: currentUser.id,
          userName: currentUser.name,
        }

        const existingCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        localStorage.setItem("timeCapsules", JSON.stringify([...existingCapsules, capsule]))

        // If there are recipients, share the capsule with them
        if (selectedRecipients.length > 0) {
          try {
            await shareCapsuleWithRecipients(result.capsuleId || capsuleId, selectedRecipients)
          } catch (shareError) {
            console.error("Error sharing capsule:", shareError)
            // Continue even if sharing fails
          }
        }

        alert("Time Capsule created successfully!")

        // Reset form
        createCapsuleForm.reset()
        if (photoPreview) {
          photoPreview.innerHTML = ""
          photoPreview.style.display = "none"
        }
        uploadedPhotos = []
        videoDataUrl = null
        if (videoPreviewContainer) videoPreviewContainer.style.display = "none"
        if (videoUploadArea) videoUploadArea.style.display = "block"

        // Clear recipients
        selectedRecipients = []
        if (recipientTags) recipientTags.innerHTML = ""

        // Navigate to view page
        navigateTo("view-page")
        loadCapsules()
      } catch (error) {
        console.error("Error creating capsule:", error)
        alert(error.message || "Failed to create time capsule. Please try again.")
      } finally {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false
          submitButton.textContent = originalButtonText
        }
      }
    })
  }

  // Fix the loadSharedCapsuleView function to properly display images and videos
  function loadSharedCapsuleView(capsule) {
    // Show shared capsule page
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })
    const sharedCapsulePage = document.getElementById("shared-capsule-page")
    if (!sharedCapsulePage) return

    sharedCapsulePage.classList.add("active")

    // Set capsule title
    const sharedCapsuleTitle = document.getElementById("shared-capsule-title")
    if (sharedCapsuleTitle) {
      sharedCapsuleTitle.textContent = capsule.title
    }

    // Set owner info
    const ownerInitial = document.querySelector("#shared-capsule-owner .profile-initial")
    const ownerName = document.querySelector("#shared-capsule-owner .profile-name")

    if (ownerInitial) {
      ownerInitial.textContent = capsule.userName.charAt(0).toUpperCase()
    }

    if (ownerName) {
      ownerName.textContent = capsule.userName
    }

    // Load capsule content
    const contentContainer = document.getElementById("shared-capsule-content")
    if (!contentContainer) return

    contentContainer.innerHTML = ""

    // Add message if exists
    if (capsule.message) {
      const messageSection = document.createElement("div")
      messageSection.className = "mb-6"
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
    `
      contentContainer.appendChild(messageSection)
    }

    // Add photos if exist
    if (capsule.hasImages) {
      const photosSection = document.createElement("div")
      photosSection.className = "mb-6"

      let photosHTML = `
      <div class="content-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3>Photos</h3>
        <button class="btn btn-primary save-all-photos-btn ml-auto">Save All Photos</button>
      </div>
      <div class="image-gallery">
    `

      // Store photo URLs for the "Save All" button
      const photoUrls = []

      // Handle different photo formats
      if (Array.isArray(capsule.photos)) {
        capsule.photos.forEach((photo, index) => {
          let photoUrl = ""

          // Check if it's a base64 string or a file path
          if (typeof photo === "object" && photo.data) {
            // It's an object with data property (from our updated structure)
            photoUrl = photo.data
          } else if (typeof photo === "string" && photo.startsWith("data:image")) {
            // It's a base64 string
            photoUrl = photo
          } else if (typeof photo === "string") {
            // It's a file path, make sure it's a full URL
            photoUrl = photo.startsWith("http")
              ? photo
              : `https://timecap.glitch.me${photo.startsWith("/") ? "" : "/"}${photo}`
          }

          if (photoUrl) {
            photoUrls.push({ url: photoUrl, filename: `time-capsule-photo-${index + 1}.jpg` })

            photosHTML += `
            <div class="gallery-item">
              <img src="${photoUrl}" alt="Time Capsule Photo" 
                   onerror="this.onerror=null; this.src='https://timecap.glitch.me/photo/${typeof photo === "string" ? photo.split("/").pop() : ""}';">
              <a href="${photoUrl}" download="time-capsule-photo-${index + 1}.jpg" class="save-photo-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save
              </a>
            </div>
          `
          }
        })
      }

      photosHTML += `</div>`
      photosSection.innerHTML = photosHTML
      contentContainer.appendChild(photosSection)

      // Add event listener for "Save All Photos" button
      const saveAllBtn = photosSection.querySelector(".save-all-photos-btn")
      if (saveAllBtn && photoUrls.length > 0) {
        saveAllBtn.addEventListener("click", () => {
          photoUrls.forEach((photo) => {
            const link = document.createElement("a")
            link.href = photo.url
            link.download = photo.filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Small delay between downloads to prevent browser issues
            setTimeout(() => {}, 100)
          })
        })
      }
    }

    // Add video if exists
    if (capsule.hasVideo) {
      const videoSection = document.createElement("div")
      videoSection.className = "mb-6"

      let videoSrc = ""

      // Handle different video formats
      if (capsule.videoData && typeof capsule.videoData === "string" && capsule.videoData.startsWith("blob:")) {
        // It's a blob URL
        videoSrc = capsule.videoData
      } else if (capsule.videoPath && typeof capsule.videoPath === "string") {
        // It's a file path
        videoSrc = capsule.videoPath.startsWith("http")
          ? capsule.videoPath
          : `https://timecap.glitch.me${capsule.videoPath.startsWith("/") ? "" : "/"}${capsule.videoPath}`
      }

      videoSection.innerHTML = `
      <div class="content-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h3>Video Message</h3>
        <a href="${videoSrc}" download="time-capsule-video.mp4" class="btn btn-primary ml-auto save-video-btn">Save Video</a>
      </div>
      <div class="video-container">
        <video controls src="${videoSrc}" 
               onerror="this.onerror=null; this.src='https://timecap.glitch.me/video/${capsule.videoPath ? capsule.videoPath.split("/").pop() : ""}';">
          Your browser does not support the video tag.
        </video>
      </div>
    `
      contentContainer.appendChild(videoSection)
    }

    // Add archive button for shared capsules
    if (capsule.isSharedWithMe && !capsule.isArchived) {
      const archiveButtonSection = document.createElement("div")
      archiveButtonSection.className = "text-center mt-4"
      archiveButtonSection.innerHTML = `
      <button class="btn btn-secondary archive-shared-capsule-btn" data-id="${capsule.id}">
        Archive This Capsule
      </button>
    `
      contentContainer.appendChild(archiveButtonSection)

      // Add event listener for the archive button
      const archiveBtn = archiveButtonSection.querySelector(".archive-shared-capsule-btn")
      if (archiveBtn) {
        archiveBtn.addEventListener("click", function () {
          const capsuleId = this.getAttribute("data-id")
          archiveCapsule(capsuleId)
          // Navigate back to view page after archiving
          navigateTo("view-page")
          loadCapsules()
        })
      }
    }
  }

  // Add CSS for the save buttons
  const saveButtonsStyle = document.createElement("style")
  saveButtonsStyle.textContent = `
  .save-photo-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(61, 112, 89, 0.9);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
  }
  
  .save-photo-btn:hover {
    background-color: rgba(61, 112, 89, 1);
  }
  
  .gallery-item {
    position: relative;
  }
  
  .content-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .content-header h3 {
    margin-left: 0.5rem;
    margin-right: auto;
  }
`
  document.head.appendChild(saveButtonsStyle)

  // Delete modal
  let capsuleToDelete = null
  const deleteModal = document.getElementById("delete-modal")
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn")

  function openDeleteModal(capsuleId) {
    if (!deleteModal) return

    capsuleToDelete = capsuleId
    deleteModal.classList.add("active")
  }

  function closeDeleteModal() {
    if (!deleteModal) return

    deleteModal.classList.remove("active")
    capsuleToDelete = null
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", async () => {
      if (capsuleToDelete) {
        try {
          // Try to delete from server
          const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleToDelete}`, {
            method: "DELETE",
          })

          // Also delete from localStorage for backward compatibility
          const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
          const updatedCapsules = allCapsules.filter((c) => c.id !== capsuleToDelete)
          localStorage.setItem("timeCapsules", JSON.stringify(updatedCapsules))

          // Close modal
          closeDeleteModal()

          alert("Time Capsule deleted successfully.")

          // Reload the entire page
          window.location.reload()
        } catch (error) {
          console.error("Error deleting capsule:", error)
          alert("Failed to delete time capsule. Please try again later.")
        }
      }
    })
  }

  // Recipients modal
  const recipientsModal = document.getElementById("recipients-modal")
  const recipientSearch = document.getElementById("recipient-search")
  const recipientSearchResults = document.getElementById("recipient-search-results")
  const selectedRecipientsContainer = document.getElementById("selected-recipients")
  const confirmRecipientsBtn = document.getElementById("confirm-recipients-btn")
  let modalSelectedRecipients = []

  function openRecipientsModal() {
    if (!recipientsModal) return

    // Initialize with current recipients
    modalSelectedRecipients = [...selectedRecipients]
    updateSelectedRecipientsUI()
    recipientsModal.classList.add("active")
  }

  function closeRecipientsModal() {
    if (!recipientsModal || !recipientSearch || !recipientSearchResults) return

    recipientsModal.classList.remove("active")
    recipientSearch.value = ""
    recipientSearchResults.innerHTML = ""
    recipientSearchResults.classList.remove("active")
  }

  function updateSelectedRecipientsUI() {
    if (!selectedRecipientsContainer) return

    selectedRecipientsContainer.innerHTML = ""

    modalSelectedRecipients.forEach((recipient) => {
      const tag = document.createElement("div")
      tag.className = "recipient-tag"
      tag.innerHTML = `
        <span>${recipient.name}</span>
        <span class="recipient-tag-remove" data-id="${recipient.id}">×</span>
      `

      tag.querySelector(".recipient-tag-remove").addEventListener("click", () => {
        modalSelectedRecipients = modalSelectedRecipients.filter((r) => r.id !== recipient.id)
        updateSelectedRecipientsUI()
      })

      selectedRecipientsContainer.appendChild(tag)
    })
  }

  // Update the recipient search in the modal as well
  if (recipientSearch && recipientSearchResults) {
    recipientSearch.addEventListener("input", async () => {
      const query = recipientSearch.value.trim().toLowerCase()

      if (query.length < 2) {
        recipientSearchResults.innerHTML = ""
        recipientSearchResults.classList.remove("active")
        return
      }

      try {
        // Fetch users from server
        const response = await fetch(`https://timecap.glitch.me/api/users/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error("Failed to search users")
        }

        const { users } = await response.json()

        // Display results
        if (users && users.length > 0) {
          recipientSearchResults.innerHTML = ""

          users.forEach((user) => {
            // Skip if already selected
            if (modalSelectedRecipients.some((r) => r.id === user.id)) return

            const item = document.createElement("div")
            item.className = "recipient-search-item"
            item.innerHTML = `
            <div class="recipient-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="recipient-info">
              <div class="recipient-name">${user.name}</div>
              <div class="recipient-email">${user.email}</div>
            </div>
          `

            item.addEventListener("click", () => {
              if (!modalSelectedRecipients.some((r) => r.id === user.id)) {
                modalSelectedRecipients.push(user)
                updateSelectedRecipientsUI()
              }
              recipientSearch.value = ""
              recipientSearchResults.innerHTML = ""
              recipientSearchResults.classList.remove("active")
            })

            recipientSearchResults.appendChild(item)
          })

          recipientSearchResults.classList.add("active")
        } else {
          recipientSearchResults.innerHTML = ""
          recipientSearchResults.classList.remove("active")
        }
      } catch (error) {
        console.error("Error searching users:", error)

        // Fallback to local search if server search fails
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const filteredUsers = allUsers.filter(
          (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
        )

        if (filteredUsers.length > 0) {
          recipientSearchResults.innerHTML = ""

          filteredUsers.forEach((user) => {
            // Skip if already selected
            if (modalSelectedRecipients.some((r) => r.id === user.id)) return

            const item = document.createElement("div")
            item.className = "recipient-search-item"
            item.innerHTML = `
            <div class="recipient-avatar">${user.name.charAt(0).toUpperCase()}</div>
            <div class="recipient-info">
              <div class="recipient-name">${user.name}</div>
              <div class="recipient-email">${user.email}</div>
            </div>
          `

            item.addEventListener("click", () => {
              if (!modalSelectedRecipients.some((r) => r.id === user.id)) {
                modalSelectedRecipients.push(user)
                updateSelectedRecipientsUI()
              }
              recipientSearch.value = ""
              recipientSearchResults.innerHTML = ""
              recipientSearchResults.classList.remove("active")
            })

            recipientSearchResults.appendChild(item)
          })

          recipientSearchResults.classList.add("active")
        } else {
          recipientSearchResults.innerHTML = ""
          recipientSearchResults.classList.remove("active")
        }
      }
    })
  }

  if (confirmRecipientsBtn && recipientTags) {
    confirmRecipientsBtn.addEventListener("click", () => {
      selectedRecipients = [...modalSelectedRecipients]

      // Update the recipient tags in the main form
      recipientTags.innerHTML = ""
      selectedRecipients.forEach((user) => {
        const tag = document.createElement("div")
        tag.className = "recipient-tag"
        tag.innerHTML = `
          <span>${user.name}</span>
          <span class="recipient-tag-remove" data-id="${user.id}">×</span>
        `

        tag.querySelector(".recipient-tag-remove").addEventListener("click", () => {
          removeRecipient(user.id)
        })

        recipientTags.appendChild(tag)
      })

      closeRecipientsModal()
    })
  }

  // Add this function to your JavaScript code
  function closeProfileModal() {
    if (!profileEditModal || !profileErrorMessage) return

    profileEditModal.classList.remove("active")

    // Clear any error messages
    profileErrorMessage.style.display = "none"
  }

  // Add this event listener for the profile edit modal
  window.addEventListener("click", (event) => {
    if (profileEditModal && event.target === profileEditModal) {
      closeProfileModal()
    }
  })

  // Profile Edit Modal
  function openProfileModal() {
    if (!profileEditModal || !profileNameInput || !profileEmailInput || !profileModalInitial || !profileModalImage)
      return

    // Fill form with current user data
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    profileNameInput.value = currentUser.name || ""
    profileEmailInput.value = currentUser.email || ""

    // Set profile image or initial
    if (currentUser.profileImage) {
      profileModalInitial.style.display = "none"
      profileModalImage.style.display = "block"
      profileModalImage.src = currentUser.profileImage
    } else {
      profileModalInitial.style.display = "block"
      profileModalImage.style.display = "none"
      profileModalInitial.textContent = currentUser.name.charAt(0).toUpperCase()
    }

    // Show modal
    profileEditModal.classList.add("active")
  }

  if (profileImageInput && profileModalInitial && profileModalImage) {
    profileImageInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader()

        reader.onload = (event) => {
          profileModalInitial.style.display = "none"
          profileModalImage.style.display = "block"
          profileModalImage.src = event.target.result
        }

        reader.readAsDataURL(e.target.files[0])
      }
    })
  }

  // Update the save profile button event handler to reload the page after success
  if (saveProfileBtn && profileNameInput && profileEmailInput && profileModalImage && profileErrorMessage) {
    saveProfileBtn.addEventListener("click", async () => {
      const name = profileNameInput.value.trim()
      const email = profileEmailInput.value.trim()
      const profileImage = profileModalImage.style.display === "block" ? profileModalImage.src : null

      if (!name) {
        profileErrorMessage.textContent = "Name is required"
        profileErrorMessage.style.display = "block"
        return
      }

      if (!email) {
        profileErrorMessage.textContent = "Email is required"
        profileErrorMessage.style.display = "block"
        return
      }

      try {
        // Get current user data
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))

        // Update user data
        const updatedUser = {
          ...currentUser,
          name,
          email,
          profileImage,
        }

        // Try to update on server first
        try {
          const response = await fetch(`https://timecap.glitch.me/api/users/${currentUser.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to update profile on server")
          }
        } catch (serverError) {
          console.error("Server update failed:", serverError)
        }

        // Update locally
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        // Also update in users array if it exists
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u) => u.id === currentUser.id)
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser }
          localStorage.setItem("users", JSON.stringify(users))
        }

        // IMPORTANT: Update userName in all capsules created by this user
        const allCapsules = JSON.parse(localStorage.getItem("timeCapsules") || "[]")
        const updatedCapsules = allCapsules.map((capsule) => {
          if (capsule.userId === currentUser.id) {
            return { ...capsule, userName: name }
          }
          return capsule
        })
        localStorage.setItem("timeCapsules", JSON.stringify(updatedCapsules))

        // Show success message
        alert("Profile updated successfully!")

        // Reload the page
        window.location.reload()
      } catch (error) {
        console.error("Error updating profile:", error)
        profileErrorMessage.textContent = "Failed to update profile. Please try again."
        profileErrorMessage.style.display = "block"
      }
    })
  }

  // Navigation function
  function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })

    // Show the selected page
    const targetPage = document.getElementById(pageId)
    if (targetPage) {
      targetPage.classList.add("active")
    }

    // Scroll to top
    window.scrollTo(0, 0)
  }

  // Declare the functions
  async function loadSharedCapsule(capsuleId) {
    try {
      const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}`)

      if (!response.ok) {
        throw new Error("Failed to load shared capsule")
      }

      const capsule = await response.json()

      loadSharedCapsuleView(capsule)
    } catch (error) {
      console.error("Error loading shared capsule:", error)
      alert("Failed to load shared time capsule. Please try again later.")
    }
  }

  async function viewCapsule(capsuleId) {
    try {
      const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}`)

      if (!response.ok) {
        throw new Error("Failed to load capsule")
      }

      const capsule = await response.json()

      loadSharedCapsuleView(capsule)
    } catch (error) {
      console.error("Error loading capsule:", error)
      alert("Failed to load time capsule. Please try again later.")
    }
  }

  async function shareCapsuleWithRecipients(capsuleId, recipients) {
    try {
      const response = await fetch(`https://timecap.glitch.me/api/capsules/${capsuleId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: recipients.map((r) => r.id),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to share capsule")
      }

      console.log("Capsule shared successfully with recipients")
    } catch (error) {
      console.error("Error sharing capsule:", error)
      throw error // Re-throw the error so the calling function knows it failed
    }
  }
})

// Blob Background Animation
;(() => {
  const canvas = document.getElementById("blob-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Blob parameters
  const blobs = [
    { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 200, color: "rgba(47, 133, 90, 0.1)", speed: 0.5 },
    { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: "rgba(47, 133, 90, 0.08)", speed: 0.3 },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 300, color: "rgba(184, 151, 60, 0.07)", speed: 0.4 },
  ]

  let angle = 0

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    angle += 0.01

    blobs.forEach((blob, index) => {
      // Update blob position with a gentle floating motion
      const offsetX = Math.sin(angle * blob.speed + index) * 30
      const offsetY = Math.cos(angle * blob.speed + index) * 30

      // Draw blob
      ctx.beginPath()
      ctx.fillStyle = blob.color

      // Create a more organic shape using bezier curves
      const points = 8
      const angleStep = (Math.PI * 2) / points
      const variationAmount = blob.radius * 0.2

      for (let i = 0; i <= points; i++) {
        const pointAngle = i * angleStep
        const variation = Math.sin(angle * 2 + i) * variationAmount
        const radius = blob.radius + variation

        const x = blob.x + offsetX + Math.cos(pointAngle) * radius
        const y = blob.y + offsetY + Math.sin(pointAngle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          const prevPointAngle = (i - 1) * angleStep
          const prevVariation = Math.sin(angle * 2 + (i - 1)) * variationAmount
          const prevRadius = blob.radius + prevVariation

          const prevX = blob.x + offsetX + Math.cos(prevPointAngle) * prevRadius
          const prevY = blob.y + offsetY + Math.sin(prevPointAngle) * prevRadius

          const cp1x = prevX + Math.cos(prevPointAngle - Math.PI / 2) * radius * 0.4
          const cp1y = prevY + Math.sin(prevPointAngle - Math.PI / 2) * radius * 0.4
          const cp2x = x + Math.cos(pointAngle + Math.PI / 2) * radius * 0.4
          const cp2y = y + Math.sin(pointAngle + Math.PI / 2) * radius * 0.4

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        }
      }

      ctx.closePath()
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  animate()
})()

