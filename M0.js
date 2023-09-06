<script>
fetch('/get-ip.php')
            .then(response => response.text())
            .then(ip => {
                document.getElementById('ip-address').textContent = ip;
            })
            .catch(error => {
                console.error('Error:', error);
            });
</script>