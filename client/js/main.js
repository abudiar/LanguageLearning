let googleUser = {};
$(document).ready(function (e) {


    // $.ajax({
    //     method: 'GET',
    //     url: `http://localhost:3000/nama.wav`,
    //     // headers: {
    //     //     accessToken: localStorage.getItem('accessToken')
    //     // },
    //     // data
    // })
    //     .done(function (response) {
    //         // console.log(response)
    //         // const toBase64 = file => new Promise((resolve, reject) => {
    //         //     const reader = new FileReader();
    //         //     reader.readAsDataURL(file);
    //         //     reader.onload = () => resolve(reader.result);
    //         //     reader.onerror = error => reject(error);
    //         // });
    //         // toBase64(response)
    //         //     .then(result => console.log(result));
    //         $('#audio').html(`<source src=${response} type="audio/wav"`);
    //     })
    //     .fail(function (response) {
    //         console.log(response);
    //     })


    // $('#voice').submit(function (e) {
    //     e.preventDefault();
    //     const data = {
    //         text: $('#text').val(),
    //         voice: $('#lang').val()
    //     }

    //     console.log(data)

    //     $.ajax({
    //         url: `http://localhost:3000/voices?voice=${data.voice}&text=${data.text}`,
    //         method: 'POST',
    //         data: data
    //     })
    //         .then(result => {
    //             console.log(result);
    //             console.log('masuk ga sih');
    //             $('#audio').html(`<source src="nama3.wav" type="audio/wav">`);
    //         })
    //         .fail(fail => {
    //             console.log(fail);
    //         })
    // })

    // $.ajax({
    //     method: 'GET',
    //     url: `http://localhost:3000/halo.html`,
    //     // headers: {
    //     //     accessToken: localStorage.getItem('accessToken')
    //     // },
    //     // data
    // })
    //     .done(function (response) {
    //         console.log(response);
    //     })
    //     .fail(function (response) {
    //         console.log(response);
    //     })



    // (function () {
    //     var measurer = $('<span>', {
    //         style: "display:inline-block;word-break:break-word;visibility:none;white-space:pre-wrap;"
    //     })
    //         .appendTo('body');
    //     function initMeasurerFor(textarea) {
    //         if (!textarea[0].originalOverflowY) {
    //             textarea[0].originalOverflowY = textarea.css("overflow-y");
    //         }
    //         var maxWidth = textarea.css("max-width");
    //         measurer.text(textarea.text())
    //             .css("max-width", maxWidth == "none" ? textarea.width() + "px" : maxWidth)
    //             .css('font', textarea.css('font'))
    //             .css('overflow-y', textarea.css('overflow-y'))
    //             .css("max-height", textarea.css("max-height"))
    //             .css("min-height", textarea.css("min-height"))
    //             .css("min-width", textarea.css("min-width"))
    //             .css("padding", textarea.css("padding"))
    //             .css("border", textarea.css("border"))
    //             .css("box-sizing", textarea.css("box-sizing"))
    //     }
    //     function updateTextAreaSize(textarea) {
    //         textarea.height(measurer.height());
    //         var w = measurer.width();
    //         if (textarea[0].originalOverflowY == "auto") {
    //             var mw = textarea.css("max-width");
    //             if (mw != "none") {
    //                 if (w == parseInt(mw)) {
    //                     textarea.css("overflow-y", "auto");
    //                 } else {
    //                     textarea.css("overflow-y", "hidden");
    //                 }
    //             }
    //         }
    //         textarea.width(w + 2);
    //     }
    //     $('textarea.autofit').on({
    //         input: function () {
    //             var text = $(this).val();
    //             if ($(this).attr("preventEnter") == undefined) {
    //                 text = text.replace(/[\n]/g, "<br>&#8203;");
    //             }
    //             measurer.html(text);
    //             updateTextAreaSize($(this));
    //         },
    //         focus: function () {
    //             initMeasurerFor($(this));
    //         },
    //         keypress: function (e) {
    //             if (e.which == 13 && $(this).attr("preventEnter") != undefined) {
    //                 e.preventDefault();
    //             }
    //         }
    //     });
    // })();












    //     $('.switch-button-case.left').click(function () {
    //         switchLeft();
    //     })

    //     $('.switch-button-case.right').click(function () {
    //         switchRight();
    //     })

    //     $('.back').click(function () {
    //         showListPage();
    //     })

    //     $('.logout').click(function () {
    //         logout();
    //     })

    //     $('.form-login').submit(function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         const data = {
    //             email: $('#email').val(),
    //             password: $('#password').val()
    //         }
    //         // User.login(data);
    //         login(data);
    //     })

    //     $('.form-register').submit(function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         const data = {
    //             name: $('#name').val(),
    //             email: $('#emailR').val(),
    //             password: $('#passwordR').val()
    //         }

    //         register(data);
    //     })

    //     $('.form-translate-class').submit(function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();

    //         const id = $(this).attr('class').split('SPLIT')[1];
    //         const data = {
    //             translateFrom: $('#translateFrom').val(),
    //             translateTo: $('#translateTo').val()
    //         }

    //         translateClass(id, data, (response) => {
    //             console.log(response);
    //             $('#translatedTitle').text(response.translated.title)
    //             $('#translatedDesciption').text(response.translated.description)
    //         });
    //     })

    //     $('.form-new-class').submit(function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         const data = {
    //             title: $('#newTitle').val(),
    //             description: $('#newDescription').val(),
    //             due_date: formatDateToDB($('#newDate').val()),
    //             status: null,
    //         }
    //         if ($('#newDate').val() == '')
    //             delete data['due_date'];
    //         addClass(data, () => {
    //             showListPage();
    //         });
    //     })

    //     $('.form-edit-class').submit(function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         const id = $(this).attr('class').split('SPLIT')[1];
    //         const classArr = $(this).attr('class').split(' ');
    //         // console.log(classArr);
    //         for (let i in classArr) {
    //             if (classArr[i].includes('SPLIT'))
    //                 delete classArr[i];
    //         }
    //         const classWithoutId = classArr.join(' ');
    //         // console.log(classWithoutId);
    //         $(this).removeClass();
    //         $(this).addClass(classWithoutId);

    //         const data = {
    //             title: $('#editTitle').val(),
    //             description: $('#editDescription').val(),
    //             due_date: formatDateToDB($('#editDate').val())
    //         }
    //         if ($('#editDate').val() == '')
    //             delete data['due_date'];
    //         updateClass(id, data, () => {
    //             showListPage();
    //         });
    //     })

    //     $('#AddClass').click(function () {
    //         showNewPage();
    //     })

    //     $('.btn-google').click(function () {
    //         loginGoogle();
    //     })

    //     // gapi.load('auth2', function () {
    //     //     auth2 = gapi.auth2.getAuthInstance()

    //     //     // Sign the user in, and then retrieve their ID.
    //     //     auth2.signIn().then(function () {
    //     //         console.log(auth2.currentUser.get().getBasicProfile());
    //     //     });
    //     // });

    //     for (let i in langcodes) {
    //         console.log(i, langcodes[i]);
    //     }
});


