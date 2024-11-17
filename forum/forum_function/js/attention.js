document.addEventListener("DOMContentLoaded", function() {
	// 创建弹窗内容
	const popup = document.createElement("div");
	popup.className = "popup";
	popup.innerHTML = `
        <div class="popup-content">
            <h2>你已成功进入论坛</h2>
            <p>请注意以下事项和发言要求：</p>
            <ul>
                <li>请遵守论坛规则，文明发言。</li>
                <li>禁止发布任何涉及政治的内容。</li>
                <li>尊重他人，避免人身攻击。</li>
                <li>请勿发布广告或垃圾信息。</li>
				<li>禁止发布涉及违反宪法、法律、法规的内容。</li>
				<li>禁止宣传恐怖、暴力、色情等有害健康的内容。</li>
				<li>团结互助、礼貌待人。</li>
            </ul>
            <button id="accept">接受</button>
            <button id="decline">不接受</button>
        </div>
    `;

	// 将弹窗添加到页面中
	document.body.appendChild(popup);

	// 获取按钮元素
	const acceptButton = document.getElementById("accept");
	const declineButton = document.getElementById("decline");

	// 点击“接受”按钮时，关闭弹窗
	acceptButton.addEventListener("click", function() {
		popup.remove();
	});

	// 点击“不接受”按钮时，跳转回 ../blog.html
	declineButton.addEventListener("click", function() {
		window.location.href = "../blog.html";
	});
});