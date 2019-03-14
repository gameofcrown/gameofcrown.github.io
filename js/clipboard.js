
function copyToClipBoard(copyTxt)

{

    var createInput = document.createElement('input');

    createInput.value = copyTxt;

    document.body.appendChild(createInput);

    createInput.select(); // 选择对象

    document.execCommand("Copy"); // 执行浏览器复制命令

    createInput.className = 'createInput';

    createInput.style.display='none';
    document.body.removeChild(createInput);

    //layer.msg('复制成功，可以粘贴了！');//没有layui的可以改为alert

}