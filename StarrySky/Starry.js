
    let data = {}; //全局对象
    let bubbles = []; //全局数组
    var datas = [];
    let CanvasSlider;

    //载入JSON
    function preload() {
      data = loadJSON("2016.json");
    }

    //数据处理
    function loadData() {
      for (let i in data) {
        let d = {};
        d[i] = data[i];
        bubbles.push(d);
      }


      for (let i = 0; i < bubbles.length; i++) {
        var o = data[i];
        datas[i] = new Bubble(o);
      }
    }

    function setup() {
      createCanvas(windowWidth * 2, windowHeight * 2);
      noStroke();
      loadData();
      //更改画布大小
      CanvasSlider = createSlider(30, 100, 50);
      CanvasSlider.position(windowWidth / 2, windowHeight / 2 - 300);
     // CanvasSlider.style('width', '80px');

    }

    function draw() {
      background(0);
      var t = millis() / 1000;
      var vul = CanvasSlider.value();

      for (var i = 0; i < datas.length; i++) {
        //blendMode(LIGHTEST);

        datas[i].display(t, i, vul);
        datas[i].MouseOver();

      }

    }
    function Bubble(f) {


      //设置位置布局
      this.x = f.x;
      this.y = f.y;
      var size = 10;//星星大小
      var c;//颜色
      var a = TWO_PI / 5;//角度1
      var b = TWO_PI / 10;//角度2
      var R = 5;//五角布局的半径
      var dy = R * cos(a), dx = R * sin(a);//位置偏移量
      var dy1 = R * cos(b), dx1 = R * sin(b);
      //亮度计算
      var B = 10;
      var Bcount = 0;

      //个人信息
      this.age = f.age;
      this.gender = f.gender;
      this.country = f.country;
      //数据传递
      this.self_employed = f.self_employed;
      this.mentalVSphysical = f.mentalVSphysical;
      this.family_history = f.family_history;
      //福利
      this.health_benefits = f.health_benefits;
      this.options = f.options;
      this.discussed = f.discussed;
      this.resources_seeking_help = f.resources_seeking_help;
      //不好的影响
      this.observed_negative = f.observed_negative;
      //会影响以后找工作
      this.hurt_career = f.hurt_career;

      //倾诉
      this.employer_negative = f.employer_negative;
      this.coworkers = f.coworkers;
      this.supervisor = f.supervisor;
      //过去的倾诉
      this.previous_employers_negative = f.previous_employers_negative;
      this.previous_coworkers = f.previous_coworkers;
      this.Oldsupervisor = f.Oldsupervisor;
      //心理疾病类型
      this.medical_professional = f.medical_professional;
      this.condition_PH1 = f.condition_PH1;
      this.condition_PH2 = f.condition_PH2;
      this.condition_PH3 = f.condition_PH3;
      this.condition_PH4 = f.condition_PH4;
      this.condition_PH5 = f.condition_PH5;
      //工作岗位
      this.work_position1 = f.work_position1;
      this.work_position2 = f.work_position2;
      this.work_position3 = f.work_position3;
      this.work_position4 = f.work_position4;

      this.display = function (t, flicker, v) {
        push();
        translate(windowWidth / 2, windowHeight / 2);
        if (this.condition_PH1 != "") {
          B = 10;
          if (this.condition_PH2 != "") {
            B = 50; size = size * 1.001;
            if (this.condition_PH3 != "") {
              B = 60; size = size * 1.01;
              if (this.condition_PH4 != "") {
                B = 75; size = size * 1;
                if (this.condition_PH5 != "") {
                  B = 100; size = size * 3;
                }
              }
            }
          }
        }

        CanX = this.x * v;
        CanY = this.y * v;
        //认为疾病会对自己工作带来负面影响 动效：闪烁频率快
        if (this.hurt_career == "Yes, it has") {

          size = size * 5 * sin(t * 3.5 + 0.1 * flicker);
        } if (this.hurt_career == "Yes, I think it would") {

          size = size * 2.5 * sin(t * 1.5 + 0.1 * flicker);
        } if (this.hurt_career == "Maybe") {

          size = size * 1.25 * sin(t * 1 + 0.1 * flicker);
        } if (this.hurt_career == "No, I don't think it would") {

          size = size * 1 * sin(t * 0.5 + 0.1 * flicker);
        }

        //认为雇主重视心理健康问题:星环
        if (this.mentalVSphysical == "Yes") {
          push();
          stroke(255, B * 5);
          strokeWeight(1);
          noFill();
          ellipse(CanX, CanY, size * 5, size * 5);
          pop();
        }

        //疾病类型：颜色叠加  
        var CY = CanY + R;
        // 疾病类型1：情绪障碍(抑郁、躁郁症等)
        if (this.condition_PH1 == 'Mood Disorder (Depression, Bipolar Disorder, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(1, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型2：焦虑障碍(广泛性、社会性、恐惧症等)
        if (this.condition_PH1 == 'Anxiety Disorder (Generalized, Social, Phobia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(10, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型3：注意缺陷多动障碍
        if (this.condition_PH1 == 'Attention Deficit Hyperactivity Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(19, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型4：创伤后压力心理障碍症
        if (this.condition_PH1 == 'Post-traumatic Stress Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(28, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型5：强迫症
        if (this.condition_PH1 == 'Obsessive-Compulsive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(37, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型6：物质使用障碍     
        if (this.condition_PH1 == 'Substance Use Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(46, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型7：人格障碍(边缘型、反社会、偏执等)     
        if (this.condition_PH1 == 'Personality Disorder (Borderline, Antisocial, Paranoid, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(55, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型8：应激反应综合症    
        if (this.condition_PH1 == 'Stress Response Syndromes') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(64, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型9：成瘾症     
        if (this.condition_PH1 == 'Addictive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(73, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型10：进食障碍(厌食、贪食等)    
        if (this.condition_PH1 == 'Eating Disorder (Anorexia, Bulimia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(82, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型11：解离性障碍    
        if (this.condition_PH1 == 'Dissociative Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(91, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }
        // 疾病类型12：精神疾病(精神分裂症、分裂情感性精神分裂症等)     
        if (this.condition_PH1 == 'Psychotic Disorder (Schizophrenia, Schizoaffective, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(100, 100, B);
          fill(c);
          ellipse(CanX, CY, size, size);
          pop();
        }


        var CX2 = CanX + dx;
        var CY2 = CanY + dy;
        // 疾病类型1：情绪障碍(抑郁、躁郁症等)
        if (this.condition_PH2 == 'Mood Disorder (Depression, Bipolar Disorder, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(1, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型2：焦虑障碍(广泛性、社会性、恐惧症等)
        if (this.condition_PH2 == 'Anxiety Disorder (Generalized, Social, Phobia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(10, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型3：注意缺陷多动障碍
        if (this.condition_PH2 == 'Attention Deficit Hyperactivity Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(19, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型4：创伤后压力心理障碍症
        if (this.condition_PH2 == 'Post-traumatic Stress Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(28, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型5：强迫症
        if (this.condition_PH2 == 'Obsessive-Compulsive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(37, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型6：物质使用障碍     
        if (this.condition_PH2 == 'Substance Use Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(46, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型7：人格障碍(边缘型、反社会、偏执等)     
        if (this.condition_PH2 == 'Personality Disorder (Borderline, Antisocial, Paranoid, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(55, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型8：应激反应综合症    
        if (this.condition_PH2 == 'Stress Response Syndromes') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(64, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型9：成瘾症     
        if (this.condition_PH2 == 'Addictive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(73, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型10：进食障碍(厌食、贪食等)    
        if (this.condition_PH2 == 'Eating Disorder (Anorexia, Bulimia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(82, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型11：解离性障碍    
        if (this.condition_PH2 == 'Dissociative Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(91, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        }
        // 疾病类型12：精神疾病(精神分裂症、分裂情感性精神分裂症等)     
        if (this.condition_PH2 == 'Psychotic Disorder (Schizophrenia, Schizoaffective, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(100, 100, B);
          fill(c);
          ellipse(CX2, CY2, size, size);
          pop();
        } B

        var CX3 = CanX - dx;
        var CY3 = CanY + dy;
        // 疾病类型1：情绪障碍(抑郁、躁郁症等)
        if (this.condition_PH3 == 'Mood Disorder (Depression, Bipolar Disorder, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(1, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型2：焦虑障碍(广泛性、社会性、恐惧症等)
        if (this.condition_PH3 == 'Anxiety Disorder (Generalized, Social, Phobia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(10, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型3：注意缺陷多动障碍
        if (this.condition_PH3 == 'Attention Deficit Hyperactivity Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(19, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型4：创伤后压力心理障碍症
        if (this.condition_PH3 == 'Post-traumatic Stress Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(28, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型5：强迫症
        if (this.condition_PH3 == 'Obsessive-Compulsive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(37, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型6：物质使用障碍     
        if (this.condition_PH3 == 'Substance Use Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(46, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型7：人格障碍(边缘型、反社会、偏执等)     
        if (this.condition_PH3 == 'Personality Disorder (Borderline, Antisocial, Paranoid, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(55, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型8：应激反应综合症    
        if (this.condition_PH3 == 'Stress Response Syndromes') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(64, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型9：成瘾症     
        if (this.condition_PH3 == 'Addictive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(73, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型10：进食障碍(厌食、贪食等)    
        if (this.condition_PH3 == 'Eating Disorder (Anorexia, Bulimia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(82, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型11：解离性障碍    
        if (this.condition_PH3 == 'Dissociative Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(91, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }
        // 疾病类型12：精神疾病(精神分裂症、分裂情感性精神分裂症等)     
        if (this.condition_PH2 == 'Psychotic Disorder (Schizophrenia, Schizoaffective, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(100, 100, B);
          fill(c);
          ellipse(CX3, CY3, size, size);
          pop();
        }


        var CX4 = CanX + dx1;
        var CY4 = CanY - dy1;
        // 疾病类型1：情绪障碍(抑郁、躁郁症等)
        if (this.condition_PH3 == 'Mood Disorder (Depression, Bipolar Disorder, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(1, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型2：焦虑障碍(广泛性、社会性、恐惧症等)
        if (this.condition_PH3 == 'Anxiety Disorder (Generalized, Social, Phobia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(10, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型3：注意缺陷多动障碍
        if (this.condition_PH3 == 'Attention Deficit Hyperactivity Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(19, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型4：创伤后压力心理障碍症
        if (this.condition_PH3 == 'Post-traumatic Stress Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(28, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型5：强迫症
        if (this.condition_PH3 == 'Obsessive-Compulsive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(37, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型6：物质使用障碍     
        if (this.condition_PH3 == 'Substance Use Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(46, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型7：人格障碍(边缘型、反社会、偏执等)     
        if (this.condition_PH3 == 'Personality Disorder (Borderline, Antisocial, Paranoid, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(55, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型8：应激反应综合症    
        if (this.condition_PH3 == 'Stress Response Syndromes') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(64, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型9：成瘾症     
        if (this.condition_PH3 == 'Addictive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(73, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型10：进食障碍(厌食、贪食等)    
        if (this.condition_PH3 == 'Eating Disorder (Anorexia, Bulimia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(82, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型11：解离性障碍    
        if (this.condition_PH3 == 'Dissociative Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(91, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }
        // 疾病类型12：精神疾病(精神分裂症、分裂情感性精神分裂症等)     
        if (this.condition_PH2 == 'Psychotic Disorder (Schizophrenia, Schizoaffective, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(100, 100, B);
          fill(c);
          ellipse(CX4, CY4, size, size);
          pop();
        }

        var CX5 = CanX - dx1;
        var CY5 = CanY - dy1;
        // 疾病类型1：情绪障碍(抑郁、躁郁症等)
        if (this.condition_PH3 == 'Mood Disorder (Depression, Bipolar Disorder, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(1, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型2：焦虑障碍(广泛性、社会性、恐惧症等)
        if (this.condition_PH3 == 'Anxiety Disorder (Generalized, Social, Phobia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(10, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型3：注意缺陷多动障碍
        if (this.condition_PH3 == 'Attention Deficit Hyperactivity Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(19, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型4：创伤后压力心理障碍症
        if (this.condition_PH3 == 'Post-traumatic Stress Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(28, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型5：强迫症
        if (this.condition_PH3 == 'Obsessive-Compulsive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(37, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型6：物质使用障碍     
        if (this.condition_PH3 == 'Substance Use Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(46, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型7：人格障碍(边缘型、反社会、偏执等)     
        if (this.condition_PH3 == 'Personality Disorder (Borderline, Antisocial, Paranoid, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(55, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型8：应激反应综合症    
        if (this.condition_PH3 == 'Stress Response Syndromes') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(64, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型9：成瘾症     
        if (this.condition_PH3 == 'Addictive Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(73, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型10：进食障碍(厌食、贪食等)    
        if (this.condition_PH3 == 'Eating Disorder (Anorexia, Bulimia, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(82, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型11：解离性障碍    
        if (this.condition_PH3 == 'Dissociative Disorder') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(91, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }
        // 疾病类型12：精神疾病(精神分裂症、分裂情感性精神分裂症等)     
        if (this.condition_PH2 == 'Psychotic Disorder (Schizophrenia, Schizoaffective, etc)') {
          push();
          blendMode(LIGHTEST);
          colorMode(HSB, 100);
          c = color(100, 100, B);
          fill(c);
          ellipse(CX5, CY5, size, size);
          pop();
        }

        else {
          c = color(255, B * 10);
        }

        fill(c);
        ellipse(CanX, CanY, size, size);
        size = 3;//闪烁归零

        pop();
      }

      this.MouseOver = function () {
        let d = dist(mouseX, mouseY, CanX + windowWidth / 2, CanY + windowHeight / 2);

        var dPos = 50;//行间距
        var yPos = 200;
        var xPos = 300;
        if (d <= size * 1.5) {
          fill(255);
          textSize(20);
          text("Age：" + this.age, xPos, yPos);
          text("Gender：" + this.gender, xPos, yPos + dPos);
          text("Country：" + this.country, xPos, yPos + dPos * 2);
          text("Work Position：", xPos, yPos + dPos * 3);
          //textSize(50);
          var YPos_wp = yPos + dPos * 4;
          text("1." + this.work_position1, xPos + dPos, YPos_wp);
          if (this.work_position2 != "") {
            YPos_wp = YPos_wp + dPos;
            text("2." + this.work_position2, xPos + dPos, YPos_wp);
          } if (this.work_position3 != "") {
            YPos_wp = YPos_wp + dPos;
            text("3." + this.work_position3, xPos + dPos, YPos_wp);
          } if (this.work_position4 != "") {
            YPos_wp = YPos_wp + dPos;
            text("4." + this.work_position4, xPos + dPos, YPos_wp);
          }
          var YPos_MC = YPos_wp + dPos;

          //textSize(50);


          if (this.condition_PH1 != "") {
            push();
            textSize(40);
            text("Not Healthy", xPos, yPos - dPos);
            pop();
            text("Mental Condition：", xPos, YPos_MC);
            YPos_MC = YPos_MC + dPos;
            text("1." + this.condition_PH1, xPos + dPos, YPos_MC);
          } if (this.condition_PH2 != "") {
            YPos_MC = YPos_MC + dPos;
            text("2." + this.condition_PH2, xPos + dPos, YPos_MC);
          } if (this.condition_PH3 != "") {
            YPos_MC = YPos_MC + dPos;
            text("3." + this.condition_PH3, xPos + dPos, YPos_MC);
          } if (this.condition_PH4 != "") {
            YPos_MC = YPos_MC + dPos;
            text("4." + this.condition_PH4, xPos + dPos, YPos_MC);
          } if (this.condition_PH5 != "") {
            YPos_MC = YPos_MC + dPos;
            text("5." + this.condition_PH5, xPos + dPos, YPos_MC);
          } else {
            textSize(40);
            text("Healthy", xPos, yPos - dPos);
          }
          push();
          stroke(255);
          noFill();
          //rect(xPos - dPos, yPos - dPos * 2, dPos * 15, YPos_MC - yPos + dPos * 3)
          pop();



        }

      }

    }