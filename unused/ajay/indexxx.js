
function showPage(hideId, showId) {
    document.getElementById(hideId).style.display = 'none';
    document.getElementById(showId).style.display = 'block';
}

document.getElementById('login-button').addEventListener('click', function() {
    showPage('main-page', 'attribute-page');
    document.getElementById('common-footer').style.display = 'block';
});

document.getElementById('generate-button-1').addEventListener('click', function() {
    showPage('attribute-page', 'report-page');
});

document.getElementById('generate-button-2').addEventListener('click', function() {
    showPage('report-page', 'download-page');
});

document.getElementById('back-button').addEventListener('click', function() {
    if (document.getElementById('report-page').style.display === 'block') {
        showPage('report-page', 'attribute-page');
    } else if (document.getElementById('download-page').style.display === 'block') {
        showPage('download-page', 'report-page');
    }
});
