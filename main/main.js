function countItems(inputs, loadAllitems) {
	var itemsList = loadAllitems();
	var results = [];
	inputs.forEach((elem) => {
		let elemBarCode = elem.replace(reg, ",").split(",")[0];//处理'ITEM000003-2'
		let elemCount = elem.replace(reg, ",").split(",")[1] ? parseInt(elem.replace(reg, ",").split(",")[1]) : 1;
		for (let i = 0; i < results.length; i++) {
			//已经存在的物品
			if (results[i].barcode === elemBarCode) {
				results[i].count += elemCount;
			}
		}
		//新的物品
		itemsList.forEach((obj) => {
			if (obj.barcode === elem.barcode) {
				results.push({
					name: obj.name,
					count: 1,
					barcode: obj.barcode,
					unit: obj.unit,
					unitPrice: obj.price
				})
			}
		})
	})
	return results;

}

function countPromotions(items, loadPromotions) {

	var promotionsInfo = loadPromotions();
	var promotions = [];

	items.forEach((elem) => {
		//在优惠列表内
		if (promotionsInfo.barcode.includes(elem.barcode)) {
			var promotionNum = Math.floor(elem.count / 3);
			promotions.push({
				name: elem.name,
				count: promotionNum
			})
		}
	})
	return promotions;
}

function createPrintText(items, promotions) {

}
module.exports = function main(inputs) {
	var items = countitems(inputs, loadAllitems);
	var promotions = countPromotions(items, loadPromotions);
	var outPutText = createPrintText(items, Promotions);
	return 'Hello World!';
};