// // Methods
// function loginGoogle() {
//     var myParams = {
//         'clientid': '142472030354-i6m882420v7cbjtg5ekl08vkm749anap.apps.googleusercontent.com', //You need to set client id
//         'cookiepolicy': 'single_host_origin',
//         'callback': 'onSignIn', //callback function
//         'approvalprompt': 'force',
//         'scope': 'profile email'
//     };
//     gapi.auth.signIn(myParams);
// }

// function showTranslatePage(data) {
//     const classArr = $('.form-translate-class').attr('class').split(' ');
//     for (let i in classArr) {
//         if (classArr[i].includes('SPLIT'))
//             delete classArr[i];
//     }
//     const classWithoutId = classArr.join(' ');
//     $('.form-translate-class').removeClass().addClass(classWithoutId);

//     console.log($('#translateFrom').html().length)
//     if ($('#translateFrom').html().length < 50 || $('#translateTo').html().length < 50) {
//         $('#translateFrom').html('');
//         $('#translateTo').html('');
//         const newDFromItem = `<option value="id" selected>Indonesian</option>`
//         const newDToItem = `<option value="en" selected>English</option>`
//         $('#translateFrom').append(newDFromItem);
//         $('#translateTo').append(newDToItem);
//         for (let key in langcodes) {
//             const newFromItem = `<option value="${key}">${langcodes[key]}</option>`
//             const newToItem = `<option value="${key}">${langcodes[key]}</option>`
//             $('#translateFrom').append(newFromItem);
//             $('#translateTo').append(newToItem);
//         }
//     }
//     $('#translateTitle').text(data.title)
//     $('#translatedTitle').text(data.title)
//     $('#translateDesciption').text(data.description)
//     $('#translatedDesciption').text(data.description)

