function countItems(Inputs, loadAllItems) {
	var itemsList = loadAllItems();
	var results = [];
	Inputs.forEach((elem, index, array) => {
		let elemName = elem.replace(reg, ",").split(",")[0];//处理'ITEM000003-2'
		let elemCount = elem.replace(reg, ",").split(",")[1] ? parseInt(elem.replace(reg, ",").split(",")[1]) : 1;
		for (let i = 0; i < results.length; i++) {
			//已经存在的物品
			if (results[i].barcode === elemName) {
				results[i].count += elemCount;
			}
		}
		//新的物品
		itemsList.forEach((obj) => {
			if (obj.barcode === elem.barcode) {
				results.push({
					name: elem,
					count: 1,
					unit: obj.unit,
					unitPrice: obj.price
				})
			}
		})
	})
	return results;

}
function countPromotions(Items, loadPromotions) {

}
function createPrintText(Items, Promotions) {

}
module.exports = function main(Inputs) {
	var Items = countItems(Inputs, loadAllItems);
	var Promotions = countPromotions(Items, loadPromotions);
	var outPutText = createPrintText(Items, Promotions);
	return 'Hello World!';
};