window.onload = function() {
    var outside = document.querySelector('.outside');
    var add_btn = document.querySelector('.product__add');
    var remove_btn = document.querySelector('.product__remove');
    var shopping_box = document.querySelector('.shopping');
    var shopping_num = document.querySelector('.shopping__num');
    var ball;
    var number = 0;
    

    function createBall() {
        ball = document.createElement('div');
        ball.classList.add('ball--red');
        outside.appendChild(ball);
    }

    /* 
    * @param {number} time 运动间隔 单位ms
    */ 
    function move(time) {
        var start = {
            x: ball.offsetLeft,
            y: ball.offsetTop
        }

        var end = {
            x: 20,
            y: shopping_box.offsetTop
        }

        // x轴计算
        var speedX = (start.x - end.x) / time;
        var clientX = start.x - end.x;

        var startTime = new Date().getTime();
        // y轴计算
        var speedY = formulaY(0.004, speedX * startTime, start, end);

        var t = setInterval(function() {
            speedY = formulaY(0.004, speedX * (new Date().getTime() - startTime), start, end) / 100;
            if (speedY >= end.y) {
                clearInterval(t);
            }
            
            ball.style.top = start.y + speedY + 'px';
            clientX -= speedX / 2;
            ball.style.left = clientX + 'px';
            console.log(clientX, speedX);

        }, 10)

        
    }

    /* 
    * @param {number} alpha 抛物线开口以及抛物线平滑度 alpha < 0 向下  alpha > 0 向上
    * @param {number} x 抛物线x的值
    * @param {object} start 起始位置
    * @param {object} end 结束位置
    */
    function formulaY(alpha, x, start, end) {
        // 抛物线y轴公式
        // y = a * x * x + b * x + c
        
        // a已知 求常量b
        // y2 - y1 = a * (x2 * x2 - x1 * x1) + b * (x2 - x1)

        var diffX = start.x - end.x;
        var diffY = start.y - end.y;

        // y轴计算
        var constB = (diffY - alpha * (start.x + end.x) * diffX) / diffX;
        
        
        return alpha * x * x + constB * x;
    }

    add_btn.onclick = function() {
        createBall();
        move(100);
        shopping_num.innerHTML = ++number;
    }
}