//     $('.form-translate-class').addClass(`idSPLIT${data['id']}SPLIT`);
//     hideAll();
//     $('#TranslatePage').show();
// }

// function showAlreadySocialsPage() {
//     hideAll();
//     $('#AlreadySocialsPage').show();
// }

// function showEditPage(data) {
//     // // console.log(data['title'])
//     $('.form-edit-class').addClass(`idSPLIT${data['id']}SPLIT`);
//     $('#editTitle').val(`${data['title']}`);
//     $('#editDescription').val(`${data['description'] ? data['description'] : ''}`);
//     if (data['due_date'] == null) {
//         $('#editDate').datepicker({
//             format: 'dd/mm/yyyy',
//         });
//     }
//     else {
//         $('#editDate').datepicker({
//             format: 'dd/mm/yyyy',
//             date: new Date(data['due_date'])
//         });
//         $('#editDate').val(formatDateDisplay(data['due_date']));
//     }
//     hideAll();
//     $('#EditPage').show();
// }

// function showNewPage() {
//     $('#newDate').datepicker({
//         format: 'dd/mm/yyyy'
//     });
//     hideAll();
//     $('#NewPage').show();
// }

// function showListPage() {
//     showUserPage(); // Make sure to clear user page
//     $('#newTitle').val(null);
//     $('#newDescription').val(null);
//     $('#newDate').val(null);
//     $('#TitleUser').html(`Hey ${localStorage.getItem('name')}, `);
//     getClasss((data) => {
//         $('#SubUser').text(`You have ${data.length} things class!`);
//         $('.list-group.class-list').html('');
//         for (let i in data) {
//             const newItem = `<li class="list-group-item">
//                 <table class=" trash transition" style="color: white;position:relative; z-index:5;">
//                     <tr>
//                         <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon" style="padding:20px 25px; z-index:5;">
//                             <input type="checkbox" class="form-check-input btn-icon button status idSPLIT${data[i]['id']}SPLIT" style="margin:auto;position:relative;" ${data[i]['status']}>
//                         </th>
//                         <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon" style="padding:20px 25px;width:100%;text-align:center; z-index:5;">
//                             <h5 class="class-title ${data[i]['status'] == 'checked' ? 'greyed-out' : ''}"style="margin:0;">${data[i]['title']}</h5>
//                             <p class="description transition ${data[i]['status'] == 'checked' ? 'checked' : ''}"" >${data[i]['description'] ? data[i]['description'] : ''}</p>
//                         </th>
//                         <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon ${data[i]['status'] == 'checked' ? 'greyed-out' : ''}" style="padding:20px 25px; z-index:5;">
//                             ${data[i]['due_date'] ? formatDateDisplay(data[i]['due_date']) : ''}
//                         </th>
//                     </tr>
//                 </table>
//                 <nav class="navbar" style="position:absolute; z-index:0; right:0; height:100%; top:0%; width:130px; background:rgba(0,0,0, 0.1);">
//                     <h5 style="margin:0;" class="fas fa-language button transition btn-icon idSPLIT${data[i]['id']}SPLIT"></h5>
//                     <h5 style="margin:0;" class="fas fa-edit button transition btn-icon idSPLIT${data[i]['id']}SPLIT"></h5>
//                     <h5 style="margin:0;" class="fa fa-trash button transition btn-icon idSPLIT${data[i]['id']}SPLIT" aria-hidden="true"></h5>
//                 </nav>
//             </li>`
//             $('.list-group.class-list').append(newItem);
//         }
//         $('.list-group-item').hover(function (e) {
//             $('.trash').removeClass("selected");
//             $('.description').removeClass("selected");
//             $(this).find('.trash').addClass("selected");
//             if ($(this).find('.description').text().length > 0) {
//                 $(this).find('.description').addClass("selected");
//             }
//         });
//         $('.list-group-item').mouseleave(function (e) {
//             $('.trash').removeClass("selected");
//             $('.description').removeClass("selected");
//         });
//         $('.button').click(function (e) {
//             e.stopPropagation();
//             const id = $(this).attr('class').split('SPLIT')[1];
//             if ($(this).attr('class').includes('fa-language')) {
//                 getSingleClass(id, (data) => {
//                     showTranslatePage(data);
//                 });
//             }
//             else if ($(this).attr('class').includes('fa-edit')) {
//                 getSingleClass(id, (data) => {
//                     showEditPage(data);
//                 });
//             }
//             else if ($(this).attr('class').includes('fa-trash')) {
//                 deleteClass(id, () => {
//                     showListPage();
//                 });
//             }
//             else if ($(this).attr('class').includes('status')) {
//                 $(this).is(":checked") ?
//                     updateClass(id, { status: 'checked' }, function (e) {
//                         showListPage();
//                         // console.log(this)
//                         $(this).click();
//                     }) :
//                     updateClass(id, { status: null }, function (e) {
//                         showListPage();
//                         $(this).click();
//                     });
//             }
//             else if ($(this).attr('class').includes('check')) {
//                 // console.log(id, $(this).parent().find('.status').is(":checked"))
//                 $(this).parent().find('.status').is(":checked") ?
//                     updateClass(id, { status: null }, function (e) {
//                         showListPage();
//                         // console.log(this)
//                         $(this).click();
//                     }) :
//                     updateClass(id, { status: 'checked' }, function (e) {
//                         showListPage();
//                         $(this).click();
//                     });
//             }
//         });
//     })
//     hideAll();
//     $('#ListPage').show();
// }

