const { ipcRenderer } = require('electron');
document.addEventListener('DOMContentLoaded', () => {
    // Document has finished loading here
    let styles = '*{box-sizing:border-box}#top-control-bar{margin:0;width:100%;height:64px;background:none;border:none;padding:12px}#top-info{background:#14111F;border:2px solid #636381;padding:4px 10px;border-radius:12px}#menu-toggle{background:#14111F;border:2px solid #636381;padding:8px;border-radius:12px}#control-bar{border-width:1px 0 0;border-radius:0;width:100%;height:56px}#map{top:0}#side-menu.show{animation:menuSlideIn .3s ease forwards}#side-menu.hide{animation:menuSlideOut .3s ease forwards}@keyframes menuSlideIn{from{opacity:1;transform:translateX(-100%)}to{opacity:1;transform:translateY(0)}}@keyframes menuSlideOut{from{opacity:1;transform:translateY(0)}to{opacity:1;transform:translateX(-100%)}}'
    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    setTimeout(() => {resizeCanvas()},200);
})
document.addEventListener('load', () => {
    ipcRenderer.send('load');
    // resize canvas after loading stylesheet to fix map
    setTimeout(() => {resizeCanvas()},200);
    setTimeout(() => {resizeCanvas()},500);
    setTimeout(() => {resizeCanvas()},1000);
    // just in case that function gets renamed or moved
    window.dispatchEvent(new Event("resize"));
});