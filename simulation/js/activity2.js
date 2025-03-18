let act2_div;
function activity2(btn) {
    btn && btn.remove();
    internal_calculation2();
    let btn_text = get_collapse_btn_text('Activity 2', 'act2-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' style='margin-top: 2vw; margin: auto;' id='act2-div'>
      <h3>Activity 2</h3>
      <br>
      <br>
      <p>
         Find the critical radius of the insulation from the graph
      </p>
      <br>
      <canvas id="act2-graph"></canvas>
      <br>
      <p class="fs-24px fb-600" style="text-align:left;">
         
      </p>
      <div id="act2-rc1-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-8 fs-22px">
               Q. What is the critical radius of the insulation?
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act2-rc1-inp' class='form-control fs-16px' /><span style="display:contents;"> mm</span>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_rc1();' id='act2-vf-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    plot_graph();
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act2-div');
    }, 150);
    act2_div = document.getElementById('act2-div');
}
function internal_calculation2() {
    inc = (r_c - r1) / 10;
    for (let r2 = 0.03; r2 <= 0.03 + 50 * inc; r2 += inc) {
        let Q = (2 * Math.PI * (T1 - T2)) / (Math.log(r2 / r1) / K + 1 / (h * r2));
        Q_a2.push(Q);
        r2_a2.push(parseFloat((r2 * 1000).toFixed(2)));
    }
    r_c1 = parseFloat((r_c * 1000).toFixed(2));
    console.log('Q_a2', Q_a2);
    console.log('r2_a2', r2_a2);
    console.log('inc', inc);
    console.log('r_c1', r_c1);
}
function a2_verify_rc1() {
    let inp = (document.getElementById('act2-rc1-inp'));
    console.log(r_c1);
    if (!verify_values(parseFloat(inp.value), r_c1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    inp.placeholder = r_c1.toString();
    let btn = (document.getElementById('act2-vf-btn1'));
    btn && btn.remove();
    act2_div.innerHTML += `
      
         <button class='btn btn-info btn-sm std-btn' onclick='activity_completed(this);' id='act2-vf-btn2'>Next</button>
   `;
    plot_graph();
}
function plot_graph() {
    var ctx = document.getElementById('act2-graph');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    // ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: r2_a2,
            datasets: [
                {
                    label: '',
                    data: Q_a2,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: true,
                },
            ],
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Q(W)',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'rc(mm)',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `rc vs Q`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
}
// activity2();
//# sourceMappingURL=activity2.js.map