// function showUserPage() {
//     $('#name').val(null);
//     $('#emailR').val(null);
//     $('#passwordR').val(null);
//     $('#password').val(null);
//     $('#email').val(null);
//     hideAll();
//     $('#UserPage').show();
// }

// function hideAll() {
//     $('#ListPage').hide();
//     $('#TranslatePage').hide();
//     $('#UserPage').hide();
//     $('#NewPage').hide();
//     $('#EditPage').hide();
//     $('#AlreadySocialsPage').hide();
// }

// function switchLeft() {
//     $('.switch-button-case.left').addClass("active-case");
//     $('.switch-button-case.right').removeClass("active-case");
//     $('.switch-button-case.right').addClass("not-active");
//     $('.switch-button-case.left').removeClass("not-active");
//     $('.switch-button .active').css("left", "0%");
//     $('.switch-button .active').css("backgroundPosition", "0%");
//     $('.login').removeClass("hidden");
//     $('.login').addClass("visible");
//     $('.register').removeClass("visible");
//     $('.register').addClass("hidden");
// }

// function switchRight() {
//     $('.switch-button-case.right').addClass("active-case");
//     $('.switch-button-case.left').removeClass("active-case");
//     $('.switch-button-case.left').addClass("not-active");
//     $('.switch-button-case.right').removeClass("not-active");
//     $('.switch-button .active').css("left", "50%");
//     $('.switch-button .active').css("backgroundPosition", "100%");
//     $('.login').removeClass("visible");
//     $('.login').addClass("hidden");
//     $('.register').removeClass("hidden");
//     $('.register').addClass("visible");
// }

// function formatNumber(numStr) {
//     if (numStr < 10)
//         return `0${numStr}`;
//     return numStr;
// }

// function formatDateDisplay(dateStr) {
//     const date = new Date(dateStr)
//     return `${formatNumber(date.getDate())}/${Number(formatNumber(date.getMonth())) + 1}/${date.getFullYear()}`
// }

// function formatDateToDB(dateStr) {
//     const dateArr = dateStr.split('/');
//     // console.log(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`)
//     return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
// }

// let googleAuthResponse;

// function onSignIn(AuthResponse) {
//     gapi.client.load('oauth2', 'v2', function () {
//         var request = gapi.client.oauth2.userinfo.get({
//             'userId': 'me'
//         });
//         request.execute(function (resp) {
//             console.log(resp)
//             let token = AuthResponse.id_token;
//             googleAuthResponse = AuthResponse;
//             const data = {
//                 token,
//                 password: $('#passwordR').val(),
//                 email: $('#emailR').val(),
//                 name: resp.given_name
//             }
//             $.ajax({
//                 method: 'POST',
//                 url: 'http://localhost:3000/social/google',
//                 data
//             })
//                 .done(function (response) {
//                     let { accessToken, name } = response
//                     localStorage.setItem('accessToken', accessToken)
//                     localStorage.setItem('name', name)
//                     // toastr.success('Successfully signed in as ' + name);
//                     showListPage();
//                 })
//                 .fail(function (response) {
//                     toastr.error(response.responseJSON.message, response.responseJSON.name);
//                     // alert(response.responseText);
//                     logout();
//                     showUserPage();
//                 })
//         });
//     });
// }

