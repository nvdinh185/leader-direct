/**
 * Đây là một đối tượng JSCngArray2Tree sử dụng để chuyển đổi cấu trúc
 * Array sang cấu trúc hình cây Tree và ngược lại sử dụng trên trình duyệt
 * Cách sử dụng:
 * - Chuyển cây sang mảng 
 * let cngTreeUtil = new JSCngArray2Tree();
 * let flatArray = cngTreeUtil.tree2Array(MAIN_MENU.menu, "next");
 * 
 * - Chuyển mảng sang cây
 * let flatArray = cngTreeUtil.tree2Array(MAIN_MENU.menu, "next");
 * 
 * 
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.JSCngArray2Tree = {})));
}(this, (function (exports) {
    'use strict';

    var JSCngArray2Tree = /** @class */ (function () {

        function JSCngArray2Tree() {
            this.myId = 0;
        }

        /**
         * Cây có item.$children = []
         * @param {*} arrIn [{id,parent}]
         * @param {*} idKey  khóa chính
         * @param {*} parentKey khóa ngoại lai liên kết khóa chính cấu trúc cây
         * @param {*} startWith giá trị bắt đầu tính toán cây
         * @param {*} level mức hiện diện của cấu trúc cây
         * Cách dùng let treeArr = createTree(arr,"id"."parent_id",null)
         * Đầu ra sẽ trả về một mảng cây treeArr = [{$children=[],$level,$is_leaf}]
         */
        JSCngArray2Tree.prototype.array2Tree = function (arrIn, idKey, parentKey, startWith, level = 1) {
            var roots = arrIn.filter(x =>
                (x[parentKey] === startWith)
                || (startWith == null && x[parentKey] == undefined)
                || (startWith == undefined && x[parentKey] == null)
                || (startWith == undefined && x[parentKey] == '')
            );
            if (roots && roots.length > 0) {
                roots.forEach(el => {
                    el.$level = level;
                    el.$children = this.array2Tree(arrIn, idKey, parentKey, el[idKey], level + 1)
                })
                return roots;
            } else {
                let leafChildren = arrIn.find(x => x[idKey] === startWith);
                if (leafChildren) {
                    leafChildren.$is_leaf = 1;
                }
                return undefined;
            }
        }

        /**
        * tạo cây có thứ tự sắp xếp như oracle
        * trả về trật tự cây từ gốc cây, cành, lá,
        * sửa lại để có cây trả về, thay vì phải khai báo trước biến
        * Trả về cấu trúc cây, $level, $index, $tree_index, $is_leaf 
         * @param {*} arrIn  Mảng vào [{id,parent_id}]
         * @param {*} idKey  Khóa id
         * @param {*} parentKey khóa cha
         * @param {*} startWith giá trị bắt đầu (tùy chọn)
         * @param {*} level độ sâu của cây (tự sinh - tùy chọn)
         * @param {*} arrOut mãng ra (tự sinh)
         * @param {*} parentIndex index cha (tự sinh)
         * 
         * Cách dùng let arrTreeOrder = createTreeOrder(arr,"id","parent_id",null)
         * Kết quả arrTreeOrder = một mảng mới, được sắp xếp theo trật tự hình cây như sublings trong oracle
         */
        JSCngArray2Tree.prototype.array2SortByTree = function (arrIn, idKey, parentKey, startWith, level = 1, arrOut = [], parentIndex) {

            let arrReturns = arrOut; //sắp xếp lại
            let myLevel = level;

            //bug dấu = mới gán được $is_leaf của bản ghi cuối cùng
            if (arrIn && arrIn.length >= arrReturns.length && idKey && parentKey) {
                let parents = arrIn.filter(obj => (obj[parentKey] === startWith)
                    || (startWith == null && obj[parentKey] == undefined)
                    || (startWith == undefined && obj[parentKey] == null)
                    || (startWith == undefined && obj[parentKey] == '')
                )
                if (parents && parents.length > 0) {
                    parents.forEach((el, idx) => {
                        el.$level = myLevel;
                        el.$index = idx + 1; //ghi số thứ tự trong cùng cấp
                        el.$tree_index = (parentIndex ? parentIndex + '.' : '') + el.$index; //Ghi số thứ tự theo hình cây
                        arrReturns.push(el);
                        return this.array2SortByTree(arrIn, idKey, parentKey, el[idKey], myLevel + 1, arrReturns, el.$tree_index)
                    });
                } else { //đây là lá cây
                    let objCur = arrReturns.find(obj => (obj[idKey] === startWith));
                    if (objCur) objCur.$is_leaf = 1;
                }
            }

            return arrReturns;
        }

        /**
        * Tự cộng trọng số (dùng trong phương pháp cộng từ cấp con lên cấp trên cùng (trong cấu trúc hình cấy))
        * @param {*} arrIn [{id, parent}]
        * @param {*} idKey     the main key
        * @param {*} parentKey the key of parent
        * @param {*} weightKey the key for sum from leaf to root
        * @param {*} startWith the value for start make tree
        * @param {*} level     the level start for tree
        * @param {*} rootWeight sum for root from leaf
        * @param {*} arrOut     out put array 
        * @param {*} parentIndex out put for index such as tree 1.1.1, 1.2.1 ...
        * 
        * Cách dùng let arrTreeWeight = createTreeWeight(arr,"id","parent_id","weight", null)
        * Kết quả arrTreeWeight = một mảng mới, được sắp xếp theo trật tự hình cây như sublings trong oracle
        * Ngoài ra các trường thông tin tự sinh ra để người dùng lấy kết quả để đưa vào dữ liệu gồm:
        * 
        * '$sum_weight': 
        * '$weight_percent': 1,
        * '$parent_weight_percent': 0.1,
        * '$root_weight_percent': 0.1,
        * '$level': 3,
        * '$index': 1,
        * '$tree_index': '4.1.1',
        * '$is_leaf': 1 
        * 
        * Ứng dụng trong tính tổng từ lá cây lên
        * ứng dụng tính trọng số cùng cấp (trong tính toán KPI)
        * 
        */
        JSCngArray2Tree.prototype.array2SortAndWeight = function (arrIn, idKey, parentKey, weightKey, startWith, level = 1, rootWeight, arrOut = [], parentIndex) {

            let arrReturns = arrOut; //sắp xếp lại
            let myLevel = level;
            // lấy luôn lá cây -- phải thêm dấu == Ngày 07/11/2019
            if (arrIn && arrIn.length >= arrReturns.length) {
                let parents = arrIn.filter(obj => (obj[parentKey] === startWith)
                    || (startWith == null && obj[parentKey] == undefined)
                    || (startWith == undefined && obj[parentKey] == null)
                )
                if (parents && parents.length > 0) {
                    // đã có một mãng cùng cấp, hãy tính toán trọng số cho nó
                    // Tính tổng thành phần của cùng cấp này
                    let sumWeight = parents.map((o) => { return o[weightKey] }).reduce((a, b) => a + b, 0)
                    parents.forEach((el, idx) => {
                        // Ghi tổng trọng số thành phần cùng cấp
                        el.$sum_weight = sumWeight;
                        // Tỷ trọng % thành phần
                        el.$weight_percent = el[weightKey] / sumWeight;
                        // khi tạo con, trọng số cấp cha phải được ghi xuống cấp con bằng trọng số 
                        el.$parent_weight_percent = rootWeight ? rootWeight : 1;
                        // giá trị có thể lấy trước đó
                        //(el.$parent_weight_percent===undefined||el.$parent_weight_percent===null)?1:el.$parent_weight_percent;
                        // root_weight_percent cấp trên xuống cấp dưới = 
                        // Tỷ trọng % so với gốc
                        el.$root_weight_percent = el.$parent_weight_percent * el.$weight_percent;

                        el.$level = myLevel;
                        el.$index = idx + 1; //ghi số thứ tự trong cùng cấp
                        el.$tree_index = (parentIndex ? parentIndex + '.' : '') + el.$index; //Ghi số thứ tự theo hình cây

                        arrReturns.push(el); //gán gốc cây
                        //tìm tiếp lá cây nếu có thì gán vào
                        return this.array2SortAndWeight(arrIn, idKey, parentKey, weightKey, el[idKey], myLevel + 1, el.$root_weight_percent, arrReturns, el.$tree_index)
                    });
                } else { //đây là lá cây
                    let objCur = arrReturns.find(obj => (obj[idKey] === startWith));
                    if (objCur) objCur.$is_leaf = 1;
                }
            }

            return arrReturns;
        }


        /**
        * Chuyển đổi cấu trúc hình cây sang mảng parent-subs/$children...->root:$id,$parent_id,$level
        * 
        * @param {*} treeIn [{id,parent,subs:[]}]
        * @param {*} keyNameOfSubs  giá trị key của trường con "subs" hoặc "children"
        * @param {*} parentValue giá trị ban đầu củ trường  $parent_id
        * @param {*} level như 1
        * 
        * Cách dùng: let arrOut = tree2Array(treeIn,"subs")
        * Kết quả đầu ra là một mảng phẳng, trãi ra $id, $parent_id
        * hàm này là kết quả dịch ngược của cấu trúc cây sang mảng
        */
        JSCngArray2Tree.prototype.tree2Array = function (treeIn, keyNameOfSubs, parentValue, level = 1) {
            let myLevel = level;
            var roots = [];
            if (treeIn && Array.isArray(treeIn)) {
                treeIn.forEach(el => {
                    el.$id = ++this.myId;
                    el.$parent_id = parentValue
                    roots.push({
                        ...el
                    });
                    if (el[keyNameOfSubs]) {
                        let subs = JSON.parse(JSON.stringify(el[keyNameOfSubs]));
                        delete el[keyNameOfSubs];
                        let subTree = this.tree2Array(subs, keyNameOfSubs, el.$id, (myLevel + 1));
                        roots = roots.concat(subTree);
                    }
                });
            }
            return roots;
        };

        return JSCngArray2Tree;
    }());

    window.JSCngArray2Tree = JSCngArray2Tree;

    exports.JSCngArray2Tree = JSCngArray2Tree;
    exports.default = JSCngArray2Tree;

    Object.defineProperty(exports, '__esModule', { value: true });

})));