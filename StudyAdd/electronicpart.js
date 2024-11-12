// 初始化sql.js
let db;

// 加载数据库
function loadDatabase() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'electronicparts.sqlite', true);
	xhr.responseType = 'arraybuffer';

	xhr.onload = function(e) {
		let uInt8Array = new Uint8Array(xhr.response);
		db = new SQL.Database(uInt8Array);
		loadParts();
	};

	xhr.send();
}

// 加载元器件数据
function loadParts() {
	let sql = 'SELECT * FROM parts';
	let results = db.exec(sql);
	let tableBody = $('#partsTableBody');

	results[0].values.forEach(part => {
		tableBody.append(`
            <tr>
                <td>${part[1]}</td>
                <td>${part[2]}</td>
                <td><pre>${part[3]}</pre></td>
                <td><a href="${part[4]}" target="_blank">查看文档</a></td>
            </tr>
        `);
	});
}

$(document).ready(function() {
	// 加载数据库
	loadDatabase();

	// 搜索栏输入事件
	$('#searchInput').on('input', function() {
		let searchText = $(this).val().toLowerCase();
		filterTable(searchText);
	});

	// 搜索栏回车事件
	$('#searchInput').on('keypress', function(e) {
		if (e.which === 13) { // 13 是回车键的键码
			let searchText = $(this).val().toLowerCase();
			filterTable(searchText);
		}
	});

	// 清除搜索框按钮点击事件
	$('#clearSearch').on('click', function() {
		$('#searchInput').val('');
		filterTable('');
	});

	// 过滤表格的函数
	function filterTable(searchText) {
		$('#partsTableBody tr').each(function() {
			let partName = $(this).find('td:first').text().toLowerCase();
			if (partName.includes(searchText)) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}
});