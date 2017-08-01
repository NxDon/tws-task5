const dat = require('../main/datbase.js');
var loadAllItems = dat.loadAllItems;
var loadPromotions = dat.loadPromotions;

function countItems(inputs, loadAllitems) {
	var itemsList = loadAllitems();
	var results = [];
	var reg = /-/;
	inputs.forEach((elem) => {
		let elemBarCode = elem.replace(reg, ",").split(",")[0];//处理"ITEM000003-2"
		let elemCount = elem.replace(reg, ",").split(",")[1] ? parseInt(elem.replace(reg, ",").split(",")[1]) : 1;
		for (let i = 0; i < results.length; i++) {
			//已经存在的物品
			if (results[i].barcode === elemBarCode) {
				results[i].count += elemCount;
				return;
			}
		}
		//新的物品
		itemsList.forEach((obj) => {
			if (obj.barcode === elemBarCode) {
				results.push({
					name: obj.name,
					count: elemCount,
					barcode: obj.barcode,
					unit: obj.unit,
					unitPrice: obj.price
				});
			}
		});

	});
	return results;

}

function countPromotions(items, loadPromotions) {

	var promotionsInfo = loadPromotions();
	var promotions = [];

	items.forEach((elem) => {
		//在优惠列表内
		if (promotionsInfo[0].barcodes.includes(elem.barcode)) {
			var promotionNum = Math.floor(elem.count / 3);
			promotions.push({
				name: elem.name,
				count: promotionNum,
				unit: elem.unit
			})
		}
	})
	return promotions;
}


function createShoppingListHead(items, promotions) {
	var listHead = "***<没钱赚商店>购物清单***\n";
	items.forEach((elem) => {
		let elemTotal = elem.count * elem.unitPrice;//小计
		promotions.forEach((promotion) => {
			if (promotion.name === elem.name) {
				elemTotal -= promotion.count * elem.unitPrice;//优惠后价格
			}
		});

		listHead += "名称：" + elem.name + "，数量：" + elem.count
			+ elem.unit + "，单价：" + elem.unitPrice.toFixed(2) + "(元)，小计：" + elemTotal.toFixed(2) + "(元)\n";
	});
	return listHead;
}
function createShoppingListPromotions(promotions) {
	var listPromotions = "挥泪赠送商品：\n";
	promotions.forEach((elem) => {
		listPromotions += "名称：" + elem.name + "，数量：" + elem.count + elem.unit + "\n";
	})
	return listPromotions;
}
function createShoppingListTotalInfo(items, promotions) {
	let total = 0,
		totalSaving = 0,
		totalInfo = "";
	//下段代码和createShoppingListHead函数部分代码相同，应单独抽象出另外一个函数，但此处为了节省时间，略过
	items.forEach((elem) => {
		let elemTotal = elem.count * elem.unitPrice;//小计

		promotions.forEach((promotion) => {
			if (promotion.name === elem.name) {
				elemTotal -= promotion.count * elem.unitPrice;//优惠后价格
				totalSaving += promotion.count * elem.unitPrice;
			}
		});
		total += elemTotal;//总价
	});
	totalInfo = "总计：" + total.toFixed(2) + "(元)\n" +
		"节省：" + totalSaving.toFixed(2) + "(元)\n";
	return totalInfo;
}

function createPrintText(items, promotions) {
	var listHead,
		listPromotions,
		totalInfo,
		outputText;
	listHead = createShoppingListHead(items, promotions);
	listPromotions = createShoppingListPromotions(promotions);
	totalInfo = createShoppingListTotalInfo(items, promotions);
	outputText =
		listHead +
		"----------------------\n" +
		listPromotions +
		"----------------------\n" +
		totalInfo +
		"**********************";
	return outputText;
}
module.exports =
	function main(inputs) {
	var items = countItems(inputs, loadAllItems);
	var promotions = countPromotions(items, loadPromotions);
	var outPutText = createPrintText(items, promotions);
	console.log(outPutText);
};
// main( [
// 	// 'ITEM000001',
// 	// 'ITEM000001',
// 	// 'ITEM000001',
// 	// 'ITEM000001',
// 	// 'ITEM000001',
// 	'ITEM000003-2',
// 	'ITEM000005',
// 	'ITEM000005',
// 	'ITEM000005'
// ]);