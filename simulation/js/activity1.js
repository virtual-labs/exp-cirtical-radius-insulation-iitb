let maindiv = (document.getElementById('pannelcreate'));
let act1_div;
function activity1() {
    let text = `
    <div class='divide'>
        <div style='margin-top: 2vw;'>
            <br>
            <h4 class="center-text fs-20px fw-600">Conduction (Heat & Mass Transfer): Critical radius of insulation</h4>
            <br>
            <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
        </div>
    </div>`;
    maindiv.innerHTML = text;
    setTimeout(() => {
        MathJax.typeset();
    }, 300);
    internal_calculation1();
}
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text('Activity 1', 'act1-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' style='margin-top: 2vw; margin: auto;' id='act1-div'>
      <h3>Activity 1</h3>
      <br>
      <br>
      

      <p style="text-align:left">
         A pipe having radius ${r1}m and ${L}m length maintained at ${T1}&deg;C and room temperature at ${T2}&deg;C. <br>
         The outside heat transfer coefficient is ${h}W/m<sup>2</sup>-K. To reduce heat loss with the insulation of K = ${K}W/m-k. <br>
         Person 'A' suggests the insulation thickness of ${thick_A}m to be provided to reduce the heat loss. <br>
         Person 'B' suggests the insulation thickness of ${thick_B}m to be provided to reduce the heat loss.
      </p>
      <br>

      <p class="fs-24px fb-600" style="text-align:left;">
         Heat transfer without insulation
      </p>

      <div id="act1-Q-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$Q = 2\πr_1h(T_1 - T_2) =  $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input type='text' style="margin:0 2%; width:40%" id='act1-Q-inp' class='form-control fs-16px' /><span style="display:contents;">W</span>
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_Q();' id='act1-vf-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
    act1_div = document.getElementById('act1-div');
}
function internal_calculation1() {
    T1 = random1(200, 226);
    T2 = random1(27, 36);
    Q = 2 * Math.PI * (T1 - T2) * h * r1;
    for (let i = 0; i < 50; i++) {
        let Qi = (2 * Math.PI * (T1 - T2)) / (Math.log(r2 / r1) / K + 1 / (h * r2));
        data.push([Qi, r2]);
        r2 += 0.005;
    }
    for (let i = 0; i < data.length; i++) {
        if (Q > data[i][0]) {
            R = data[i][1];
            console.log('breaked', R, data[i][1]);
            break;
        }
    }
    thick_A = parseFloat((r_c - r1).toFixed(3));
    thick_B = parseFloat((1.1 * R - r1).toFixed(3));
    Q_A =
        (T1 - T2) /
            (Math.log((0.8 * r_c) / r1) / (2 * Math.PI * L * K) +
                1 / (2 * Math.PI * 0.8 * r_c * L * h));
    Q_B =
        (T1 - T2) /
            (Math.log((1.1 * R) / r1) / (2 * Math.PI * L * K) +
                1 / (2 * Math.PI * 1.1 * R * L * h));
    console.log(data);
    console.log('R', R);
    console.log('Q', Q);
    console.log('Q_A', Q_A);
    console.log('Q_B', Q_B);
}
function a1_verify_Q() {
    let inp = (document.getElementById('act1-Q-inp'));
    console.log(Q);
    if (!verify_values(parseFloat(inp.value), Q)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-Q-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q = 2\πr_1h(T_1 - T_2) = ${parseFloat(Q.toFixed(3))} \\ W $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p class="fs-24px fb-600" style="text-align:left;">
         Heat transfer with insulation thickness ${thick_A}m, person 'A'
      </p>
      <p>
         $$
            Q_A = \\frac{T_1 - T_2}{\\frac{ln\\left(\\frac{r_2}{r_1}\\right)}{2\πLK} + \\frac{1}{2\πr_2Lh}}
         $$
      </p>
      
      <div id="act1-Q-A-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-1">
               $$Q_A = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-Q-A-inp' class='form-control fs-16px' /><span style="display:contents;">W</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_Q_A();' id='act1-vf-btn2'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_Q_A() {
    let inp = (document.getElementById('act1-Q-A-inp'));
    console.log(Q_A);
    if (!verify_values(parseFloat(inp.value), Q_A)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-Q-A-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q_A =  ${parseFloat(Q_A.toFixed(3))} \\ W $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p class="fs-24px fb-600" style="text-align:left;">
         Heat transfer with insulation thickness ${thick_B}m, person 'B'
      </p>
      <p>
         $$
            Q_B = \\frac{T_1 - T_2}{\\frac{ln\\left(\\frac{r_2}{r_1}\\right)}{2\πLK} + \\frac{1}{2\πr_2Lh}}
         $$
      </p>
      <div id="act1-Q-B-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-1">
               $$Q_B = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-Q-B-inp' class='form-control fs-16px' /><span style="display:contents;">W</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_Q_B();' id='act1-vf-btn3'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_Q_B() {
    let inp = (document.getElementById('act1-Q-B-inp'));
    console.log(Q_B);
    if (!verify_values(parseFloat(inp.value), Q_B)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-Q-B-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q_B =  ${parseFloat(Q_B.toFixed(3))} \\ W $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `

      <p>
         Q = ${parseFloat(Q.toFixed(3))} W &emsp; Q<sub>A</sub> = ${parseFloat(Q_A.toFixed(3))} W &emsp; Q<sub>B</sub> = ${parseFloat(Q_B.toFixed(3))} W
      </p>
      <br>
      <div id="act1-Ques1-div">
         
      </div>
   `;
    let ques = `
      Q.1. Does the insulation thickness provided by person 'A' reduces the heat transfer? 
   `;
    let q_div = document.getElementById('act1-Ques1-div');
    let question = new Question_Options(ques, ['Yes', 'No'], '2', q_div, 'act1-ques1', a1_load_ques2);
    question.load_question();
    question.get_question_element().querySelector('h5').style.fontSize = '20px';
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_load_ques2() {
    act1_div.innerHTML += `
      <div id="act1-Ques2-div">
      
      </div>
   `;
    let ques = `
      Q.1. Does the insulation thickness provided by person 'B' reduces the heat transfer? 
   `;
    let q_div = document.getElementById('act1-Ques2-div');
    let question = new Question_Options(ques, ['Yes', 'No'], '1', q_div, 'act1-ques2', move_to_activity2);
    question.load_question();
    question.get_question_element().querySelector('h5').style.fontSize = '20px';
}
function move_to_activity2() {
    act1_div.innerHTML += `
      <button class='btn btn-info btn-sm std-btn' onclick='activity2(this);' id='act1-btn1'>Next</button>
   `;
}
function activity_completed(btn) {
    btn && btn.remove();
    alert('Experiment Completed');
}
activity1();
//# sourceMappingURL=activity1.js.map