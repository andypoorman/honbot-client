class ItemCtrl {
    constructor($routeParams, itemList) {
        'ngInject';

        this.itemID = $routeParams.item;
        this.item = itemList[$routeParams.item];
    }
}

export default ItemCtrl;
