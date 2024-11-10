// 自定义JavaScript代码
// 可以在这里添加任何自定义的JavaScript逻辑

$(document).ready(function() {
	// 搜索栏输入事件
	$('#searchInput').on('input', function() {
		var searchText = $(this).val().toLowerCase();
		$('#partsTableBody tr').each(function() {
			var partName = $(this).find('td:first').text().toLowerCase();
			if (partName.includes(searchText)) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});
});