// function register(data) {
//     $.ajax({
//         method: 'POST',
//         url: 'http://localhost:3000/register',
//         data
//     })
//         .done(function (response) {
//             let { accessToken, name } = response
//             localStorage.setItem('accessToken', accessToken)
//             localStorage.setItem('name', name)
//             // toastr.success('Successfully registered ' + name);
//             showListPage();
//         })
//         .fail(function (response) {
//             // console.log(response.responseJSON)
//             // console.log(response.responseJSON.name === 'TrySocials')
//             if (response.responseJSON.name === 'TrySocials')
//                 showAlreadySocialsPage();
//             else
//                 toastr.error(response.responseText);
//             // alert(response.responseText);
//         })
// }

// function login(data) {
//     $.ajax({
//         method: 'POST',
//         url: 'http://localhost:3000/login',
//         data
//     })
//         .done(function (response) {
//             let { accessToken, name } = response
//             localStorage.setItem('accessToken', accessToken)
//             localStorage.setItem('name', name)
//             // toastr.success('Successfully signed in as ' + name);
//             showListPage();
//         })
//         .fail(function (response) {
//             toastr.error(response.responseText);
//             // alert(response.responseText);
//         })
// }

// function logout() {
//     localStorage.removeItem('accessToken');
//     if (googleAuthResponse)
//         logoutGoogle(googleAuthResponse.accessToken);
//     showUserPage();
// }

// function logoutGoogle(accessToken) {
//     let revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
//         accessToken;

//     // Perform an asynchronous GET request.
//     $.ajax({
//         type: 'GET',
//         url: revokeUrl,
//         async: false,
//         contentType: "application/json",
//         dataType: 'jsonp',
//         success: function (nullResponse) {
//             // toastr.success('Successfully signed out of Google');
//             // Do something now that user is disconnected
//             // The response is always undefined.
//         },
//         error: function (e) {
//             // Handle the error
//             // console.log(e);
//             // You could point users to manually disconnect if unsuccessful
//             // https://plus.google.com/apps
//         }
//     });
// }

// function getClasss(cb) {
//     $.ajax({
//         method: 'GET',
//         url: 'http://localhost:3000/todos',
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         }
//     })
//         .done(function (response) {
//             cb(response);
//         })
//         .fail(function (response) {
//             checkJWT(response);
//         })
// }

// function addClass(data, cb) {
//     $.ajax({
//         method: 'POST',
//         url: 'http://localhost:3000/todos',
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         },
//         data
//     })
//         .done(function (response) {
//             cb(response);
//         })
//         .fail(function (response) {

//             checkJWT(response);
//         })
// }

// function getSingleClass(id, cb) {
//     $.ajax({
//         method: 'GET',
//         url: `http://localhost:3000/todos/${id}`,
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         }
//     })
//         .done(function (response) {
//             // console.log(response)
//             cb(response);
//         })
//         .fail(function (response) {
//             checkJWT(response);
//         })
// }

// function updateClass(id, data, cb) {
//     $.ajax({
//         method: 'PUT',
//         url: `http://localhost:3000/todos/${id}`,
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         },
//         data
//     })
//         .done(function (response) {
//             cb(response);
//         })
//         .fail(function (response) {
//             checkJWT(response);
//         })
// }

// function deleteClass(id, cb) {
//     $.ajax({
//         method: 'DELETE',
//         url: `http://localhost:3000/todos/${id}`,
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         }
//     })
//         .done(function (response) {
//             cb(response);
//         })
//         .fail(function (response) {
//             checkJWT(response);
//         })
// }

// function translateClass(id, data, cb) {
//     $.ajax({
//         method: 'GET',
//         url: `http://localhost:3000/todos/translate/${id}`,
//         headers: {
//             accessToken: localStorage.getItem('accessToken')
//         },
//         data
//     })
//         .done(function (response) {
//             cb(response);
//         })
//         .fail(function (response) {
//             checkJWT(response);
//         })
// }

// function checkJWT(response) {
//     if (response.responseJSON.name == "JsonWebTokenError") {
//         // alert('Please login!');
//         toastr.error('Please login!', 'Login failed.');
//         logout();
//     }
//     else
//         alert(response.responseText);
// }