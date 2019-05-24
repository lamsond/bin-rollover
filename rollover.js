/* i love js */
const w = 162;
const h = 100;
const ctx = document.getElementById('odometer_canvas').getContext('2d');
const pad = 2
const num_wheels = 3;
const digits = [0, 0, 0];
const offsets = [28, 28, 28];
const fnt = "72px Courier";
const base = 16;

function draw_background(){
  ctx.fillStyle = '#cccccc';
  ctx.fillRect(0, 0, w, h);
}

function draw_wheel(x, y, num, v_offset){
  ctx.fillStyle = '#000000';
  ctx.fillRect(x+pad, pad, w/3-2*pad, h-2*pad);
  ctx.fillStyle = '#ffffff';
  ctx.font = fnt;
  ctx.fillText(num, x+5, y + v_offset);
}

function hexify(n){
 if(n < 10){
  return n;
 }
 else if(n == 10){
  return 'A';
 }
 else if(n == 11){
  return 'B';
 }
 else if(n == 12){
  return 'C';
 }
 else if(n == 13){
  return 'D';
 }
 else if(n == 14){
  return 'E';
 }
 return 'F';
}


function draw_wheels(){
  for(let i = 0; i < num_wheels; i++){
    draw_wheel(i*w/num_wheels, 0, hexify(digits[i]), h-offsets[i]);
  }
}

setInterval(() =>{
  offsets[2] = offsets[2] > -52 ? offsets[2]-4:h;
  if(offsets[2] <= -52){
		if(digits[2] == base-1){
			digits[2] = 0;
			//offsets[1] -= 4;
		}
		else{
		digits[2] += 1;
   
		}
  }

	if(offsets[2] == 0 && digits[2] == base-1){
		offsets[1] -= 4;
	}

  if(offsets[1] != 28){
		offsets[1] -= 4;
		if(offsets[1] <= -52){
			offsets[1] = h;
			if(digits[1] == base-1){
				digits[1] = 0;
				//offsets[0] -= 4;
			}
			else{
				digits[1] += 1;
			}
		}
	}

	if(offsets[2] == 0 && digits[1] == base-1 && digits[2] == base-1){
		offsets[0] -= 4;
	}

	if(offsets[0] != 28){
		offsets[0] -= 4;
		if(offsets[0] <= -52){
			offsets[0] = h;
			if(digits[0] == base-1){
				digits[0] = 0;
			}
			else{
				digits[0] += 1;
			}
		}
	}

	draw_background();
	draw_wheels();
}, 24);

