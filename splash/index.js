document.addEventListener('DOMContentLoaded', async () => {
    const pkg = await fetch('../package.json').then(res => res.json());
    document.querySelector('#version').innerText = pkg.version;
})