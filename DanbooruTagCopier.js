// ==UserScript==
// @name         DanbooruTagCopier
// @namespace    http://tampermonkey.net/
// @version      2024-12-11
// @description  try to take over the world!
// @author       Kyuu
// @match        https://danbooru.donmai.us/posts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donmai.us
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';
    console.log("页面加载完成");
    // Your code here...
    let tag_list = [];
    let artist_tag_list = [];
    let copyright_tag_list = [];
    let character_tag_list = [];
    let general_tag_list = [];

    document.querySelectorAll("#tag-list > div > ul.artist-tag-list > li > span:nth-child(2) > a:nth-child(1)").forEach(ele => {artist_tag_list.push(ele.text)});
    document.querySelectorAll("#tag-list > div > ul.character-tag-list > li > span:nth-child(2) > a:nth-child(1)").forEach(ele => {character_tag_list.push(ele.text)});
    document.querySelectorAll("#tag-list > div > ul.general-tag-list > li > span:nth-child(2) > a:nth-child(1)").forEach(ele => {general_tag_list.push(ele.text)});
    // 合并标签信息
    tag_list = [...artist_tag_list, ...character_tag_list, ...general_tag_list];
    // 转换为字符串
    let tag_text = tag_list.join(",");
    console.log(tag_text);
    const parentElement = document.getElementById('content');
    const tagDiv = document.createElement('div');
    const msgDiv = document.createElement('div');

    // 设置新 div 的内容或样式（可选）
    tagDiv.id = "tag_copier";
    tagDiv.className = "notice notice-small post-notice post-notice-pending";
    tagDiv.textContent = tag_text;
    msgDiv.style.color = "green"
    msgDiv.className = "notice notice-small post-notice post-notice-pending";
    msgDiv.textContent = "Copy Success!"

    // 将新创建的 div 插入到指定标签的前面
    if (parentElement && parentElement.firstChild) {
        parentElement.insertBefore(tagDiv, parentElement.firstChild);
        // 监听点击事件
        tagDiv.addEventListener("click", async function () {
            try {
                // 获取 div 的内容
                const textToCopy = tagDiv.textContent;

                // 复制内容到剪贴板
                await navigator.clipboard.writeText(textToCopy);

                // 提示用户
                // alert("内容已复制: " + textToCopy);
                parentElement.insertBefore(msgDiv, tagDiv);
            } catch (err) {
                console.error("无法复制内容: ", err);
            }
        });
    } else {
        console.error('指定的标签不存在或没有父节点');
    }
})();