// COOKIES
// Store session key in cookie
let username = getCookie("username");
let session = getCookie("session");

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toGMTString();
  // If testing on localhost, use SameSite=Lax
  if (location.protocol == "https:") {
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/; SameSite=None; Secure`;
  } else {
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/; SameSite=Lax`;
  }
  console.log("setCookie: " + `${cname}=${cvalue};`);
}

function deleteCookie(cname) {
  console.log("function deleteCookie");
  // If testing on localhost, use SameSite=Lax
  if (location.protocol == "https:") {
    document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure`;
  } else {
    document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }
}

function checkCookie() {
  if (session != "" && session != null && username != "" && username != null) {
    console.log("You are logged in as: " + username);
    console.log("Your session key is: " + session);
    return true;
  } else {
    console.log("You are not logged in");
    return false;
  }
}

function updateSessionField() {
  checkCookie();
  console.log("checkCookie");
  // Set session field from cookie
  $("#session").val(session);
  // $('#swagger-ui [data-property-name="session"] input[type="text"]').val(session);
  console.log("set session value");
  // Set username field from cookie
  $("#username").val(username);
}

// Get session key from cookie and store it in session field
$(document).ready(function () {
  $("#session").ready(function () {
    console.log("#session.ready");
    updateSessionField();
  });
});
// END COOOKIES