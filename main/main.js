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


function createShoppingListHead(items, promotions) {
	var listHead = '';
	items.forEach((elem) => {
		let elemTotal = elem.count * elem.unitPrice;//小计
		promotions.forEach((promotion) => {
			if (promotion.name === elem.name) {
				elemTotal -= promotion.count * elem.unitPrice;//优惠后价格
			}
		});

		listHead += "名称：" + elem.name + "，数量：" + elem.count
			+ "，单价：" + elem.unitPrice + "(元)，小计：" + elemTotal + "\n";
	})
	return listHead;
}
function createShoppingListPromotions(promotions) {

}
function createShoppingListTotalInfo(items, promotions) {

}

function createPrintText(items, promotions) {
	var listHead,
		listPromotions,
		totalInfo,
		outputText;
	listHead = createShoppingListHead(items, promotions);
	listPromotions = createShoppingListPromotions(promotions);
	totalInfo = createShoppingListTotalInfo(items, promotions);
	outputText = "***<没钱赚商店>购物清单***\n" + listHead + "\n----------------------\n" + listPromotions
		+ "\n----------------------\n" + totalInfo + "\n**********************"
	return outputText;
}
module.exports = function main(inputs) {
	var items = countitems(inputs, loadAllitems);
	var promotions = countPromotions(items, loadPromotions);
	var outPutText = createPrintText(items, promotions);
	console.log(outPutText);
};