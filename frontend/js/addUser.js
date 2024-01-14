(function () {
  const form = document.getElementById('add-user-form');
  const dialog = document.getElementById('add-user-dialog');
  const showDialogBtn = document.getElementById('add-user-btn');
  const closeDialogBtn = document.getElementById('close-dialog-btn');
  const performSaveBtn = document.getElementById('perform-save-btn');
  const errorContainer = document.getElementById('error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  showDialogBtn.addEventListener('click', () => {
    dialog.showModal();
  })

  closeDialogBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
  })

  performSaveBtn.addEventListener('click', async () => {
    try {
      const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
      }

      const errorMessages = validateForm(data);
      if (errorMessages.length) throw new Error(errorMessages.join('\n'));

      await performAddUser(data);
      await getUsers();

      dialog.close();
    } catch (error) {
      errorContainer.textContent = error.message
    }
  })
})()

function validateForm (data) {
  const messages = []
  if (!data.username) messages.push('username is required');
  if (!data.email) messages.push('email is required');
  if (!data.password) messages.push('password is required');

  return messages;
}

async function performAddUser (data) {
  try {
    const response = await fetch('/api_example/backend/add_user.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}