const { ipcRenderer } = require('electron');
document.addEventListener('DOMContentLoaded', () => {
    // Document has finished loading here
    let styles = '*{box-sizing:border-box}#top-control-bar{margin:0;width:100%;height:64px;background:none;border:none;padding:6px 12px}#top-info{background:#14111F;border:2px solid #636381;padding:4px 10px;border-radius:12px;height:52px;justify-content:center;position:absolute;left:50%;top:6px;transform:translate(-50%, 0);gap:2px}#top-info *{line-height:1}#top-info > div{margin:0}.station-detail-box{top:64px}#top-info::after{content:\'\';display:block;position:absolute;left:-2px;top:-2px;right:-2px;height:30px;app-region:drag;-webkit-app-region:drag;border-radius:12px 12px 0 0}#station-info-line2{position:relative}#station-info-line2::after{content:\'\';display:block;position:absolute;top:-1px;right:-4px;bottom:-2px;left:-4px;border-radius:4px;transition:background-color 0.2s ease;z-index:-1}#top-info:hover #station-info-line2::after{background-color:#ffffff40}#menu-toggle{background:#14111F;border:2px solid #636381;padding:8px;border-radius:12px;height:52px;position:absolute;left:6px;top:6px}#layers-submenu,#side-menu{app-region:no-drag}#control-bar{border-width:1px 0 0;border-radius:0;width:100%;height:56px}#map{top:0}#side-menu.show{animation:menuSlideIn 0.3s ease forwards}#side-menu.hide{animation:menuSlideOut 0.3s ease forwards}@keyframes menuSlideIn{from{opacity:1;transform:translateX(-100%)}to{opacity:1;transform:translateY(0)}}@keyframes menuSlideOut{from{opacity:1;transform:translateY(0)}to{opacity:1;transform:translateX(-100%)}}#window-controls{background:#14111F;border:2px solid #636381;padding:8px;border-radius:12px;position:absolute;right:12px;top:6px}'
    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    setTimeout(() => {resizeCanvas()},200);
})
// macOS specific stuff
ipcRenderer.on('is-darwin', () => {
    let styles = '#menu-toggle{padding:30px 13px 8px 14px;height:68px}'
    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
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