const A="assets/";
const exercises={
one:[
{en:"Hammer Incline Chest Press",ar:"صدر علوي همر",image:A+"Hammer Incline Chest Press.jpg",video:"assets/video/hammer-incline-chest-press.mp4"},
{en:"Hammer Flat Chest Press",ar:"صدر مستوي همر",image:A+"Hammer Flat Chest Press.jpg",video:"assets/video/wrist-curl.mp4"},
{en:"Triceps Pushdown (Bar)",ar:"زند امامي مسطرة صاندو",image:A+"Triceps Pushdown (Bar).jpg",video:"assets/video/triceps-pushdown-bar.mp4"},
{en:"Dumbbell Biceps Curl",ar:"بايسيبس دنابل",image:A+"Dumbbell Biceps Curl.jpg",video:"assets/video/dumbbell-lateral-raise.mp4"},
{en:"Lying Leg Curl",ar:"ارجل طاولة خلفي",image:A+"Lying Leg Curl.jpg",video:"assets/video/wide-grip-seated-cable-row.mp4"},
{en:"Leg Extension",ar:"ارجل طاولة امامي",image:A+"Leg Extension.jpg",video:"assets/video/hammer-shoulder-press.mp4"}
],
two:[
{en:"Wide Grip Lat Pulldown",ar:"سحب ظهر عريض",image:A+"Wide Grip Lat Pulldown.jpg",video:"assets/video/leg-extension.mp4"},
{en:"Wide Grip Seated Cable Row",ar:"سحب جرار قبضة عريض",image:A+"Wide Grip Seated Cable Row.jpg",video:"assets/video/lying-leg-curl.mp4"},
{en:"Hammer Shoulder Press",ar:"كتف ضغط همر امامي",image:A+"Hammer Shoulder Press.jpg",video:"assets/video/dumbbell-biceps-curl.mp4"},
{en:"Dumbbell Lateral Raise",ar:"رفرفة جانبي دنابل",image:A+"Dumbbell Lateral Raise.jpg",video:null},
{en:"Triceps Pushdown (Bar)",ar:"زند خلفي مسطرة عالصاندو",image:A+"Triceps Pushdown (Bar).jpg",video:"assets/video/triceps-pushdown-bar.mp4"},
{en:"Single Dumbbell Overhead Triceps Extension",ar:"دانبل خلف الرأس مفرد",image:A+"Single Dumbbell Overhead Triceps Extension.jpg",video:"assets/video/hammer-flat-chest-press.mp4"},
{en:"Wrist Curl",ar:"سواعد",image:A+"Wrist Curl.jpg",video:null}
]};
const loader=document.getElementById("loader"),modal=document.getElementById("video-modal"),video=document.getElementById("exercise-video"),videoSource=document.getElementById("video-source"),videoEmpty=document.getElementById("video-empty"),modalTitle=document.getElementById("modal-title"),modalArabic=document.getElementById("modal-arabic");
function encodeAssetPath(path){return path.split("/").map(encodeURIComponent).join("/");}
function createCard(e){const c=document.createElement("article");c.className="exercise-card";c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("aria-label",e.en+" - "+e.ar);c.innerHTML='<div class="exercise-image"><img src="'+e.image+'" alt="'+e.ar+'" loading="lazy" referrerpolicy="no-referrer"></div><div class="exercise-content"><h3 class="exercise-en">'+e.en+'</h3><p class="exercise-ar">'+e.ar+'</p></div>';c.addEventListener("click",()=>openVideo(e));c.addEventListener("keydown",t=>{if(t.key==="Enter"||t.key===" "){t.preventDefault();openVideo(e)}});return c}
function render(list,id){const t=document.getElementById(id);list.forEach(e=>t.appendChild(createCard(e)));}
function openVideo(e){modalTitle.textContent=e.en;modalArabic.textContent=e.ar;video.pause();videoEmpty.style.display="none";video.style.display="none";video.removeAttribute("src");videoSource.removeAttribute("src");if(!e.video){videoEmpty.innerHTML='<span>🎥</span><strong>الفيديو غير متوفر حاليًا</strong><small>سيتم إضافة فيديو هذا التمرين عند توفر الملف الصحيح.</small>';videoEmpty.style.display="grid";modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";return}videoEmpty.innerHTML='<span>⏳</span><strong>جاري تحميل الفيديو...</strong>';videoEmpty.style.display="grid";videoSource.src=encodeAssetPath(e.video);video.load();video.addEventListener("loadedmetadata",()=>{videoEmpty.style.display="none";video.style.display="block"},{once:true});video.addEventListener("error",showEmpty,{once:true});modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function showEmpty(){video.style.display="none";videoEmpty.innerHTML='<span>⚠️</span><strong>تعذر تشغيل الفيديو</strong><small>تحقق من ملف الفيديو أو جرّب مرة أخرى لاحقًا.</small>';videoEmpty.style.display="grid"}
function closeModal(){video.pause();video.removeAttribute("src");videoSource.removeAttribute("src");video.load();modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll("[data-close]").forEach(e=>e.addEventListener("click",closeModal));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("is-open"))closeModal()});render(exercises.one,"workout-one");render(exercises.two,"workout-two");window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("is-hidden"),1100));