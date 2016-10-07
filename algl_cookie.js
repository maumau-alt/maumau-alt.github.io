/*
  🍪クッキー計算|꒳°๑)
  https://twitter.com/maumau_alt
  
  雑ですいません
*/

const CURRENT_LV_FIELD_ID = "current_lv";
const REMAINING_EXP_FIELD_ID = "remaining_exp";
const CUSTOM_TARGET_LV_FIELD_ID = "custom_target_lv";
const CURRENT_TOTAL_EXP_ID = "current_total_exp";

const TOTAL_EXP = [-1, 0,18,51,109,205,351,561,848,1228,1715,2326,3076,3983,5063,6334,7814,9522,11475,13693,16196,19002,22132,25605,29443,33666,38294,43350,48855,54829,61297,68278,75797,83875,92536,101801,111696,122243,133465,145387,158033,171427,185592,200555,216339,232969,250472,268871,288192,308461,329704,351946,375213,399533,424931,451433,479067,507859,537836,569025,601454,635149,670139,706451,744112,783152,823597,865476,908817,953649,1000000]

function calc_current_total_exp(current_lv, remaining_exp_to_next_lv){
  var current_total_exp = TOTAL_EXP[current_lv];
  
  if (remaining_exp_to_next_lv > 0)
    current_total_exp = TOTAL_EXP[current_lv + 1] - remaining_exp_to_next_lv;
    
  return current_total_exp;
}

function calc_required_exp(current_lv, target_lv, remaining_exp_to_next_lv){
  if (target_lv <= current_lv) return 0;
  
  var current_total_exp = calc_current_total_exp(current_lv, remaining_exp_to_next_lv);
  var target_total_exp = TOTAL_EXP[target_lv];
  
  return target_total_exp - current_total_exp;
}

function refresh_data(){
  var current_lv_elm = document.getElementById(CURRENT_LV_FIELD_ID);
  var remaining_exp_elm = document.getElementById(REMAINING_EXP_FIELD_ID);
  var custom_target_lv_elm = document.getElementById(CUSTOM_TARGET_LV_FIELD_ID);
  
  var current_lv = parseInt(current_lv_elm.value);
  var remaining_exp = parseInt(remaining_exp_elm.value);
  var custom_target_lv = parseInt(custom_target_lv_elm.value);
  
  remaining_exp_elm.max = TOTAL_EXP[current_lv + 1] - TOTAL_EXP[current_lv] - 1;
  
  var target_levels = [40, 50, 60, 70, custom_target_lv];
  var output_elms = document.getElementsByTagName("td"); //雑すぎぃ
  
  var target_level, output_elm, total_exp, power_cookie;
  for (var i = 0; i < 5; i++){
      target_level = target_levels[i];
      output_elm = output_elms[i];
      
      total_exp = calc_required_exp(current_lv, target_level, remaining_exp);
      power_cookie = Math.ceil(total_exp / 1000);
      
      output_elm.textContent = power_cookie + "個 (EXP: " + total_exp.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,') + ")";
  }
  
  var current_total_exp_elm = document.getElementById(CURRENT_TOTAL_EXP_ID);
  current_total_exp_elm.textContent = " (累計EXP: " + calc_current_total_exp(current_lv, remaining_exp).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,') + ")";
}

window.addEventListener("DOMContentLoaded", refresh_data);