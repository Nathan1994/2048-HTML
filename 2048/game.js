var size = 4;
var gridPadding = 15;
var cellSpacing = 15;

var map = [];

// 代码入口
function setup() {
    createMap();
    createGrid();
    for (var i = 0; i < 2; ++i) {
        createRandomTile();
    }
    updateGrid();


    $(document).keydown(function(ev){
        
        console.log(ev.which);
        //38 up 40 down 37 left 39 right
        if (ev.which === 38) {
            move('up');
        }else if (ev.which === 40) {
            move('down');
        }else if (ev.which === 37) {
            move('left');
        }else if (ev.which === 39) {
            move('right');
        };
    });

}

// 根据 size，初始化 map 为一个二维数组
function createMap() {
    // TODO
    for (var i = 0; i < size; i++) {
        map[i] = new Array(size);
        for (var j = 0; j < size; j++) {
            map[i][j] = 0;
        };
    };
}

// 初始化网格 DOM
function createGrid() {
    // TODO
    var cellWidth = ($('.grid').width() - 2 * gridPadding - (size - 1) * cellSpacing)/size;
    var cellHeight = ($('.grid').height() - 2 * gridPadding - (size - 1) * cellSpacing)/size;
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            
             var cell = $('<div>');
             cell.addClass('cell');
             cell.css({
                'left': gridPadding+j*(cellWidth+cellSpacing),
                'top': gridPadding+i*(cellHeight+cellSpacing),
                'width':cellWidth,
                'height':cellHeight,
                // 'line-height': 
             });
             cell.appendTo('.grid');
             cell.value = 0;
             map[i][j] = cell;
         };

    };
   
}

// 将 map 内容更新到网格 DOM
function updateGrid() {
    // TODO
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            map[i][j].attr('data-point',map[i][j].value);
        };
    };
}

// 在地图上放置一块新格子
function createRandomTile() {
    var value = Math.random() < 0.9 ? 2 : 4;
    // TODO
    var availables = new Array;
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            if (map[i][j].value === 0) {
                availables.push(map[i][j]);
            };
        };
    };

    var availableTile = Math.floor(Math.random()*availables.length);
    availables[availableTile].value = value;

}

function move (direction) {
    var zeroPosition;

    switch (direction){
        case 'left':
            for(i = 0; i < size; ++i){
                zeroPosition = size;
                for(j = 0; j < size; ++j){
                    if(map[i][j].value === 0 &&
                        j < zeroPosition){
                        zeroPosition = j;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition<j) {
                            map[i][zeroPosition].value = map[i][j].value;
                            map[i][j].value = 0;
                            ++zeroPosition;
                        };
                    }
                };

                for(j = 0; j < size - 1; ++j){
                    if(map[i][j].value !== 0){
                        if (map[i][j].value === map[i][j+1].value) {
                            map[i][j].value *= 2;
                            map[i][j+1].value = 0;
                            ++j;
                        };
                    }
                    
                }
                zeroPosition = size;
                for(j = 0; j < size; ++j){
                    if(map[i][j].value === 0 &&
                        j < zeroPosition){
                        zeroPosition = j;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition<j) {
                            map[i][zeroPosition].value = map[i][j].value;
                            map[i][j].value = 0;
                            ++zeroPosition;
                        };
                    }
                };
            }
        break;

        case 'right':
            for(i = 0; i < size; ++i){
                zeroPosition = 0;
                for(j = size - 1; j >= 0; --j){
                    if(map[i][j].value === 0 &&
                        j > zeroPosition){
                        zeroPosition = j;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition>j) {
                            map[i][zeroPosition].value = map[i][j].value;
                            map[i][j].value = 0;
                            --zeroPosition;
                        };
                    }
                };

                for(j = size - 1; j > 0 ; --j){
                    if(map[i][j].value !== 0){
                        if (map[i][j].value === map[i][j-1].value) {
                          map[i][j].value *= 2;
                          map[i][j-1].value = 0;
                          --j;
                        };
                    }
                    
                }
                zeroPosition = 0;
                for(j = size - 1; j >= 0; --j){
                    if(map[i][j].value === 0 &&
                        j > zeroPosition){
                        zeroPosition = j;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition>j) {
                            map[i][zeroPosition].value = map[i][j].value;
                            map[i][j].value = 0;
                            --zeroPosition;
                        };
                    }
                };
            }
            

        break;

        case 'up':
            for(j = 0;j < size;++j){
                zeroPosition = size;
                for(i = 0; i < size; ++i){
                    if(map[i][j].value === 0 &&
                        i < zeroPosition){
                        zeroPosition = i;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition<j) {
                            map[zeroPosition][j].value = map[i][j].value;
                            map[i][j].value = 0;
                            ++zeroPosition;
                        };
                    }
                };

                for(i = 0; i < size - 1; ++i){
                    if(map[i][j].value !== 0){
                        if (map[i][j].value === map[i+1][j].value) {
                            map[i][j].value *= 2;
                            map[i+1][j].value = 0;
                            ++i;
                        };
                    }
                    
                }
                zeroPosition = size;
                for(i = 0; i < size; ++i){
                    if(map[i][j].value === 0 &&
                        i < zeroPosition){
                        zeroPosition = i;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition<i) {
                            map[zeroPosition][j].value = map[i][j].value;
                            map[i][j].value = 0;
                            ++zeroPosition;
                        };
                    }
                };
            }
        break;

        case 'down':
            for(j = 0; j < size; ++j){
                zeroPosition = 0;
                for(i = size - 1; i >= 0; --i){
                    if(map[i][j].value === 0 &&
                        i > zeroPosition){
                        zeroPosition = i;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition>i) {
                            map[zeroPosition][j].value = map[i][j].value;
                            map[i][j].value = 0;
                            --zeroPosition;
                        };
                    }
                };

                for(i = size - 1; i > 0 ; --i){
                    if(map[i][j].value !== 0){
                        if (map[i][j].value === map[i-1][j].value) {
                          map[i][j].value *= 2;
                          map[i-1][j].value = 0;
                          --i;
                        };
                    }
                    
                }
                zeroPosition = 0;
                for(i = size - 1; i >= 0; --i){
                    if(map[i][j].value === 0 &&
                        i > zeroPosition){
                        zeroPosition = i;
                    }else if(map[i][j].value !== 0){
                        if (zeroPosition>i) {
                            map[zeroPosition][j].value = map[i][j].value;
                            map[i][j].value = 0;
                            --zeroPosition;
                        };
                    }
                };
            }
        break;
    }
    createRandomTile();
    updateGrid();

}

function upButtonPressed(){
    move('up');
}

function downButtonPressed(){
    move('down');
}

function leftButtonPressed(){
    move('left');
}

function rightButtonPressed(){
    move('right');
}
