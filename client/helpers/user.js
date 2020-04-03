function register(data) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data
    })
        .done(function (response) {
            login(data);
        })
        .fail(function (response) {
            alert(response.responseText);
        })
}

function login(data) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data
    })
        .done(function (response) {
            let { accessToken } = response
            localStorage.setItem('accessToken', accessToken)
            $('#UserPage').hide();
        })
        .fail(function (response) {
            alert(response.responseText);
        })
}

function logout() {
    localStorage.removeItem('accessToken');
    $('#email').val('');
    $('#password').val('');
    $('#name').val('');
    $('#emailR').val('');
    $('#passwordR').val('');
    $('#UserPage').show();
}