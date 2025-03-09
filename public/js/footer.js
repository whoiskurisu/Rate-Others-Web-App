const footer = document.createElement('footer');
footer.setAttribute('id','footer')
footer.innerHTML = `<div id="footer-content">
<a href="/help">Help</a>
<a href="/terms">Terms and Conditions</a>
<a href="/privacy">Privacy Policy</a>
<a href="/guidelines">Site guidelines</a>
</div>
<div id="icons">
<ion-icon name="logo-facebook"></ion-icon>
<ion-icon name="logo-instagram"></ion-icon>
<ion-icon name="logo-twitter"></ion-icon>
</div>
<div id="copyright">
© 2024 - Present, rateothers.com, Inc. or its affiliates
</div>`

const body = document.querySelector('#body')
body.append(footer)