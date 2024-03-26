const changeButtons = document.querySelectorAll('.btn-user-change');
const saveButtons = document.querySelectorAll('.btn-user-save');

changeButtons.forEach(changeButton => {
    changeButton.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        const row = document.querySelector(`tr[data-user-id="${userId}"]`);
        const cells = row.querySelectorAll('td:not(.btn-controllers):not(.id)');

        cells.forEach(cell => {
            if (cell.classList.contains('role')) {
                const cellText = cell.textContent.trim();
                const selectRole = document.createElement('select');
                const userOption = document.createElement('option');
                userOption.value = 'Пользователь';
                userOption.text = 'Пользователь';
                const adminOption = document.createElement('option');
                adminOption.value = 'Администратор';
                adminOption.text = 'Администратор';

                selectRole.appendChild(userOption);
                selectRole.appendChild(adminOption);

                if (cellText === 'Пользователь') {
                    userOption.selected = true;
                } else if (cellText === 'Администратор') {
                    adminOption.selected = true;
                }

                cell.innerHTML = '';
                cell.appendChild(selectRole);
            } else {
                const cellText = cell.textContent.trim();
                cell.innerHTML = `<input type="text" value="${cellText}">`;
            }
        });
        toggleButtonsActivity(userId);
    });
});

saveButtons.forEach(saveButton => {
    saveButton.addEventListener('click', async function () {
        const userId = this.getAttribute('data-user-id');
        const row = document.querySelector(`tr[data-user-id="${userId}"]`);
        const cells = row.querySelectorAll('td:not(.btn-controllers):not(.id)');
        const updatedData = {};

        cells.forEach(cell => {
            if (cell.querySelector('select')) {
                const selectedRole = cell.querySelector('select').value;
                cell.innerHTML = selectedRole;
                updatedData['role'] = selectedRole;
            } else {
                const cellValue = cell.querySelector('input').value;
                cell.innerHTML = cellValue;
                const fieldName = cell.classList[0];
                updatedData[fieldName] = cellValue;
            }
        });

        toggleButtonsActivity(userId);

        console.log(updatedData)

        try {
            await axios.put(`/admin/users/update/${userId}`, updatedData);
            console.log('Данные успешно обновлены на сервере');
        } catch (error) {
            console.error('Произошла ошибка при обновлении данных:', error);
        }
    });
});

function toggleButtonsActivity(userId) {
    const changeButton = document.querySelector(`.btn-user-change[data-user-id="${userId}"]`);
    const saveButton = document.querySelector(`.btn-user-save[data-user-id="${userId}"]`);

    changeButton.classList.toggle('no-active');
    saveButton.classList.toggle('no-active');
}


const deleteButtons = document.querySelectorAll('.btn-user-delete');

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async function() {
        const userId = this.getAttribute('data-user-id');

        try {
            await axios.delete(`/admin/users/delete/${userId}`);
            console.log(`Пользователь с ID ${userId} успешно удален`);

            const rowToDelete = document.querySelector(`tr[data-user-id="${userId}"]`);
            if (rowToDelete) {
                rowToDelete.remove();
            }
        } catch (error) {
            console.error(`Ошибка при удалении пользователя с ID ${userId}:`, error);
        }
    });
});

async function oneUser() {
    let userInfo = document.querySelector('h1');

    try {
        const response = await axios.get(`/api/user`);
        console.log(response);
        userInfo.querySelector('.one-name').textContent = response.data.login;
        userInfo.querySelector('.one-id').textContent = response.data.id;
    } catch (error) {
        console.error(`Ошибка :`, error);
    }
}

oneUser();


