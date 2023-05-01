let saturate=document.querySelector("#saturate");
let contrast=document.querySelector("#contrast");
let brightness=document.querySelector("#brightness");
let sepia=document.querySelector("#sepia");
let grayscale=document.querySelector("#grayscale");
let blur=document.querySelector("#blur");
let hueRotate=document.querySelector("#hue-rotate");

let download=document.querySelector("#download");
let span=document.querySelector("span");

let img=document.querySelector("#img");
let upload=document.querySelector("#upload");
let imgBox=document.querySelector(".img-box");

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");

window.onload=function(){
    download.style.display="none";
    span.style.display="none";
    imgBox.style.display="none";
};

upload.onchange=function(){
    resetValue();
    download.style.display="block";
    span.style.display="block";
    imgBox.style.display="block";
    
    let file=new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload=function(){
        img.src=file.result
    };
    
    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display="none";
    }
};

let filters=document.querySelectorAll("ul li input");
console.log(filters)

filters.forEach((filter) =>{
    filter.addEventListener("input",function(){
        ctx.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);

    });
});

span.onclick=function(){
    resetValue();
};
download.onclick=function(){
    download.href=canvas.toDataURL();
}

function resetValue(){
    
    ctx.filter="none";
    saturate.value="100";
    contrast.value="100";
    brightness.value="100";
    sepia.value="0";
    grayscale.value="0";
    blur.value="0";
    hueRotate.value="0";
};